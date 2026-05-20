package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto.Education;
import ai.applysmart.dto.resume.ResumeTemplate;
import org.springframework.stereotype.Component;

import static ai.applysmart.util.HtmlEscaper.escape;

@Component
public class EducationRenderer implements SectionRenderer<Education> {

    @Override
    public String render(Education edu) {
        return render(edu, ResumeTemplate.MODERN);
    }

    public String render(Education edu, ResumeTemplate template) {
        return switch (template) {
            case CLASSIC -> renderClassic(edu);
            case PROFESSIONAL -> renderProfessional(edu);
            case MODERN, CREATIVE -> renderSingleColumn(edu);
        };
    }

    public String renderList(java.util.List<Education> items, ResumeTemplate template) {
        if (items == null || items.isEmpty()) {
            return "";
        }
        return items.stream()
                .map(item -> render(item, template))
                .reduce("", (a, b) -> a + "\n" + b);
    }

    private String renderSingleColumn(Education edu) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"education-item\">\n");
        appendSingleColumnHeader(html, edu);
        html.append("</div>\n");
        return html.toString();
    }

    private String renderProfessional(Education edu) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"education-item\">\n");
        html.append("  <div class=\"education-header\">\n");
        html.append("    <div class=\"education-primary\">\n");
        html.append("      <h3 class=\"degree\">").append(ResumeTemplateRenderSupport.getEducationTitle(edu)).append("</h3>\n");
        if (ResumeTemplateRenderSupport.hasText(edu.getLocation())) {
            html.append("      <div class=\"location\">").append(escape(edu.getLocation().trim())).append("</div>\n");
        }
        html.append("    </div>\n");
        html.append("    <div class=\"education-meta\">\n");
        html.append("      <div class=\"date\">").append(ResumeTemplateRenderSupport.formatEducationDate(edu)).append("</div>\n");
        html.append("    </div>\n");
        html.append("  </div>\n");
        html.append("</div>\n");
        return html.toString();
    }

    private String renderClassic(Education edu) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"education-item\">\n");
        html.append("  <div class=\"education-header\">\n");
        html.append("    <div class=\"education-primary\">\n");
        html.append("      <div class=\"institution\">")
                .append(ResumeTemplateRenderSupport.textOrFallback(edu.getInstitution(), "Institution"))
                .append("</div>\n");
        html.append("      <div class=\"degree\">").append(ResumeTemplateRenderSupport.getEducationCredential(edu)).append("</div>\n");
        html.append("    </div>\n");
        html.append("    <div class=\"education-meta\">\n");
        html.append("      <div class=\"date\">").append(ResumeTemplateRenderSupport.formatEducationDate(edu)).append("</div>\n");
        html.append("    </div>\n");
        html.append("  </div>\n");
        html.append("</div>\n");
        return html.toString();
    }

    private void appendSingleColumnHeader(StringBuilder html, Education edu) {
        html.append("  <div class=\"education-header\">\n");
        html.append("    <div class=\"education-primary\">\n");
        html.append("      <h3 class=\"degree\">").append(ResumeTemplateRenderSupport.getEducationCredential(edu)).append("</h3>\n");
        html.append("      <div class=\"institution\">")
                .append(ResumeTemplateRenderSupport.textOrFallback(edu.getInstitution(), "Institution"))
                .append("</div>\n");
        html.append("    </div>\n");
        html.append("    <div class=\"education-meta\">\n");
        html.append("      <div class=\"date\">").append(ResumeTemplateRenderSupport.formatEducationDate(edu)).append("</div>\n");
        if (ResumeTemplateRenderSupport.hasText(edu.getLocation())) {
            html.append("      <div class=\"location\">").append(escape(edu.getLocation().trim())).append("</div>\n");
        }
        if (ResumeTemplateRenderSupport.hasText(edu.getGpa())) {
            html.append("      <div class=\"gpa\">GPA: ").append(escape(edu.getGpa().trim())).append("</div>\n");
        }
        html.append("    </div>\n");
        html.append("  </div>\n");
    }
}
