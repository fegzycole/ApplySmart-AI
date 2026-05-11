package ai.applysmart.service.resume;

import ai.applysmart.service.ai.AnthropicClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
}
