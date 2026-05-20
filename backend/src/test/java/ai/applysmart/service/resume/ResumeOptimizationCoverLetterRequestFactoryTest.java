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

    private final AnthropicClient anthropicClient = Mockito.mock(AnthropicClient.class);

    private final ResumeOptimizationCoverLetterRequestFactory factory =
            new ResumeOptimizationCoverLetterRequestFactory(
                    new ResumeOptimizationCoverLetterTargetResolver(
                            new ResumeOptimizationJobDescriptionParser(
                                    anthropicClient,
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
    void buildUsesFallbackCompanyWhenCompanyCannotBeInferred() {
        Mockito.when(anthropicClient.complete(Mockito.anyString()))
                .thenReturn("{\"company\": null, \"position\": \"Product Designer\"}");

        OptimizeCoverLetterRequest coverLetterOptions = new OptimizeCoverLetterRequest();
        coverLetterOptions.setEnabled(true);

        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("""
                Position: Product Designer
                Responsibilities:
                - Build intuitive financial tools.
                """);
        request.setCoverLetter(coverLetterOptions);
        Resume optimizedResume = new Resume();
        optimizedResume.setId(9L);

        CoverLetterRequest result = factory.build(request, optimizedResume);

        assertEquals(ResumeOptimizationCoverLetterTargetResolver.DEFAULT_COMPANY_NAME, result.getCompany());
        assertEquals("Product Designer", result.getPosition());
    }

    @Test
    void buildUsesAiPositionAndFallbackCompanyWhenOnlyPositionCanBeInferred() {
        Mockito.when(anthropicClient.complete(Mockito.anyString()))
                .thenReturn("{\"company\": null, \"position\": \"Product Designer\"}");

        OptimizeCoverLetterRequest coverLetterOptions = new OptimizeCoverLetterRequest();
        coverLetterOptions.setEnabled(true);

        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("""
                About the role
                You will lead discovery and interface design for customer-facing financial tools.
                Responsibilities:
                - Partner with product and engineering to ship new workflows.
                Requirements:
                - Strong portfolio and experience with design systems.
                """);
        request.setCoverLetter(coverLetterOptions);
        Resume optimizedResume = new Resume();
        optimizedResume.setId(9L);

        CoverLetterRequest result = factory.build(request, optimizedResume);

        assertEquals(ResumeOptimizationCoverLetterTargetResolver.DEFAULT_COMPANY_NAME, result.getCompany());
        assertEquals("Product Designer", result.getPosition());
    }

    @Test
    void buildUsesHeadingPositionAndFallbackCompanyWhenCompanyCannotBeInferred() {
        Mockito.when(anthropicClient.complete(Mockito.anyString()))
                .thenReturn("{\"company\": null, \"position\": null}");

        OptimizeCoverLetterRequest coverLetterOptions = new OptimizeCoverLetterRequest();
        coverLetterOptions.setEnabled(true);

        OptimizeResumeRequest request = new OptimizeResumeRequest();
        request.setJobDescription("""
                Product Designer

                About the role
                You will lead discovery and interface design for customer-facing financial tools.

                Responsibilities:
                - Partner with product and engineering to ship new workflows.
                Requirements:
                - Strong portfolio and experience with design systems.
                """);
        request.setCoverLetter(coverLetterOptions);
        Resume optimizedResume = new Resume();
        optimizedResume.setId(9L);

        CoverLetterRequest result = factory.build(request, optimizedResume);

        assertEquals(ResumeOptimizationCoverLetterTargetResolver.DEFAULT_COMPANY_NAME, result.getCompany());
        assertEquals("Product Designer", result.getPosition());
    }

    @Test
    void buildRejectsJobDescriptionWhenPositionCannotBeInferred() {
        Mockito.when(anthropicClient.complete(Mockito.anyString()))
                .thenReturn("{\"company\": \"Stripe\", \"position\": null}");

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
                "Could not infer the position from the job description. Please use a job description that clearly includes the role title.",
                exception.getMessage()
        );
    }
}
