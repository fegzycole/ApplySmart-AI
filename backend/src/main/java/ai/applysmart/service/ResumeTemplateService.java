package ai.applysmart.service;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeTemplate;

/**
 * Service for rendering resume templates
 */
public interface ResumeTemplateService {

    /**
     * Render resume using specified template
     *
     * @param resumeData Structured resume data
     * @param template Template to use
     * @return HTML content ready for PDF conversion
     */
    String renderTemplate(ParsedResumeDto resumeData, ResumeTemplate template);

    /**
     * Generate PDF from resume data and template
     *
     * @param resumeData Structured resume data
     * @param template Template to use
     * @return PDF bytes
     */
    byte[] generatePdf(ParsedResumeDto resumeData, ResumeTemplate template);
}
