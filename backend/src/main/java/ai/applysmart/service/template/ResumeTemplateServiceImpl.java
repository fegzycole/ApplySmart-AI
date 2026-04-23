package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeTemplate;
import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.service.template.ResumeTemplateService;
import ai.applysmart.service.template.PdfGenerator;
import ai.applysmart.service.template.TemplateDataBinder;
import ai.applysmart.service.template.TemplateLoader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeTemplateServiceImpl implements ResumeTemplateService {

    private final TemplateLoader templateLoader;
    private final TemplateDataBinder dataBinder;
    private final PdfGenerator pdfGenerator;

    @Override
    public String renderTemplate(ParsedResumeDto resumeData, ResumeTemplate template) {
        log.info("Rendering resume template: {}", template.name());

        try {
            String templateHtml = templateLoader.load(template);
            String renderedHtml = dataBinder.bind(templateHtml, resumeData);

            log.debug("Successfully rendered template for: {}",
                    resumeData.getPersonalInfo() != null ? resumeData.getPersonalInfo().getName() : "Unknown");

            return renderedHtml;
        } catch (Exception e) {
            log.error("Failed to render template: {}", template.name(), e);
            throw new FileProcessingException("Failed to render resume template", e);
        }
    }

    @Override
    public byte[] generatePdf(ParsedResumeDto resumeData, ResumeTemplate template) {
        log.info("Generating PDF for template: {}", template.name());

        try {
            String html = renderTemplate(resumeData, template);
            byte[] pdfBytes = pdfGenerator.generate(html);

            log.info("Successfully generated PDF ({} bytes)", pdfBytes.length);
            return pdfBytes;
        } catch (Exception e) {
            log.error("Failed to generate PDF from template: {}", template.name(), e);
            throw new FileProcessingException("Failed to generate PDF from template", e);
        }
    }
}
