package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto.Education;
import org.springframework.stereotype.Component;

import static ai.applysmart.util.HtmlEscaper.escape;
import static ai.applysmart.util.HtmlEscaper.orEmpty;

@Component
public class EducationRenderer implements SectionRenderer<Education> {

    @Override
    public String render(Education edu) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"education-item\">\n");
        appendHeader(html, edu);
        appendGpa(html, edu);
        html.append("</div>\n");
        return html.toString();
    }

    private void appendHeader(StringBuilder html, Education edu) {
        html.append("  <div class=\"education-header\">\n");
        html.append("    <div>\n");
        html.append("      <h3 class=\"degree\">").append(orEmpty(edu.getDegree()));
        if (edu.getField() != null && !edu.getField().isEmpty()) {
            html.append(" in ").append(escape(edu.getField()));
        }
        html.append("</h3>\n");
        html.append("      <div class=\"institution\">").append(orEmpty(edu.getInstitution())).append("</div>\n");
        html.append("    </div>\n");
        html.append("    <div class=\"education-meta\">\n");
        html.append("      <div class=\"date\">");
        if (edu.getStartDate() != null && !edu.getStartDate().isEmpty()) {
            html.append(escape(edu.getStartDate())).append(" - ");
        }
        html.append(orEmpty(edu.getGraduationDate())).append("</div>\n");
        if (edu.getLocation() != null && !edu.getLocation().isEmpty()) {
            html.append("      <div class=\"location\">").append(escape(edu.getLocation())).append("</div>\n");
        }
        html.append("    </div>\n");
        html.append("  </div>\n");
    }

    private void appendGpa(StringBuilder html, Education edu) {
        if (edu.getGpa() != null && !edu.getGpa().isEmpty()) {
            html.append("  <div class=\"gpa\">GPA: ").append(escape(edu.getGpa())).append("</div>\n");
        }
    }
}
