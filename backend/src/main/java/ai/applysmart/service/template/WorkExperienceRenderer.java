package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto.WorkExperience;
import org.springframework.stereotype.Component;

import static ai.applysmart.util.HtmlEscaper.escape;
import static ai.applysmart.util.HtmlEscaper.orEmpty;

@Component
public class WorkExperienceRenderer implements SectionRenderer<WorkExperience> {

    @Override
    public String render(WorkExperience work) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"experience-item\">\n");
        appendHeader(html, work);
        appendResponsibilities(html, work);
        html.append("</div>\n");
        return html.toString();
    }

    private void appendHeader(StringBuilder html, WorkExperience work) {
        html.append("  <div class=\"experience-header\">\n");
        html.append("    <div>\n");
        html.append("      <h3 class=\"position\">").append(orEmpty(work.getPosition())).append("</h3>\n");
        html.append("      <div class=\"company\">").append(orEmpty(work.getCompany())).append("</div>\n");
        html.append("    </div>\n");
        html.append("    <div class=\"experience-meta\">\n");
        html.append("      <div class=\"date\">")
                .append(orEmpty(work.getStartDate()))
                .append(" - ")
                .append(orEmpty(work.getEndDate()))
                .append("</div>\n");
        if (work.getLocation() != null && !work.getLocation().isEmpty()) {
            html.append("      <div class=\"location\">").append(escape(work.getLocation())).append("</div>\n");
        }
        html.append("    </div>\n");
        html.append("  </div>\n");
    }

    private void appendResponsibilities(StringBuilder html, WorkExperience work) {
        if (work.getResponsibilities() != null && !work.getResponsibilities().isEmpty()) {
            html.append("  <ul class=\"responsibilities\">\n");
            for (String responsibility : work.getResponsibilities()) {
                html.append("    <li>").append(escape(responsibility)).append("</li>\n");
            }
            html.append("  </ul>\n");
        }
    }
}
