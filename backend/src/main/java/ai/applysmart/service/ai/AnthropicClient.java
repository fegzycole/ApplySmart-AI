package ai.applysmart.service.ai;

import ai.applysmart.config.AnthropicProperties;
import ai.applysmart.exception.ApiCommunicationException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class AnthropicClient {

    private static final String API_VERSION = "2023-06-01";

    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;
    private final AnthropicProperties properties;

    public String complete(String prompt) {
        try {
            String responseJson = webClient().post()
                    .uri("/messages")
                    .bodyValue(requestBody(prompt))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(Duration.ofMillis(properties.getTimeout()));

            JsonNode contentArray = objectMapper.readTree(responseJson).get("content");
            if (contentArray != null && contentArray.isArray() && contentArray.size() > 0) {
                return stripMarkdownCodeFences(contentArray.get(0).get("text").asText());
            }

            throw new ApiCommunicationException("Invalid response format from Claude API");
        } catch (ApiCommunicationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error calling Claude API", e);
            throw new ApiCommunicationException("Failed to communicate with AI service", e);
        }
    }

    private WebClient webClient() {
        return webClientBuilder
                .baseUrl(properties.getApiUrl())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("x-api-key", properties.getApiKey())
                .defaultHeader("anthropic-version", API_VERSION)
                .build();
    }

    private Map<String, Object> requestBody(String prompt) {
        return Map.of(
                "model", properties.getModel(),
                "max_tokens", properties.getMaxTokens(),
                "temperature", properties.getTemperature(),
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );
    }

    private String stripMarkdownCodeFences(String text) {
        if (text == null) {
            return null;
        }

        String cleaned = text.trim();
        if (!cleaned.startsWith("```")) {
            return cleaned;
        }

        int firstNewline = cleaned.indexOf('\n');
        if (firstNewline > 0) {
            cleaned = cleaned.substring(firstNewline + 1);
        }

        if (cleaned.endsWith("```")) {
            cleaned = cleaned.substring(0, cleaned.length() - 3).trim();
        }

        return cleaned;
    }
}
