package ai.applysmart.service.ai;

import ai.applysmart.config.AnthropicProperties;
import ai.applysmart.exception.ApiCommunicationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AnthropicClientTest {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private HttpServer server;

    @AfterEach
    void tearDown() {
        if (server != null) {
            server.stop(0);
        }
    }

    @Test
    void completeStripsJsonCodeFencesFromSuccessfulResponse() throws Exception {
        startServer(exchange -> writeJsonResponse(
                exchange,
                200,
                anthropicResponse("```json\n{\"ok\":true}\n```")
        ));

        String result = client().complete("parse this resume");

        assertEquals("{\"ok\":true}", result);
    }

    @Test
    void completeRetriesAnthropicOverloadResponses() throws Exception {
        AtomicInteger attempts = new AtomicInteger();
        startServer(exchange -> {
            if (attempts.incrementAndGet() < 3) {
                writeJsonResponse(exchange, 529, "{\"error\":{\"type\":\"overloaded_error\"}}");
                return;
            }

            writeJsonResponse(exchange, 200, anthropicResponse("done"));
        });

        String result = client().complete("parse this resume");

        assertEquals("done", result);
        assertEquals(3, attempts.get());
    }

    @Test
    void completeFailsWithTemporaryUnavailableMessageAfterRetryExhaustion() throws Exception {
        AtomicInteger attempts = new AtomicInteger();
        startServer(exchange -> {
            attempts.incrementAndGet();
            writeJsonResponse(exchange, 529, "{\"error\":{\"type\":\"overloaded_error\"}}");
        });

        ApiCommunicationException exception = assertThrows(
                ApiCommunicationException.class,
                () -> client().complete("parse this resume")
        );

        assertEquals("AI service is temporarily unavailable. Please try again shortly.", exception.getMessage());
        assertEquals(3, attempts.get());
    }

    private void startServer(HttpHandler handler) throws IOException {
        server = HttpServer.create(new InetSocketAddress(0), 0);
        server.createContext("/v1/messages", handler);
        server.start();
    }

    private AnthropicClient client() {
        AnthropicProperties properties = new AnthropicProperties();
        properties.setApiKey("test-api-key");
        properties.setApiUrl("http://localhost:" + server.getAddress().getPort() + "/v1");
        properties.setMaxAttempts(3);
        properties.setRetryDelayMillis(1);

        return new AnthropicClient(WebClient.builder(), objectMapper, properties);
    }

    private String anthropicResponse(String text) throws IOException {
        return objectMapper.writeValueAsString(Map.of(
                "content", List.of(Map.of("type", "text", "text", text))
        ));
    }

    private void writeJsonResponse(HttpExchange exchange, int statusCode, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, bytes.length);

        try (OutputStream output = exchange.getResponseBody()) {
            output.write(bytes);
        }
    }
}
