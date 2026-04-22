package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ResumeTemplate;
import ai.applysmart.exception.FileProcessingException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.nio.charset.StandardCharsets;

@Component
public class TemplateLoader {

    private static final String TEMPLATE_BASE_PATH = "templates/resume/";

    public String load(ResumeTemplate template) {
        String templatePath = TEMPLATE_BASE_PATH + template.getTemplateFile();
        ClassPathResource resource = new ClassPathResource(templatePath);

        if (!resource.exists()) {
            throw new FileProcessingException("Template file not found: " + templatePath);
        }

        try {
            return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new FileProcessingException("Failed to load template: " + templatePath, e);
        }
    }
}
