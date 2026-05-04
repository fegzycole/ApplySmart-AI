package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto.Education;
import org.springframework.stereotype.Component;

import static ai.applysmart.util.HtmlEscaper.escape;
import static ai.applysmart.util.HtmlEscaper.orEmpty;

@Component
public class EducationRenderer implements SectionRenderer<Education> {

    private static final String[] FIELD_FIRST_CREDENTIALS = {
            "certificate",
            "diploma",
            "program",
            "bootcamp",
            "nanodegree",
            "fellowship"
    };

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
        html.append("      <h3 class=\"degree\">").append(getEducationCredential(edu)).append("</h3>\n");
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

    private String getEducationCredential(Education edu) {
        String degree = edu.getDegree() != null ? edu.getDegree().trim() : "";
        String field = edu.getField() != null ? edu.getField().trim() : "";

        if (!degree.isEmpty() && !field.isEmpty()) {
            if (isFieldFirstCredential(degree)) {
                return escape(field) + " " + escape(degree);
            }

            return escape(degree) + " in " + escape(field);
        }

        if (!degree.isEmpty()) {
            return escape(degree);
        }

        if (!field.isEmpty()) {
            return escape(field);
        }

        return "";
    }

    private boolean isFieldFirstCredential(String degree) {
        String normalizedDegree = degree.toLowerCase();

        for (String credential : FIELD_FIRST_CREDENTIALS) {
            if (normalizedDegree.contains(credential)) {
                return true;
            }
        }

        return false;
    }
}
