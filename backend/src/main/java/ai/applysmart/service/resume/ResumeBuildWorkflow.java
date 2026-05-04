package ai.applysmart.service.resume;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeTemplate;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.service.template.ResumeTemplateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResumeBuildWorkflow {

    private final ResumeTemplateService resumeTemplateService;
    private final ResumeTemplateSelector resumeTemplateSelector;
    private final ResumeFileFactory resumeFileFactory;

    public byte[] generatePdf(ParsedResumeDto resumeData, ResumeTemplate template) {
        ResumeTemplate selectedTemplate = resumeTemplateSelector.select(template);
        log.info("Generating builder PDF with template: {}", selectedTemplate.getDisplayName());
        return resumeTemplateService.generatePdf(resumeData, selectedTemplate);
    }

    public Resume createBuiltResume(ParsedResumeDto resumeData, ResumeTemplate template, String name, User user) {
        byte[] pdfBytes = generatePdf(resumeData, template);
        return resumeFileFactory.createBuiltResume(pdfBytes, name, user);
    }
}
