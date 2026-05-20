package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto.Project;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static ai.applysmart.util.HtmlEscaper.escape;

@Component
public class ProjectRenderer implements SectionRenderer<Project> {

    @Override
    public String render(Project project) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"project-item\">\n");
        html.append("  <h3 class=\"project-name\">")
                .append(ResumeTemplateRenderSupport.textOrFallback(project.getName(), "Project"))
                .append("</h3>\n");
        appendDescription(html, project);
        appendTechnologies(html, project);
        appendLink(html, project);
        html.append("</div>\n");
        return html.toString();
    }

    private void appendDescription(StringBuilder html, Project project) {
        if (ResumeTemplateRenderSupport.hasText(project.getDescription())) {
            html.append("  <p class=\"project-description\">")
                    .append(escape(project.getDescription().trim()))
                    .append("</p>\n");
        }
    }

    private void appendTechnologies(StringBuilder html, Project project) {
        List<String> technologies = ResumeTemplateRenderSupport.filterNonBlank(project.getTechnologies());
        if (!technologies.isEmpty()) {
            String techList = technologies.stream()
                    .map(tech -> escape(tech))
                    .collect(Collectors.joining(", "));
            html.append("  <div class=\"technologies\"><strong>Technologies:</strong> ")
                    .append(techList)
                    .append("</div>\n");
        }
    }

    private void appendLink(StringBuilder html, Project project) {
        if (ResumeTemplateRenderSupport.hasText(project.getLink())) {
            html.append("  <div class=\"project-link\">")
                    .append(escape(project.getLink().trim()))
                    .append("</div>\n");
        }
    }

    @Override
    public String renderList(List<Project> projects) {
        if (projects == null || projects.isEmpty()) {
            return "";
        }

        return projects.stream()
                .filter(this::hasContent)
                .map(this::render)
                .collect(Collectors.joining("\n"));
    }

    @Override
    public boolean hasContent(List<Project> projects) {
        return projects != null && projects.stream().anyMatch(this::hasContent);
    }

    private boolean hasContent(Project project) {
        return project != null
                && (ResumeTemplateRenderSupport.hasText(project.getName())
                || ResumeTemplateRenderSupport.hasText(project.getDescription())
                || ResumeTemplateRenderSupport.hasText(project.getLink())
                || !ResumeTemplateRenderSupport.filterNonBlank(project.getTechnologies()).isEmpty());
    }
}
