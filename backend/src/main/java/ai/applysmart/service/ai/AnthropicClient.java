package ai.applysmart.service.ai;

import ai.applysmart.config.AnthropicProperties;
import ai.applysmart.exception.ApiCommunicationException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class AnthropicClient {

    private static final String API_VERSION = "2023-06-01";
    private static final int HTTP_TOO_MANY_REQUESTS = 429;
    private static final int HTTP_BAD_GATEWAY = 502;
    private static final int HTTP_SERVICE_UNAVAILABLE = 503;
    private static final int HTTP_GATEWAY_TIMEOUT = 504;
    private static final int HTTP_ANTHROPIC_OVERLOADED = 529;
    private static final String TEMPORARILY_UNAVAILABLE_MESSAGE =
            "AI service is temporarily unavailable. Please try again shortly.";

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final AnthropicProperties properties;

    public AnthropicClient(WebClient.Builder webClientBuilder, ObjectMapper objectMapper, AnthropicProperties properties) {
        this.objectMapper = objectMapper;
        this.properties = properties;
        this.webClient = webClientBuilder
                .baseUrl(properties.getApiUrl())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("x-api-key", properties.getApiKey())
                .defaultHeader("anthropic-version", API_VERSION)
                .build();
    }

    public String complete(String prompt) {
        RetryableAnthropicException lastRetryableFailure = null;

        for (int attempt = 1; attempt <= properties.getMaxAttempts(); attempt++) {
            try {
                return extractTextContent(requestCompletionJson(prompt));
            } catch (RetryableAnthropicException e) {
                lastRetryableFailure = e;
                retryIfAttemptsRemain(attempt, e);
            } catch (ApiCommunicationException e) {
                throw e;
            } catch (Exception e) {
                log.error("Error calling Claude API", e);
                throw new ApiCommunicationException("Failed to communicate with AI service", e);
            }
        }

        throw new ApiCommunicationException(TEMPORARILY_UNAVAILABLE_MESSAGE, lastRetryableFailure);
    }

    private String requestCompletionJson(String prompt) {
        return webClient.post()
                .uri("/messages")
                .bodyValue(requestBody(prompt))
                .exchangeToMono(response -> response.bodyToMono(String.class)
                        .defaultIfEmpty("")
                        .map(body -> handleResponse(response.statusCode().value(), body)))
                .block();
    }

    private String handleResponse(int statusCode, String responseBody) {
        if (isSuccessStatus(statusCode)) {
            return responseBody;
        }

        if (isRetryableStatus(statusCode)) {
            throw new RetryableAnthropicException(statusCode);
        }

        log.warn("Claude API request failed with status {}", statusCode);
        throw new ApiCommunicationException("AI service request failed. Please try again later.");
    }

    private String extractTextContent(String responseJson) {
        try {
            JsonNode contentArray = objectMapper.readTree(responseJson).get("content");
            if (contentArray != null && contentArray.isArray() && contentArray.size() > 0) {
                JsonNode textNode = contentArray.get(0).get("text");
                if (textNode != null && textNode.isTextual()) {
                    return stripMarkdownCodeFences(textNode.asText());
                }
            }

            throw new ApiCommunicationException("Invalid response format from Claude API");
        } catch (ApiCommunicationException e) {
            throw e;
        } catch (Exception e) {
            throw new ApiCommunicationException("Invalid response format from Claude API", e);
        }
    }

    private boolean isSuccessStatus(int statusCode) {
        return statusCode >= 200 && statusCode < 300;
    }

    private boolean isRetryableStatus(int statusCode) {
        return statusCode == HTTP_TOO_MANY_REQUESTS
                || statusCode == 500
                || statusCode == HTTP_BAD_GATEWAY
                || statusCode == HTTP_SERVICE_UNAVAILABLE
                || statusCode == HTTP_GATEWAY_TIMEOUT
                || statusCode == HTTP_ANTHROPIC_OVERLOADED;
    }

    private void retryIfAttemptsRemain(int attempt, RetryableAnthropicException exception) {
        if (attempt >= properties.getMaxAttempts()) {
            return;
        }

        log.warn("Claude API returned transient status {}. Retrying attempt {}/{}",
                exception.statusCode(), attempt + 1, properties.getMaxAttempts());
        waitBeforeRetry();
    }

    private void waitBeforeRetry() {
        try {
            Thread.sleep(properties.getRetryDelayMillis());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ApiCommunicationException("Interrupted while retrying AI service request", e);
        }
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

    private static final class RetryableAnthropicException extends RuntimeException {

        private final int statusCode;

        private RetryableAnthropicException(int statusCode) {
            super("Claude API returned retryable status " + statusCode);
            this.statusCode = statusCode;
        }

        private int statusCode() {
            return statusCode;
        }
    }
}
