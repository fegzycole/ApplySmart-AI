package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ResumeTemplate;
import ai.applysmart.dto.resume.ParsedResumeDto.WorkExperience;
import org.springframework.stereotype.Component;

import static ai.applysmart.util.HtmlEscaper.escape;

@Component
public class WorkExperienceRenderer implements SectionRenderer<WorkExperience> {

    @Override
    public String render(WorkExperience work) {
        return render(work, ResumeTemplate.MODERN);
    }

    public String render(WorkExperience work, ResumeTemplate template) {
        return switch (template) {
            case CLASSIC -> renderClassic(work);
            case PROFESSIONAL, MODERN, CREATIVE -> renderSingleColumn(work);
        };
    }

    public String renderList(java.util.List<WorkExperience> items, ResumeTemplate template) {
        if (items == null || items.isEmpty()) {
            return "";
        }
        return items.stream()
                .map(item -> render(item, template))
                .reduce("", (a, b) -> a + "\n" + b);
    }

    private String renderSingleColumn(WorkExperience work) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"experience-item\">\n");
        appendSingleColumnHeader(html, work);
        appendResponsibilities(html, work);
        html.append("</div>\n");
        return html.toString();
    }

    private String renderClassic(WorkExperience work) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"experience-item\">\n");
        html.append("  <div class=\"experience-company-row\">\n");
        html.append("    <div class=\"company\">")
                .append(ResumeTemplateRenderSupport.textOrFallback(work.getCompany(), "Company"))
                .append("</div>\n");
        html.append("    <div class=\"date\">")
                .append(ResumeTemplateRenderSupport.formatDateRange(work.getStartDate(), work.getEndDate(), ""))
                .append("</div>\n");
        html.append("  </div>\n");
        html.append("  <div class=\"experience-role-row\">\n");
        html.append("    <div class=\"position\">")
                .append(ResumeTemplateRenderSupport.textOrFallback(work.getPosition(), "Position"))
                .append("</div>\n");
        if (ResumeTemplateRenderSupport.hasText(work.getLocation())) {
            html.append("    <div class=\"location\">").append(escape(work.getLocation().trim())).append("</div>\n");
        }
        html.append("  </div>\n");
        appendResponsibilities(html, work);
        html.append("</div>\n");
        return html.toString();
    }

    private void appendSingleColumnHeader(StringBuilder html, WorkExperience work) {
        html.append("  <div class=\"experience-header\">\n");
        html.append("    <div class=\"experience-primary\">\n");
        html.append("      <h3 class=\"position\">")
                .append(ResumeTemplateRenderSupport.textOrFallback(work.getPosition(), "Position"))
                .append("</h3>\n");
        html.append("      <div class=\"company\">")
                .append(ResumeTemplateRenderSupport.textOrFallback(work.getCompany(), "Company"))
                .append("</div>\n");
        html.append("    </div>\n");
        html.append("    <div class=\"experience-meta\">\n");
        html.append("      <div class=\"date\">")
                .append(ResumeTemplateRenderSupport.formatDateRange(work.getStartDate(), work.getEndDate(), "Date"))
                .append("</div>\n");
        if (ResumeTemplateRenderSupport.hasText(work.getLocation())) {
            html.append("      <div class=\"location\">").append(escape(work.getLocation().trim())).append("</div>\n");
        }
        html.append("    </div>\n");
        html.append("  </div>\n");
    }

    private void appendResponsibilities(StringBuilder html, WorkExperience work) {
        java.util.List<String> responsibilities = ResumeTemplateRenderSupport.filterNonBlank(work.getResponsibilities());
        if (!responsibilities.isEmpty()) {
            html.append("  <ul class=\"responsibilities\">\n");
            for (String responsibility : responsibilities) {
                html.append("    <li>").append(escape(responsibility)).append("</li>\n");
            }
            html.append("  </ul>\n");
        }
    }
}
