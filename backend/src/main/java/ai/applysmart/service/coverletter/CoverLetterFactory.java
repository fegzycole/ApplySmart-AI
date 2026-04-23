package ai.applysmart.service.coverletter;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.coverletter.UpdateCoverLetterRequest;
import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import ai.applysmart.util.TextUtils;
import org.springframework.stereotype.Component;

@Component
public class CoverLetterFactory {

    public CoverLetter create(CoverLetterRequest request, User user, String content, String tone) {
        return CoverLetter.builder()
                .user(user)
                .company(request.getCompany())
                .position(request.getPosition())
                .content(content)
                .tone(tone)
                .wordCount(TextUtils.calculateWordCount(content))
                .linkedResumeId(request.getResumeId())
                .jobDescription(request.getJobDescription())
                .build();
    }

    public void applyUpdates(CoverLetter coverLetter, UpdateCoverLetterRequest request) {
        if (request.getContent() != null) {
            coverLetter.setContent(request.getContent());
            coverLetter.setWordCount(TextUtils.calculateWordCount(request.getContent()));
        }

        if (request.getTone() != null) {
            coverLetter.setTone(request.getTone());
        }
    }
}
