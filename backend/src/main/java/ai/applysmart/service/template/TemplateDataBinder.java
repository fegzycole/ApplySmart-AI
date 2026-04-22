package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static ai.applysmart.util.HtmlEscaper.orEmpty;

@Component
@RequiredArgsConstructor
public class TemplateDataBinder {

    private final WorkExperienceRenderer workExperienceRenderer;
    private final EducationRenderer educationRenderer;
    private final CertificationRenderer certificationRenderer;
    private final ProjectRenderer projectRenderer;
    private final SkillsRenderer skillsRenderer;

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

        return template
                .replace("{{name}}", orEmpty(data.getPersonalInfo().getName()))
                .replace("{{email}}", orEmpty(data.getPersonalInfo().getEmail()))
                .replace("{{phone}}", orEmpty(data.getPersonalInfo().getPhone()))
                .replace("{{location}}", orEmpty(data.getPersonalInfo().getLocation()))
                .replace("{{linkedin}}", orEmpty(data.getPersonalInfo().getLinkedin()))
                .replace("{{github}}", orEmpty(data.getPersonalInfo().getGithub()))
                .replace("{{website}}", orEmpty(data.getPersonalInfo().getWebsite()));
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
