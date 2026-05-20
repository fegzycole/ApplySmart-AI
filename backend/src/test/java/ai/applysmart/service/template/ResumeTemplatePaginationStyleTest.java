package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ResumeTemplate;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ResumeTemplatePaginationStyleTest {

    private final TemplateLoader templateLoader = new TemplateLoader();

    @Test
    void templatesKeepSectionTitlesWithFirstContentBlock() {
        for (ResumeTemplate template : ResumeTemplate.values()) {
            String html = templateLoader.load(template);

            assertTrue(html.contains("page-break-after: avoid;"), template + " should avoid title orphans");
            assertTrue(html.contains("page-break-before: avoid;"), template + " should keep first section block with title");
            assertTrue(html.contains(".section-title + .education-item"), template + " should protect education headings");
            assertTrue(html.contains(".section-title + .experience-item"), template + " should protect experience headings");
        }
    }
}
