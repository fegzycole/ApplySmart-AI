package ai.applysmart.service.resume;

import ai.applysmart.service.ai.AnthropicClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

class ResumeOptimizationJobDescriptionParserTest {

    private final ResumeOptimizationJobDescriptionParser parser =
            new ResumeOptimizationJobDescriptionParser(
                    Mockito.mock(AnthropicClient.class),
                    new ObjectMapper()
            );

    @Test
    void extractCompanyNameReadsExplicitCompanyLine() {
        assertEquals(
                "Stripe",
                parser.extractCompanyName("""
                        Position: Product Designer
                        Company: Stripe
                        Build intuitive financial tools.
                        """).orElseThrow()
        );
    }

    @Test
    void extractPositionTitleReadsExplicitPositionLine() {
        assertEquals(
                "Product Designer",
                parser.extractPositionTitle("""
                        Position: Product Designer
                        Company: Stripe
                        Build intuitive financial tools.
                        """).orElseThrow()
        );
    }

    @Test
    void extractPositionTitleReadsJobPostHeadingWithoutCompany() {
        assertEquals(
                "Product Designer",
                parser.extractPositionTitle("""
                        Product Designer

                        About the role
                        You will build intuitive financial tools for customers.

                        Responsibilities:
                        - Partner with product and engineering to ship new workflows.
                        """).orElseThrow()
        );
    }

    @Test
    void extractTargetUsesHiringSentenceWhenPresent() {
        ResumeOptimizationJobTarget target = parser.extractTarget(
                "Moniepoint is hiring a Senior Product Designer to shape financial tools across Africa."
        ).orElseThrow();

        assertEquals("Moniepoint", target.company());
        assertEquals("Senior Product Designer", target.position());
    }

    @Test
    void extractPositionReturnsEmptyWhenDescriptionLacksRoleSignals() {
        assertTrue(parser.extractPositionTitle("""
                Company: Stripe
                Responsibilities
                - Build intuitive financial tools.
                """).isEmpty());
    }

    @Test
    void extractCompanyReturnsEmptyForAboutTheRoleSectionHeading() {
        assertTrue(parser.extractCompanyName("""
                About the role
                You will build intuitive financial tools for customers.
                """).isEmpty());
    }

    @Test
    void extractTargetWithAIReturnsPartialTargetWhenOneFieldIsPresent() {
        AnthropicClient anthropicClient = Mockito.mock(AnthropicClient.class);
        ResumeOptimizationJobDescriptionParser aiParser =
                new ResumeOptimizationJobDescriptionParser(anthropicClient, new ObjectMapper());

        when(anthropicClient.complete(Mockito.anyString()))
                .thenReturn("{\"company\": \"Stripe\", \"position\": null}");

        ResumeOptimizationJobTarget target = aiParser.extractTargetWithAI("Job description").orElseThrow();

        assertEquals("Stripe", target.company());
        assertNull(target.position());
    }

    @Test
    void extractTargetWithAIReturnsEmptyWhenFieldsAreBlank() {
        AnthropicClient anthropicClient = Mockito.mock(AnthropicClient.class);
        ResumeOptimizationJobDescriptionParser aiParser =
                new ResumeOptimizationJobDescriptionParser(anthropicClient, new ObjectMapper());

        when(anthropicClient.complete(Mockito.anyString()))
                .thenReturn("{\"company\": \"   \", \"position\": \"\"}");

        assertTrue(aiParser.extractTargetWithAI("Job description").isEmpty());
    }
}
