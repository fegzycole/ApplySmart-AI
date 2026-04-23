package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeTemplate;

/**
 * Service for rendering resume templates
 */
public interface ResumeTemplateService {

    String renderTemplate(ParsedResumeDto resumeData, ResumeTemplate template);

    byte[] generatePdf(ParsedResumeDto resumeData, ResumeTemplate template);
}
