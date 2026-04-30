package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static ai.applysmart.util.HtmlEscaper.escape;
import static ai.applysmart.util.HtmlEscaper.orEmpty;

@Component
@RequiredArgsConstructor
public class TemplateDataBinder {

    private final WorkExperienceRenderer workExperienceRenderer;
    private final EducationRenderer educationRenderer;
    private final CertificationRenderer certificationRenderer;
    private final ProjectRenderer projectRenderer;
    private final SkillsRenderer skillsRenderer;

    // Lucide-compatible SVG icon paths for each contact field.
    // stroke="currentColor" inherits the surrounding text color set in each template's CSS.
    private static final String SVG_ATTRS =
            "xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" " +
            "fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" " +
            "stroke-linejoin=\"round\" style=\"vertical-align:middle;display:inline-block;margin-right:3px\"";

    private static final String ICON_EMAIL =
            "<svg " + SVG_ATTRS + "><rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/>" +
            "<path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/></svg>";

    private static final String ICON_PHONE =
            "<svg " + SVG_ATTRS + "><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" +
            "C9.36 17.26 7.23 15.13 5.15 12.56A19.79 19.79 0 0 1 2.08 3.93 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72" +
            " 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11" +
            "-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"/></svg>";

    private static final String ICON_LOCATION =
            "<svg " + SVG_ATTRS + "><path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z\"/>" +
            "<circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>";

    private static final String ICON_LINKEDIN =
            "<svg " + SVG_ATTRS + "><path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4" +
            "v-7a6 6 0 0 1 6-6z\"/><rect width=\"4\" height=\"12\" x=\"2\" y=\"9\"/>" +
            "<circle cx=\"4\" cy=\"4\" r=\"2\"/></svg>";

    private static final String ICON_GITHUB =
            "<svg " + SVG_ATTRS + "><path d=\"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1" +
            "-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5" +
            "A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4\"/>" +
            "<path d=\"M9 18c-4.51 2-5-2-7-2\"/></svg>";

    private static final String ICON_WEBSITE =
            "<svg " + SVG_ATTRS + "><circle cx=\"12\" cy=\"12\" r=\"10\"/>" +
            "<path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/>" +
            "<path d=\"M2 12h20\"/></svg>";

    public String bind(String template, ParsedResumeDto data) {
        String result = template;
        result = bindPersonalInfo(result, data);
        result = bindSummary(result, data);
        result = bindWorkExperience(result, data);
        result = bindEducation(result, data);
        result = bindSkills(result, data);
        result = bindCertifications(result, data);
        result = bindProjects(result, data, template);
        return result;
    }

    private String bindPersonalInfo(String template, ParsedResumeDto data) {
        if (data.getPersonalInfo() == null) {
            return template;
        }

        ParsedResumeDto.PersonalInfo info = data.getPersonalInfo();
        return template
                .replace("{{name}}", orEmpty(info.getName()))
                .replace("{{contact_info}}", buildContactInfoHtml(info));
    }

    private String buildContactInfoHtml(ParsedResumeDto.PersonalInfo info) {
        List<String> items = new ArrayList<>();

        if (info.getEmail() != null && !info.getEmail().isBlank()) {
            items.add(ICON_EMAIL + escape(info.getEmail()));
        }
        if (info.getPhone() != null && !info.getPhone().isBlank()) {
            items.add(ICON_PHONE + escape(info.getPhone()));
        }
        if (info.getLocation() != null && !info.getLocation().isBlank()) {
            items.add(ICON_LOCATION + escape(info.getLocation()));
        }
        if (info.getLinkedin() != null && !info.getLinkedin().isBlank()) {
            items.add(ICON_LINKEDIN + escape(info.getLinkedin()));
        }
        if (info.getGithub() != null && !info.getGithub().isBlank()) {
            items.add(ICON_GITHUB + escape(info.getGithub()));
        }
        if (info.getWebsite() != null && !info.getWebsite().isBlank()) {
            items.add(ICON_WEBSITE + escape(info.getWebsite()));
        }

        StringBuilder sb = new StringBuilder();
        for (String item : items) {
            sb.append("<span class=\"contact-item\">").append(item).append("</span>\n");
        }
        return sb.toString();
    }

    private String bindSummary(String template, ParsedResumeDto data) {
        return template.replace("{{summary}}", orEmpty(data.getSummary()));
    }

    private String bindWorkExperience(String template, ParsedResumeDto data) {
        String workHtml = workExperienceRenderer.renderList(data.getWorkExperience());
        boolean hasContent = workExperienceRenderer.hasContent(data.getWorkExperience());

        return template
                .replace("{{work_experience}}", workHtml)
                .replace("{{has_work_experience}}", String.valueOf(hasContent));
    }

    private String bindEducation(String template, ParsedResumeDto data) {
        String eduHtml = educationRenderer.renderList(data.getEducation());
        boolean hasContent = educationRenderer.hasContent(data.getEducation());

        return template
                .replace("{{education}}", eduHtml)
                .replace("{{has_education}}", String.valueOf(hasContent));
    }

    private String bindSkills(String template, ParsedResumeDto data) {
        String skillsHtml = skillsRenderer.renderList(data.getSkills());
        boolean hasContent = skillsRenderer.hasContent(data.getSkills());

        return template
                .replace("{{skills}}", skillsHtml)
                .replace("{{has_skills}}", String.valueOf(hasContent));
    }

    private String bindCertifications(String template, ParsedResumeDto data) {
        if (!certificationRenderer.hasContent(data.getCertifications())) {
            return template.replace("{{certifications_section}}", "");
        }

        String certsHtml = certificationRenderer.renderList(data.getCertifications());
        String certsSection = """
                <!-- Certifications -->
                <div class="section">
                    <h2 class="section-title">Certifications</h2>
                    %s
                </div>
                """.formatted(certsHtml);

        return template.replace("{{certifications_section}}", certsSection);
    }

    private String bindProjects(String template, ParsedResumeDto data, String originalTemplate) {
        if (!projectRenderer.hasContent(data.getProjects())) {
            return template.replace("{{projects_section}}", "");
        }

        String projectsHtml = projectRenderer.renderList(data.getProjects());
        String sectionTitle = determineSectionTitle(originalTemplate);
        String projectsSection = """
                <!-- Projects -->
                <div class="section">
                    <h2 class="section-title">%s</h2>
                    %s
                </div>
                """.formatted(sectionTitle, projectsHtml);

        return template.replace("{{projects_section}}", projectsSection);
    }

    private String determineSectionTitle(String template) {
        return template.contains("Professional") ? "Notable Projects" : "Projects";
    }
}
