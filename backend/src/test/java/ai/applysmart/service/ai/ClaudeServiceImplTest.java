package ai.applysmart.service.ai;

import ai.applysmart.exception.ApiCommunicationException;
import ai.applysmart.service.prompt.PromptBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClaudeServiceImplTest {

    private static final String RESUME = "Built backend services";
    private static final String JOB_DESCRIPTION = "We need a Java engineer";
    private static final String COMPANY = "Acme";
    private static final String POSITION = "Backend Engineer";
    private static final String TONE = "formal";
    private static final String ACHIEVEMENTS = "Scaled APIs by 40%";

    @Mock
    private PromptBuilder promptBuilder;

    @Mock
    private AnthropicClient anthropicClient;

    private ClaudeServiceImpl service;

    @BeforeEach
    void setUp() {
        service = new ClaudeServiceImpl(new ObjectMapper(), promptBuilder, anthropicClient);
    }

    @Test
    void generateCoverLetterExtractsContentFromStructuredAiResponse() {
        String prompt = "cover-letter-prompt";
        String aiResponse = """
                {
                  "content": "Dear Hiring Manager,\\n\\nI am excited to apply.",
                  "tone": "formal",
                  "highlights": ["APIs"]
                }
                """;

        when(promptBuilder.buildCoverLetterPrompt(RESUME, JOB_DESCRIPTION, COMPANY, POSITION, TONE, ACHIEVEMENTS))
                .thenReturn(prompt);
        when(anthropicClient.complete(prompt)).thenReturn(aiResponse);

        String result = service.generateCoverLetter(RESUME, JOB_DESCRIPTION, COMPANY, POSITION, TONE, ACHIEVEMENTS);

        assertEquals("Dear Hiring Manager,\n\nI am excited to apply.", result);
        verify(anthropicClient).complete(prompt);
    }

    @Test
    void generateCoverLetterAcceptsPlainTextAiResponses() {
        String prompt = "cover-letter-prompt";
        String aiResponse = "Dear Hiring Manager,\n\nI am excited to apply.";

        when(promptBuilder.buildCoverLetterPrompt(RESUME, JOB_DESCRIPTION, COMPANY, POSITION, TONE, ACHIEVEMENTS))
                .thenReturn(prompt);
        when(anthropicClient.complete(prompt)).thenReturn(aiResponse);

        String result = service.generateCoverLetter(RESUME, JOB_DESCRIPTION, COMPANY, POSITION, TONE, ACHIEVEMENTS);

        assertEquals(aiResponse, result);
    }

    @Test
    void generateCoverLetterRejectsStructuredResponsesWithoutContent() {
        String prompt = "cover-letter-prompt";
        String aiResponse = """
                {
                  "tone": "formal",
                  "highlights": ["APIs"]
                }
                """;

        when(promptBuilder.buildCoverLetterPrompt(RESUME, JOB_DESCRIPTION, COMPANY, POSITION, TONE, ACHIEVEMENTS))
                .thenReturn(prompt);
        when(anthropicClient.complete(prompt)).thenReturn(aiResponse);

        assertThrows(
                ApiCommunicationException.class,
                () -> service.generateCoverLetter(RESUME, JOB_DESCRIPTION, COMPANY, POSITION, TONE, ACHIEVEMENTS)
        );
    }
}
