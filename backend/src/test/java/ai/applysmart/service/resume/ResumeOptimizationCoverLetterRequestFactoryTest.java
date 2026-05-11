package ai.applysmart.service.resume;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.resume.OptimizeCoverLetterRequest;
import ai.applysmart.dto.resume.OptimizeResumeRequest;
import ai.applysmart.entity.Resume;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.service.ai.AnthropicClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ResumeOptimizationCoverLetterRequestFactoryTest {

    private final ResumeOptimizationCoverLetterRequestFactory factory =
            new ResumeOptimizationCoverLetterRequestFactory(
                    new ResumeOptimizationCoverLetterTargetResolver(
                            new ResumeOptimizationJobDescriptionParser(
                                    Mockito.mock(AnthropicClient.class),
                                    new ObjectMapper()
                            )
                    )
            );

    @Test
    void buildReturnsNullWhenCoverLetterGenerationIsDisabled() {
        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("Job description");
        Resume optimizedResume = new Resume();
        optimizedResume.setId(7L);

        assertNull(factory.build(request, optimizedResume));
    }

    @Test
    void buildUsesInferredCompanyAndPositionWhenEnabled() {
        OptimizeCoverLetterRequest coverLetterOptions = new OptimizeCoverLetterRequest();
        coverLetterOptions.setEnabled(true);
        coverLetterOptions.setTone("friendly");
        coverLetterOptions.setHighlights("Led redesign");

        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("""
                Position: Product Designer
                Company: Stripe
                Build intuitive financial tools.
                """);
        request.setCoverLetter(coverLetterOptions);
        Resume optimizedResume = new Resume();
        optimizedResume.setId(9L);

        CoverLetterRequest result = factory.build(request, optimizedResume);

        assertEquals("Stripe", result.getCompany());
        assertEquals("Product Designer", result.getPosition());
        assertEquals("friendly", result.getTone());
        assertEquals("Led redesign", result.getHighlights());
        assertEquals(9L, result.getResumeId());
    }

    @Test
    void buildRejectsJobDescriptionWhenPositionCannotBeInferred() {
        OptimizeCoverLetterRequest coverLetterOptions = new OptimizeCoverLetterRequest();
        coverLetterOptions.setEnabled(true);

        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("""
                Company: Stripe
                Responsibilities
                - Build intuitive financial tools.
                """);
        request.setCoverLetter(coverLetterOptions);
        Resume optimizedResume = new Resume();
        optimizedResume.setId(9L);

        BadRequestException exception = assertThrows(
                BadRequestException.class,
                () -> factory.build(request, optimizedResume)
        );

        assertEquals(
                "Could not infer the position from the job description. Please use a job description that clearly includes both.",
                exception.getMessage()
        );
    }
}
