package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto.Project;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

import static ai.applysmart.util.HtmlEscaper.escape;
import static ai.applysmart.util.HtmlEscaper.orEmpty;

@Component
public class ProjectRenderer implements SectionRenderer<Project> {

    @Override
    public String render(Project project) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"project-item\">\n");
        html.append("  <h3 class=\"project-name\">").append(orEmpty(project.getName())).append("</h3>\n");
        appendDescription(html, project);
        appendTechnologies(html, project);
        appendLink(html, project);
        html.append("</div>\n");
        return html.toString();
    }

    private void appendDescription(StringBuilder html, Project project) {
        if (project.getDescription() != null && !project.getDescription().isEmpty()) {
            html.append("  <p class=\"project-description\">")
                    .append(escape(project.getDescription()))
                    .append("</p>\n");
        }
    }

    private void appendTechnologies(StringBuilder html, Project project) {
        if (project.getTechnologies() != null && !project.getTechnologies().isEmpty()) {
            String techList = project.getTechnologies().stream()
                    .map(HtmlEscaper::escape)
                    .collect(Collectors.joining(", "));
            html.append("  <div class=\"technologies\"><strong>Technologies:</strong> ")
                    .append(techList)
                    .append("</div>\n");
        }
    }

    private void appendLink(StringBuilder html, Project project) {
        if (project.getLink() != null && !project.getLink().isEmpty()) {
            html.append("  <div class=\"project-link\">")
                    .append(escape(project.getLink()))
                    .append("</div>\n");
        }
    }
}
