package ai.applysmart.service.pdf;

import java.util.List;
import java.util.Map;

public record LineReplacementPlan(List<String> originalLines, Map<Integer, String> replacements) {
}
