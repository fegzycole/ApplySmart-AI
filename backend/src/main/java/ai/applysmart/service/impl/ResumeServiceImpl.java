package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.*;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.service.*;
import ai.applysmart.util.LayoutUtils;
import ai.applysmart.util.TextUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final ClaudeService claudeService;
    private final FileParserService fileParserService;
    private final FileStorageService fileStorageService;
    private final PdfLayoutAnalyzer pdfLayoutAnalyzer;
    private final HtmlPdfGenerator htmlPdfGenerator;

    @Override
    public List<ResumeDto> getAllResumes(User user) {
        log.info("Fetching all resumes for user: {}", user.getId());

        return resumeRepository.findByUserOrderByUpdatedAtDesc(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<ResumeDto> getAllResumes(User user, Pageable pageable) {
        log.info("Fetching paginated resumes for user: {} (page: {}, size: {})",
                user.getId(), pageable.getPageNumber(), pageable.getPageSize());

        return resumeRepository.findByUserOrderByUpdatedAtDesc(user, pageable)
                .map(this::convertToDto);
    }

    @Override
    public ResumeDto getResumeById(Long id, User user) {
        log.info("Fetching resume {} for user: {}", id, user.getId());

        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        return convertToDto(resume);
    }

    @Override
    @Transactional
    public ResumeDto createResume(CreateResumeRequest request, User user) {
        log.info("Creating resume for user: {}", user.getId());

        Resume resume = Resume.builder()
                .user(user)
                .name(request.getName())
                .content(request.getContent())
                .score(0)
                .status(Resume.Status.DRAFT)
                .wordCount(TextUtils.calculateWordCount(request.getContent()))
                .build();

        resume = resumeRepository.save(resume);
        log.info("Created resume with ID: {}", resume.getId());

        return convertToDto(resume);
    }

    @Override
    @Transactional
    public ResumeDto updateResume(Long id, UpdateResumeRequest request, User user) {
        log.info("Updating resume {} for user: {}", id, user.getId());

        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        if (request.getName() != null) {
            resume.setName(request.getName());
        }

        if (request.getContent() != null) {
            resume.setContent(request.getContent());
            resume.setWordCount(TextUtils.calculateWordCount(request.getContent()));
        }

        if (request.getStatus() != null) {
            try {
                resume.setStatus(Resume.Status.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid status: " + request.getStatus());
            }
        }

        resume = resumeRepository.save(resume);
        log.info("Updated resume with ID: {}", resume.getId());

        return convertToDto(resume);
    }

    @Override
    @Transactional
    public void deleteResume(Long id, User user) {
        log.info("Deleting resume {} for user: {}", id, user.getId());

        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        if (resume.getCloudinaryPublicId() != null) {
            fileStorageService.deleteFile(resume.getCloudinaryPublicId());
        }

        resumeRepository.softDelete(id, user);
        log.info("Soft deleted resume with ID: {}", id);
    }

    @Override
    public ResumeAnalysisDto analyzeResume(Long id, String jobDescription, User user) {
        log.info("Analyzing resume {} for user: {}", id, user.getId());

        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        if (resume.getContent() == null || resume.getContent().isBlank()) {
            throw new BadRequestException("Resume content is empty");
        }

        ResumeAnalysisDto analysis = claudeService.analyzeResume(resume.getContent(), jobDescription);

        resume.setScore(analysis.getScore());
        resume.setAtsScore(analysis.getAtsCompatibility());
        resumeRepository.save(resume);

        return analysis;
    }

    @Override
    @Transactional
    public ResumeOptimizationDto optimizeResume(Long id, OptimizeResumeRequest request, User user) {
        log.info("Optimizing resume {} for user: {}", id, user.getId());

        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        if (resume.getContent() == null || resume.getContent().isBlank()) {
            throw new BadRequestException("Resume content is empty");
        }

        ResumeOptimizationDto optimization = claudeService.optimizeResume(
                resume.getContent(),
                request.getJobDescription()
        );

        long timestamp = System.currentTimeMillis();

        ai.applysmart.dto.resume.ResumeLayoutInfo layoutInfo = null;
        if (resume.getFileUrl() != null && resume.getName() != null && resume.getName().toLowerCase().endsWith(".pdf")) {
            try {
                log.info("Analyzing layout from original PDF: {}", resume.getFileUrl());
                byte[] originalPdfBytes = downloadFileFromUrl(resume.getFileUrl());
                layoutInfo = pdfLayoutAnalyzer.analyzeLayout(originalPdfBytes);
                log.info("Successfully analyzed layout - Primary font: {}, Accent color: {}",
                         layoutInfo.getPrimaryFont(), layoutInfo.getAccentColor());
            } catch (Exception e) {
                log.warn("Failed to analyze original PDF layout, using default: {}", e.getMessage());
            }
        }

        if (layoutInfo == null) {
            log.info("Using default professional layout");
            layoutInfo = LayoutUtils.createDefaultProfessionalLayout();
        }

        String pdfFilename = String.format("resume-%d-optimized-%d.pdf", id, timestamp);
        byte[] pdfBytes = htmlPdfGenerator.generateStyledPdf(optimization.getContent(), layoutInfo);
        ai.applysmart.dto.FileUploadResult pdfUploadResult = fileStorageService.uploadFileBytes(pdfBytes, pdfFilename);

        if (resume.getCloudinaryPublicId() != null) {
            fileStorageService.deleteFile(resume.getCloudinaryPublicId());
        }

        resume.setContent(optimization.getContent());
        resume.setScore(optimization.getOptimizedScore());
        resume.setStatus(Resume.Status.OPTIMIZED);
        resume.setWordCount(TextUtils.calculateWordCount(optimization.getContent()));
        resume.setFileUrl(pdfUploadResult.getUrl());
        resume.setCloudinaryPublicId(pdfUploadResult.getPublicId());
        resumeRepository.save(resume);

        optimization.setFileUrl(pdfUploadResult.getUrl());
        return optimization;
    }

    private byte[] downloadFileFromUrl(String fileUrl) throws IOException {
        log.debug("Downloading file from URL: {}", fileUrl);
        java.net.URL url = new java.net.URL(fileUrl);
        try (java.io.InputStream in = url.openStream();
             java.io.ByteArrayOutputStream out = new java.io.ByteArrayOutputStream()) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
            return out.toByteArray();
        }
    }

    @Override
    @Transactional
    public ResumeDto uploadResumeFile(MultipartFile file, User user) {
        log.info("Uploading resume file for user: {}", user.getId());

        if (file.isEmpty()) {
            throw new BadRequestException("File is empty");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            throw new BadRequestException("Invalid file name");
        }

        String content = fileParserService.extractTextFromFile(file);
        ai.applysmart.dto.FileUploadResult uploadResult = fileStorageService.uploadFile(file);

        Resume resume = Resume.builder()
                .user(user)
                .name(originalFilename)
                .content(content)
                .fileUrl(uploadResult.getUrl())
                .cloudinaryPublicId(uploadResult.getPublicId())
                .score(0)
                .status(Resume.Status.DRAFT)
                .wordCount(TextUtils.calculateWordCount(content))
                .build();

        resume = resumeRepository.save(resume);
        log.info("Uploaded and created resume with ID: {}", resume.getId());

        return convertToDto(resume);
    }


    @Override
    @Transactional
    public ResumeOptimizationDto optimizeUploadedFile(MultipartFile file, String jobDescription, User user) {
        log.info("Optimizing uploaded file for user: {}", user.getId());

        if (file.isEmpty()) {
            throw new BadRequestException("File is empty");
        }

        if (jobDescription == null || jobDescription.isBlank()) {
            throw new BadRequestException("Job description is required");
        }

        ai.applysmart.dto.resume.ResumeLayoutInfo layoutInfo = pdfLayoutAnalyzer.analyzeLayout(file);
        log.info("Extracted layout info - Primary font: {}, Accent color: {}",
                 layoutInfo.getPrimaryFont(), layoutInfo.getAccentColor());

        String originalContent = fileParserService.extractTextFromFile(file);

        ResumeOptimizationDto optimization = claudeService.optimizeResume(originalContent, jobDescription);

        long timestamp = System.currentTimeMillis();

        String pdfFilename = String.format("user-%d-optimized-%d.pdf", user.getId(), timestamp);
        byte[] pdfBytes = htmlPdfGenerator.generateStyledPdf(optimization.getContent(), layoutInfo);
        ai.applysmart.dto.FileUploadResult pdfUploadResult = fileStorageService.uploadFileBytes(pdfBytes, pdfFilename);

        optimization.setFileUrl(pdfUploadResult.getUrl());
        return optimization;
    }

    private ResumeDto convertToDto(Resume resume) {
        return ResumeDto.builder()
                .id(resume.getId())
                .name(resume.getName())
                .content(resume.getContent())
                .fileUrl(resume.getFileUrl())
                .score(resume.getScore())
                .status(resume.getStatus().name().toLowerCase())
                .wordCount(resume.getWordCount())
                .atsScore(resume.getAtsScore())
                .lastModified(resume.getUpdatedAt())
                .createdAt(resume.getCreatedAt())
                .build();
    }
}
