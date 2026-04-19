package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.*;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.service.*;
import ai.applysmart.service.PdfManipulationService;
import ai.applysmart.util.TextUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final PdfManipulationService pdfManipulationService;
    private final ResumeParserService resumeParserService;
    private final ResumeTemplateService resumeTemplateService;

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

        // AI optimization - returns structured text data only
        ResumeOptimizationDto optimization = claudeService.optimizeResume(
                resume.getContent(),
                request.getJobDescription()
        );

        // Update resume with optimized content (PDF generation will happen on frontend)
        resume.setContent(optimization.getContent());
        resume.setScore(optimization.getOptimizedScore());
        resume.setStatus(Resume.Status.OPTIMIZED);
        resume.setWordCount(TextUtils.calculateWordCount(optimization.getContent()));
        resumeRepository.save(resume);

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

        // Extract text for AI processing
        String content = fileParserService.extractTextFromFile(file);
        
        // Store original PDF
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
    public ResumeOptimizationDto optimizeUploadedFile(MultipartFile file, String jobDescription, String template, User user) {
        log.info("Optimizing uploaded file for user: {} with template: {}", user.getId(), template);

        if (file.isEmpty()) {
            throw new BadRequestException("File is empty");
        }

        if (jobDescription == null || jobDescription.isBlank()) {
            throw new BadRequestException("Job description is required");
        }

        try {
            // Step 1: Parse PDF into structured data
            log.info("Parsing resume PDF: {}", file.getOriginalFilename());
            ParsedResumeDto parsedResume = resumeParserService.parseResume(file);
            log.info("Successfully parsed resume for: {}",
                    parsedResume.getPersonalInfo() != null ? parsedResume.getPersonalInfo().getName() : "Unknown");

            // Step 2: Optimize structured data with AI
            log.info("Optimizing structured resume data with AI...");
            ParsedResumeDto optimizedResume = claudeService.optimizeStructuredResume(parsedResume, jobDescription);
            log.info("AI optimization completed successfully");

            // Step 3: Select template (default to MODERN if not provided or invalid)
            ResumeTemplate selectedTemplate;
            try {
                selectedTemplate = template != null ? ResumeTemplate.valueOf(template.toUpperCase()) : ResumeTemplate.MODERN;
            } catch (IllegalArgumentException e) {
                log.warn("Invalid template '{}', using MODERN as default", template);
                selectedTemplate = ResumeTemplate.MODERN;
            }

            // Step 4: Generate PDF from optimized data using selected template
            log.info("Generating PDF using template: {}", selectedTemplate.getDisplayName());
            byte[] optimizedPdfBytes = resumeTemplateService.generatePdf(optimizedResume, selectedTemplate);
            log.info("PDF generation completed. Size: {} bytes", optimizedPdfBytes.length);

            // Step 5: Upload optimized PDF to storage
            log.info("Uploading optimized PDF to storage...");
            String originalFilename = file.getOriginalFilename();
            String optimizedFilename = originalFilename != null ?
                    originalFilename.replace(".pdf", "-optimized.pdf") : "resume-optimized.pdf";

            ai.applysmart.dto.FileUploadResult uploadResult = fileStorageService.uploadFileBytes(
                    optimizedPdfBytes, optimizedFilename);
            log.info("Optimized PDF uploaded successfully. URL: {}", uploadResult.getUrl());

            // Step 6: Build optimization result
            // TODO: Calculate scores from parsed vs optimized data
            ResumeOptimizationDto result = ResumeOptimizationDto.builder()
                    .originalScore(75) // Placeholder - would calculate from parsedResume
                    .optimizedScore(90) // Placeholder - would calculate from optimizedResume
                    .changes(List.of(
                            "Enhanced work experience bullet points with stronger action verbs",
                            "Added relevant keywords from job description",
                            "Optimized professional summary for target role"
                    )) // Placeholder - would compare parsedResume and optimizedResume
                    .content("") // Not needed for template-based approach
                    .fileUrl(uploadResult.getUrl())
                    .build();

            log.info("Optimization process completed successfully");
            return result;
        } catch (Exception e) {
            log.error("Error during optimization process for user {}", user.getId(), e);
            throw e;
        }
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
