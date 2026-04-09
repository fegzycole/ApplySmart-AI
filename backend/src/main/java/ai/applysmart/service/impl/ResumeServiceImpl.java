package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.*;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
                .wordCount(calculateWordCount(request.getContent()))
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
            resume.setWordCount(calculateWordCount(request.getContent()));
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

        // Delete file from storage if exists
        if (resume.getCloudinaryPublicId() != null) {
            fileStorageService.deleteFile(resume.getCloudinaryPublicId());
        }

        resumeRepository.delete(resume);
        log.info("Deleted resume with ID: {}", resume.getId());
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

        // Update resume score
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

        // Use professional default layout (Calibri font, dark blue accents)
        ai.applysmart.dto.resume.ResumeLayoutInfo defaultLayout = ai.applysmart.dto.resume.ResumeLayoutInfo.builder()
                .primaryFont("Calibri")
                .secondaryFont("Calibri")
                .primaryColor("#000000")
                .accentColor("#2c3e50")
                .backgroundColor("#ffffff")
                .averageFontSize(11.0)
                .headingFontSize(16.0)
                .lineSpacing(14)
                .build();

        // Generate PDF with professional styling
        String pdfFilename = String.format("resume-%d-optimized-%d.pdf", id, timestamp);
        byte[] pdfBytes = htmlPdfGenerator.generateStyledPdf(optimization.getContent(), defaultLayout);
        ai.applysmart.dto.FileUploadResult pdfUploadResult = fileStorageService.uploadFileBytes(pdfBytes, pdfFilename);

        // Delete old files if they exist
        if (resume.getCloudinaryPublicId() != null) {
            fileStorageService.deleteFile(resume.getCloudinaryPublicId());
        }

        // Update resume (store PDF URL as primary)
        resume.setContent(optimization.getContent());
        resume.setScore(optimization.getOptimizedScore());
        resume.setStatus(Resume.Status.OPTIMIZED);
        resume.setWordCount(calculateWordCount(optimization.getContent()));
        resume.setFileUrl(pdfUploadResult.getUrl());
        resume.setCloudinaryPublicId(pdfUploadResult.getPublicId());
        resumeRepository.save(resume);

        optimization.setPdfUrl(pdfUploadResult.getUrl());
        optimization.setFileUrl(pdfUploadResult.getUrl()); // Backward compatibility
        return optimization;
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

        // Extract text and upload file
        String content = fileParserService.extractTextFromFile(file);
        ai.applysmart.dto.FileUploadResult uploadResult = fileStorageService.uploadFile(file);

        // Create resume entity
        Resume resume = Resume.builder()
                .user(user)
                .name(originalFilename)
                .content(content)
                .fileUrl(uploadResult.getUrl())
                .cloudinaryPublicId(uploadResult.getPublicId())
                .score(0)
                .status(Resume.Status.DRAFT)
                .wordCount(calculateWordCount(content))
                .build();

        resume = resumeRepository.save(resume);
        log.info("Uploaded and created resume with ID: {}", resume.getId());

        return convertToDto(resume);
    }

    private Integer calculateWordCount(String content) {
        if (content == null || content.isBlank()) {
            return 0;
        }
        return content.trim().split("\\s+").length;
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

        // Analyze original PDF layout (fonts, colors, structure)
        ai.applysmart.dto.resume.ResumeLayoutInfo layoutInfo = pdfLayoutAnalyzer.analyzeLayout(file);
        log.info("Extracted layout info - Primary font: {}, Accent color: {}",
                 layoutInfo.getPrimaryFont(), layoutInfo.getAccentColor());

        // Extract text from uploaded file
        String originalContent = fileParserService.extractTextFromFile(file);

        // Optimize with Claude
        ResumeOptimizationDto optimization = claudeService.optimizeResume(originalContent, jobDescription);

        long timestamp = System.currentTimeMillis();

        // Generate PDF with preserved layout and styling
        String pdfFilename = String.format("user-%d-optimized-%d.pdf", user.getId(), timestamp);
        byte[] pdfBytes = htmlPdfGenerator.generateStyledPdf(optimization.getContent(), layoutInfo);
        ai.applysmart.dto.FileUploadResult pdfUploadResult = fileStorageService.uploadFileBytes(pdfBytes, pdfFilename);

        optimization.setPdfUrl(pdfUploadResult.getUrl());
        optimization.setFileUrl(pdfUploadResult.getUrl()); // Backward compatibility
        return optimization;
    }

    @Override
    @Transactional
    public CoverLetterDto generateCoverLetter(MultipartFile resumeFile, String jobDescription, String companyName,
                                              String positionTitle, String tone, String keyAchievements, User user) {
        log.info("Generating cover letter for user: {} - Company: {}, Position: {}, Tone: {}",
                 user.getId(), companyName, positionTitle, tone);

        if (jobDescription == null || jobDescription.isBlank()) {
            throw new BadRequestException("Job description is required");
        }

        String resumeContent = null;
        ai.applysmart.dto.resume.ResumeLayoutInfo layoutInfo = null;

        // Extract resume content and layout if file is provided
        if (resumeFile != null && !resumeFile.isEmpty()) {
            resumeContent = fileParserService.extractTextFromFile(resumeFile);
            layoutInfo = pdfLayoutAnalyzer.analyzeLayout(resumeFile);
            log.info("Extracted resume - Primary font: {}", layoutInfo.getPrimaryFont());
        } else {
            // Use default professional layout
            layoutInfo = ai.applysmart.dto.resume.ResumeLayoutInfo.builder()
                    .primaryFont("Calibri")
                    .secondaryFont("Calibri")
                    .primaryColor("#000000")
                    .accentColor("#2c3e50")
                    .backgroundColor("#ffffff")
                    .averageFontSize(11.0)
                    .headingFontSize(16.0)
                    .lineSpacing(14)
                    .build();
        }

        // Generate cover letter with Claude
        String coverLetterContent = claudeService.generateCoverLetter(
                resumeContent, jobDescription, companyName, positionTitle, tone, keyAchievements);

        long timestamp = System.currentTimeMillis();

        // Generate PDF
        String pdfFilename = String.format("user-%d-cover-letter-%d.pdf", user.getId(), timestamp);
        byte[] pdfBytes = htmlPdfGenerator.generateStyledPdf(coverLetterContent, layoutInfo);
        ai.applysmart.dto.FileUploadResult pdfUploadResult = fileStorageService.uploadFileBytes(pdfBytes, pdfFilename);

        return CoverLetterDto.builder()
                .content(coverLetterContent)
                .pdfUrl(pdfUploadResult.getUrl())
                .build();
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
