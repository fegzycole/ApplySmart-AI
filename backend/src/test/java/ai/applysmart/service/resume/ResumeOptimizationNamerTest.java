package ai.applysmart.service.resume;

import ai.applysmart.entity.User;
import ai.applysmart.service.ai.AnthropicClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ResumeOptimizationNamerTest {

    private final ResumeOptimizationNamer resumeOptimizationNamer =
            new ResumeOptimizationNamer(
                    new ResumeOptimizationJobDescriptionParser(
                            Mockito.mock(AnthropicClient.class),
                            new ObjectMapper()
                    )
            );

    @Test
    void buildOptimizedResumeNameUsesExplicitCompanyLine() {
        User user = User.builder()
                .email("user@example.com")
                .firstName("Ada")
                .lastName("Lovelace")
                .build();

        String name = resumeOptimizationNamer.buildOptimizedResumeName(
                user,
                """
                Senior Backend Engineer
                Company: Stripe
                Build reliable payments infrastructure.
                """
        );

        assertEquals("Ada Lovelace - Stripe Optimized Resume", name);
    }

    @Test
    void buildOptimizedResumeNameUsesHiringSentenceWhenPresent() {
        User user = User.builder()
                .email("user@example.com")
                .firstName("Ada")
                .lastName("Lovelace")
                .build();

        String name = resumeOptimizationNamer.buildOptimizedResumeName(
                user,
                "Moniepoint is hiring a Senior Product Designer to shape financial tools across Africa."
        );

        assertEquals("Ada Lovelace - Moniepoint Optimized Resume", name);
    }

    @Test
    void buildOptimizedResumeNameFallsBackToUserNameWhenCompanyCannotBeInferred() {
        User user = User.builder()
                .email("user@example.com")
                .firstName("Ada")
                .lastName("Lovelace")
                .build();

        String name = resumeOptimizationNamer.buildOptimizedResumeName(
                user,
                """
                Responsibilities
                - Build APIs
                - Mentor engineers
                """
        );

        assertEquals("Ada Lovelace - Optimized Resume", name);
    }

    @Test
    void buildOptimizedPdfFilenameSanitizesGeneratedName() {
        User user = User.builder()
                .email("user@example.com")
                .firstName("Ada")
                .lastName("Lovelace")
                .build();

        String filename = resumeOptimizationNamer.buildOptimizedPdfFilename(
                user,
                "Company: Acme, Inc."
        );

        assertEquals("ada-lovelace-acme-inc-optimized-resume.pdf", filename);
    }
}
