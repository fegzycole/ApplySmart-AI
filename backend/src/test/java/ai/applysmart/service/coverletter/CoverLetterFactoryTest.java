package ai.applysmart.service.coverletter;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.coverletter.UpdateCoverLetterRequest;
import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;

class CoverLetterFactoryTest {

    private final CoverLetterFactory factory = new CoverLetterFactory();

    @Test
    void createBuildsPersistentCoverLetterFields() {
        User user = User.builder().email("user@example.com").firstName("Ada").lastName("Lovelace").build();
        CoverLetterRequest request = new CoverLetterRequest();
        request.setCompany("Acme");
        request.setPosition("Backend Engineer");
        request.setJobDescription("Build APIs");
        request.setResumeId(42L);

        CoverLetter coverLetter = factory.create(request, user, "A concise cover letter", "professional");

        assertSame(user, coverLetter.getUser());
        assertEquals("Acme", coverLetter.getCompany());
        assertEquals("Backend Engineer", coverLetter.getPosition());
        assertEquals("professional", coverLetter.getTone());
        assertEquals(4, coverLetter.getWordCount());
        assertEquals(42L, coverLetter.getLinkedResumeId());
    }

    @Test
    void applyUpdatesRefreshesWordCountWhenContentChanges() {
        CoverLetter coverLetter = CoverLetter.builder()
                .content("Old content")
                .tone("formal")
                .wordCount(2)
                .build();
        UpdateCoverLetterRequest request = new UpdateCoverLetterRequest();
        request.setContent("New concise content");
        request.setTone("confident");

        factory.applyUpdates(coverLetter, request);

        assertEquals("New concise content", coverLetter.getContent());
        assertEquals("confident", coverLetter.getTone());
        assertEquals(3, coverLetter.getWordCount());
    }
}
