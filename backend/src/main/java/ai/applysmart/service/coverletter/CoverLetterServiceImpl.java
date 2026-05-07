package ai.applysmart.service.coverletter;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.coverletter.CoverLetterResponseDto;
import ai.applysmart.dto.coverletter.UpdateCoverLetterRequest;
import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.CoverLetterRepository;
import ai.applysmart.service.coverletter.CoverLetterService;
import ai.applysmart.service.coverletter.CoverLetterContentGenerator;
import ai.applysmart.service.coverletter.CoverLetterDtoMapper;
import ai.applysmart.service.coverletter.CoverLetterFactory;
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
@Transactional(readOnly = true)
public class CoverLetterServiceImpl implements CoverLetterService {

    private final CoverLetterRepository coverLetterRepository;
    private final CoverLetterContentGenerator coverLetterContentGenerator;
    private final CoverLetterFactory coverLetterFactory;
    private final CoverLetterFileManager coverLetterFileManager;
    private final CoverLetterDtoMapper coverLetterDtoMapper;

    @Override
    @Transactional
    public CoverLetterResponseDto generateCoverLetter(CoverLetterRequest request, User user) {
        log.info("Generating cover letter for user: {} - Company: {}, Position: {}, Tone: {}",
                user.getId(), request.getCompany(), request.getPosition(), request.getTone());

        String coverLetterContent = coverLetterContentGenerator.generate(request, user);
        String tone = coverLetterContentGenerator.normalizeTone(request.getTone());
        CoverLetter coverLetter = coverLetterFactory.create(request, user, coverLetterContent, tone);
        coverLetterFileManager.syncStoredFile(coverLetter, user);
        coverLetter = coverLetterRepository.save(coverLetter);
        log.info("Created cover letter with ID: {}", coverLetter.getId());

        return coverLetterDtoMapper.toResponseDto(coverLetter);
    }

    @Override
    @Transactional
    public CoverLetterResponseDto generateCoverLetter(
            MultipartFile resumeFile, String jobDescription, String companyName,
            String positionTitle, String tone, String keyAchievements, User user) {
        log.info("Generating cover letter for user: {} - Company: {}, Position: {}, Tone: {}",
                 user.getId(), companyName, positionTitle, tone);

        String coverLetterContent = coverLetterContentGenerator.generate(
                resumeFile,
                jobDescription,
                companyName,
                positionTitle,
                tone,
                keyAchievements
        );

        String normalizedTone = coverLetterContentGenerator.normalizeTone(tone);
        CoverLetterRequest request = new CoverLetterRequest();
        request.setCompany(companyName);
        request.setPosition(positionTitle);
        request.setJobDescription(jobDescription);
        request.setTone(normalizedTone);
        request.setHighlights(keyAchievements);

        CoverLetter coverLetter = coverLetterFactory.create(request, user, coverLetterContent, normalizedTone);
        coverLetterFileManager.syncStoredFile(coverLetter, user);
        coverLetter = coverLetterRepository.save(coverLetter);

        return coverLetterDtoMapper.toResponseDto(coverLetter);
    }

    @Override
    public List<CoverLetterResponseDto> getAllCoverLetters(User user) {
        log.info("Fetching all cover letters for user: {}", user.getId());

        return coverLetterRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(coverLetterDtoMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CoverLetterResponseDto> getAllCoverLetters(User user, Pageable pageable, String query) {
        log.info("Fetching paginated cover letters for user: {} (page: {}, size: {})",
                user.getId(), pageable.getPageNumber(), pageable.getPageSize());

        return coverLetterRepository.findDocumentPageByUser(
                        user.getId(),
                        TextUtils.trimToNull(query),
                        pageable
                )
                .map(coverLetterDtoMapper::toResponseDto);
    }

    @Override
    public CoverLetterResponseDto getCoverLetterById(Long id, User user) {
        log.info("Fetching cover letter {} for user: {}", id, user.getId());

        CoverLetter coverLetter = coverLetterRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Cover letter not found"));

        return coverLetterDtoMapper.toResponseDto(coverLetter);
    }

    @Override
    @Transactional
    public CoverLetterResponseDto updateCoverLetter(Long id, UpdateCoverLetterRequest request, User user) {
        log.info("Updating cover letter {} for user: {}", id, user.getId());

        CoverLetter coverLetter = coverLetterRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Cover letter not found"));

        coverLetterFactory.applyUpdates(coverLetter, request);
        coverLetterFileManager.syncStoredFile(coverLetter, user);
        coverLetter = coverLetterRepository.save(coverLetter);
        log.info("Updated cover letter with ID: {}", coverLetter.getId());

        return coverLetterDtoMapper.toResponseDto(coverLetter);
    }

    @Override
    @Transactional
    public void deleteCoverLetter(Long id, User user) {
        log.info("Deleting cover letter {} for user: {}", id, user.getId());

        CoverLetter coverLetter = coverLetterRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Cover letter not found"));

        coverLetterFileManager.deleteStoredFile(coverLetter);
        coverLetterRepository.softDelete(id, user);
        log.info("Soft deleted cover letter with ID: {}", id);
    }

    @Override
    @Transactional
    public CoverLetterResponseDto regenerateCoverLetter(Long id, CoverLetterRequest request, User user) {
        log.info("Regenerating cover letter {} for user: {}", id, user.getId());

        CoverLetter existingCoverLetter = coverLetterRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Cover letter not found"));

        coverLetterFileManager.deleteStoredFile(existingCoverLetter);
        coverLetterRepository.delete(existingCoverLetter);

        return generateCoverLetter(request, user);
    }
}
