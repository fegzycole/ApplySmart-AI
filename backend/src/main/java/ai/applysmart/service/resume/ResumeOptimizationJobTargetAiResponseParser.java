package ai.applysmart.service.resume;

import ai.applysmart.util.TextUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Optional;

class ResumeOptimizationJobTargetAiResponseParser {

    private final ObjectMapper objectMapper;

    ResumeOptimizationJobTargetAiResponseParser(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    Optional<PartialJobTarget> parsePartialTarget(String response) throws JsonProcessingException {
        JsonNode node = objectMapper.readTree(response);
        String company = textField(node, "company").orElse(null);
        String position = textField(node, "position").orElse(null);

        if (company == null && position == null) {
            return Optional.empty();
        }

        return Optional.of(new PartialJobTarget(company, position));
    }

    private Optional<String> textField(JsonNode node, String fieldName) {
        if (!node.has(fieldName) || node.get(fieldName).isNull()) {
            return Optional.empty();
        }

        return Optional.ofNullable(TextUtils.trimToNull(node.get(fieldName).asText()));
    }

    record PartialJobTarget(String company, String position) {
        ResumeOptimizationJobTarget toJobTarget() {
            return new ResumeOptimizationJobTarget(company, position);
        }
    }
}
