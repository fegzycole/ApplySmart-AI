package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ResumeTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static ai.applysmart.util.HtmlEscaper.escape;

@Component
public class SkillsRenderer implements SectionRenderer<String> {

    @Override
    public String render(String skill) {
        return "<span class=\"skill\">" + escape(skill) + "</span>";
    }

    public String renderList(List<String> skills, ResumeTemplate template) {
        return renderList(skills);
    }

    @Override
    public String renderList(List<String> skills) {
        if (skills == null || skills.isEmpty()) {
            return "";
        }
        return ResumeTemplateRenderSupport.filterNonBlank(skills).stream()
                .map(this::render)
                .collect(Collectors.joining(""));
    }
}
