package ai.applysmart.service.impl;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.coverletter.CoverLetterResponseDto;
import ai.applysmart.dto.coverletter.UpdateCoverLetterRequest;
import ai.applysmart.dto.resume.ResumeLayoutInfo;
import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.CoverLetterRepository;
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

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CoverLetterServiceImpl implements CoverLetterService {

    private final CoverLetterRepository coverLetterRepository;
    private final ResumeRepository resumeRepository;
    private final ClaudeService claudeService;
    private final HtmlPdfGenerator htmlPdfGenerator;
    private final FileStorageService fileStorageService;
    private final PdfLayoutAnalyzer pdfLayoutAnalyzer;
    private final FileParserService fileParserService;

    @Override
    @Transactional
    public CoverLetterResponseDto generateCoverLetter(CoverLetterRequest request, User user) {
        log.info("Generating cover letter for user: {} - Company: {}, Position: {}, Tone: {}",
                user.getId(), request.getCompany(), request.getPosition(), request.getTone());

        if (request.getJobDescription() == null || request.getJobDescription().isBlank()) {
            throw new BadRequestException("Job description is required");
        }

        String resumeContent = null;
        ResumeLayoutInfo layoutInfo = null;

        if (request.getResumeId() != null) {
            Resume resume = resumeRepository.findByIdAndUser(request.getResumeId(), user)
                    .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
            resumeContent = resume.getContent();

            layoutInfo = LayoutUtils.createDefaultProfessionalLayout();
        } else {
            layoutInfo = LayoutUtils.createDefaultProfessionalLayout();
        }

        String coverLetterContent = claudeService.generateCoverLetter(
                resumeContent,
                request.getJobDescription(),
                request.getCompany(),
                request.getPosition(),
                request.getTone() != null ? request.getTone() : "professional",
                request.getHighlights()
        );

        long timestamp = System.currentTimeMillis();

        String pdfFilename = String.format("user-%d-cover-letter-%s-%s-%d.pdf",
                user.getId(),
                request.getCompany().replaceAll("[^a-zA-Z0-9]", "-"),
                request.getPosition().replaceAll("[^a-zA-Z0-9]", "-"),
                timestamp);
        byte[] pdfBytes = htmlPdfGenerator.generateStyledPdf(coverLetterContent, layoutInfo);
        ai.applysmart.dto.FileUploadResult pdfUploadResult = fileStorageService.uploadFileBytes(pdfBytes, pdfFilename);

        Integer wordCount = TextUtils.calculateWordCount(coverLetterContent);

        CoverLetter coverLetter = CoverLetter.builder()
                .user(user)
                .company(request.getCompany())
                .position(request.getPosition())
                .content(coverLetterContent)
                .tone(request.getTone() != null ? request.getTone() : "professional")
                .wordCount(wordCount)
                .linkedResumeId(request.getResumeId())
                .jobDescription(request.getJobDescription())
                .build();

        coverLetter = coverLetterRepository.save(coverLetter);
        log.info("Created cover letter with ID: {}", coverLetter.getId());

        return convertToDto(coverLetter, pdfUploadResult.getUrl());
    }

    @Override
    @Transactional
    public ai.applysmart.dto.resume.CoverLetterDto generateCoverLetter(
            org.springframework.web.multipart.MultipartFile resumeFile, String jobDescription, String companyName,
            String positionTitle, String tone, String keyAchievements, User user) {
        log.info("Generating cover letter for user: {} - Company: {}, Position: {}, Tone: {}",
                 user.getId(), companyName, positionTitle, tone);

        if (jobDescription == null || jobDescription.isBlank()) {
            throw new BadRequestException("Job description is required");
        }

        String resumeContent = null;
        ResumeLayoutInfo layoutInfo = null;

        if (resumeFile != null && !resumeFile.isEmpty()) {
            resumeContent = fileParserService.extractTextFromFile(resumeFile);
            layoutInfo = pdfLayoutAnalyzer.analyzeLayout(resumeFile);
            log.info("Extracted resume - Primary font: {}", layoutInfo.getPrimaryFont());
        } else {
            layoutInfo = LayoutUtils.createDefaultProfessionalLayout();
        }

        String coverLetterContent = claudeService.generateCoverLetter(
                resumeContent, jobDescription, companyName, positionTitle, tone, keyAchievements);

        long timestamp = System.currentTimeMillis();

        String pdfFilename = String.format("user-%d-cover-letter-%d.pdf", user.getId(), timestamp);
        byte[] pdfBytes = htmlPdfGenerator.generateStyledPdf(coverLetterContent, layoutInfo);
        ai.applysmart.dto.FileUploadResult pdfUploadResult = fileStorageService.uploadFileBytes(pdfBytes, pdfFilename);

        return ai.applysmart.dto.resume.CoverLetterDto.builder()
                .content(coverLetterContent)
                .pdfUrl(pdfUploadResult.getUrl())
                .build();
    }

    @Override
    public List<CoverLetterResponseDto> getAllCoverLetters(User user) {
        log.info("Fetching all cover letters for user: {}", user.getId());

        return coverLetterRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(cl -> convertToDto(cl, null))
                .collect(Collectors.toList());
    }

    @Override
    public Page<CoverLetterResponseDto> getAllCoverLetters(User user, Pageable pageable) {
        log.info("Fetching paginated cover letters for user: {} (page: {}, size: {})",
                user.getId(), pageable.getPageNumber(), pageable.getPageSize());

        return coverLetterRepository.findByUserOrderByCreatedAtDesc(user, pageable)
                .map(cl -> convertToDto(cl, null));
    }

    @Override
    public CoverLetterResponseDto getCoverLetterById(Long id, User user) {
        log.info("Fetching cover letter {} for user: {}", id, user.getId());

        CoverLetter coverLetter = coverLetterRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Cover letter not found"));

        return convertToDto(coverLetter, null);
    }

    @Override
    @Transactional
    public CoverLetterResponseDto updateCoverLetter(Long id, UpdateCoverLetterRequest request, User user) {
        log.info("Updating cover letter {} for user: {}", id, user.getId());

        CoverLetter coverLetter = coverLetterRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Cover letter not found"));

        if (request.getContent() != null) {
            coverLetter.setContent(request.getContent());
            coverLetter.setWordCount(TextUtils.calculateWordCount(request.getContent()));
        }

        if (request.getTone() != null) {
            coverLetter.setTone(request.getTone());
        }

        coverLetter = coverLetterRepository.save(coverLetter);
        log.info("Updated cover letter with ID: {}", coverLetter.getId());

        return convertToDto(coverLetter, null);
    }

    @Override
    @Transactional
    public void deleteCoverLetter(Long id, User user) {
        log.info("Deleting cover letter {} for user: {}", id, user.getId());

        CoverLetter coverLetter = coverLetterRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Cover letter not found"));

        coverLetterRepository.softDelete(id, user);
        log.info("Soft deleted cover letter with ID: {}", id);
    }

    @Override
    @Transactional
    public CoverLetterResponseDto regenerateCoverLetter(Long id, CoverLetterRequest request, User user) {
        log.info("Regenerating cover letter {} for user: {}", id, user.getId());

        CoverLetter existingCoverLetter = coverLetterRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Cover letter not found"));

        coverLetterRepository.delete(existingCoverLetter);

        return generateCoverLetter(request, user);
    }


    private CoverLetterResponseDto convertToDto(CoverLetter coverLetter, String pdfUrl) {
        return CoverLetterResponseDto.builder()
                .id(coverLetter.getId())
                .company(coverLetter.getCompany())
                .position(coverLetter.getPosition())
                .content(coverLetter.getContent())
                .tone(coverLetter.getTone())
                .wordCount(coverLetter.getWordCount())
                .linkedResumeId(coverLetter.getLinkedResumeId())
                .pdfUrl(pdfUrl) // PDF URL is only available during generation
                .createdAt(coverLetter.getCreatedAt())
                .lastModified(coverLetter.getUpdatedAt())
                .build();
    }
}
