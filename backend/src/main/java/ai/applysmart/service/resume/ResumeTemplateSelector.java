package ai.applysmart.service.resume;

import ai.applysmart.dto.resume.ResumeTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ResumeTemplateSelector {

    public ResumeTemplate select(String template) {
        try {
            return template != null ? ResumeTemplate.valueOf(template.toUpperCase()) : ResumeTemplate.MODERN;
        } catch (IllegalArgumentException e) {
            log.warn("Invalid template '{}', using MODERN as default", template);
            return ResumeTemplate.MODERN;
        }
    }

    public ResumeTemplate select(ResumeTemplate template) {
        return template != null ? template : ResumeTemplate.MODERN;
    }
}
