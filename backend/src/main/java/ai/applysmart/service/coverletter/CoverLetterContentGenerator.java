package ai.applysmart.service.coverletter;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.service.ai.ClaudeService;
import ai.applysmart.service.file.FileParserService;
import ai.applysmart.util.TextUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class CoverLetterContentGenerator {

    private static final String DEFAULT_TONE = "professional";

    private final ResumeRepository resumeRepository;
    private final ClaudeService claudeService;
    private final FileParserService fileParserService;

    public String generate(CoverLetterRequest request, User user) {
        validateJobDescription(request.getJobDescription());

        return claudeService.generateCoverLetter(
                resolveResumeContent(request.getResumeId(), user),
                request.getJobDescription(),
                request.getCompany(),
                request.getPosition(),
                normalizeTone(request.getTone()),
                request.getHighlights()
        );
    }

    public String generate(
            MultipartFile resumeFile,
            String jobDescription,
            String companyName,
            String positionTitle,
            String tone,
            String keyAchievements
    ) {
        validateJobDescription(jobDescription);

        return claudeService.generateCoverLetter(
                extractResumeContent(resumeFile),
                jobDescription,
                companyName,
                positionTitle,
                normalizeTone(tone),
                keyAchievements
        );
    }

    public String normalizeTone(String tone) {
        return TextUtils.isNotBlank(tone) ? tone : DEFAULT_TONE;
    }

    private String resolveResumeContent(Long resumeId, User user) {
        if (resumeId == null) {
            return null;
        }

        Resume resume = resumeRepository.findByIdAndUser(resumeId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        return resume.getContent();
    }

    private String extractResumeContent(MultipartFile resumeFile) {
        if (resumeFile == null || resumeFile.isEmpty()) {
            return null;
        }

        return fileParserService.extractTextFromFile(resumeFile);
    }

    private void validateJobDescription(String jobDescription) {
        if (TextUtils.isBlank(jobDescription)) {
            throw new BadRequestException("Job description is required");
        }
    }
}
