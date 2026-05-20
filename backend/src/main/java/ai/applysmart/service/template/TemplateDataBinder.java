package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static ai.applysmart.util.HtmlEscaper.orEmpty;

@Component
@RequiredArgsConstructor
public class TemplateDataBinder {

    private final WorkExperienceRenderer workExperienceRenderer;
    private final EducationRenderer educationRenderer;
    private final CertificationRenderer certificationRenderer;
    private final ProjectRenderer projectRenderer;
    private final SkillsRenderer skillsRenderer;

    public String bind(String template, ParsedResumeDto data, ResumeTemplate resumeTemplate) {
        String result = template;
        result = bindPersonalInfo(result, data);
        result = bindSummarySection(result, data, resumeTemplate);
        result = bindWorkExperienceSection(result, data, resumeTemplate);
        result = bindEducationSection(result, data, resumeTemplate);
        result = bindSkillsSection(result, data, resumeTemplate);
        result = bindCertificationsSection(result, data);
        result = bindProjectsSection(result, data);
        result = stripOptionalSections(result);
        return result;
    }

    private String bindPersonalInfo(String template, ParsedResumeDto data) {
        ParsedResumeDto.PersonalInfo info = data.getPersonalInfo();

        if (info == null) {
            return template
                    .replace("{{name}}", "Your Name")
                    .replace("{{contact_entries}}", "");
        }

        return template
                .replace("{{name}}", ResumeTemplateRenderSupport.textOrFallback(info.getName(), "Your Name"))
                .replace("{{contact_entries}}", buildContactEntries(info));
    }

    private String bindSummarySection(String template, ParsedResumeDto data, ResumeTemplate resumeTemplate) {
        if (!ResumeTemplateRenderSupport.hasText(data.getSummary())) {
            return template.replace("{{summary_section}}", "");
        }

        return bindSection(
                template,
                "{{summary_section}}",
                getSummaryTitle(resumeTemplate),
                "<p class=\"summary\">%s</p>".formatted(orEmpty(data.getSummary()))
        );
    }

    private String bindWorkExperienceSection(String template, ParsedResumeDto data, ResumeTemplate resumeTemplate) {
        String workHtml = workExperienceRenderer.renderList(data.getWorkExperience(), resumeTemplate);
        return bindSection(
                template,
                "{{work_experience_section}}",
                getWorkExperienceTitle(resumeTemplate),
                workHtml
        );
    }

    private String bindEducationSection(String template, ParsedResumeDto data, ResumeTemplate resumeTemplate) {
        String educationHtml = educationRenderer.renderList(data.getEducation(), resumeTemplate);
        return bindSection(template, "{{education_section}}", "Education", educationHtml);
    }

    private String bindSkillsSection(String template, ParsedResumeDto data, ResumeTemplate resumeTemplate) {
        String skillsHtml = skillsRenderer.renderList(data.getSkills(), resumeTemplate);
        if (skillsHtml.isBlank()) {
            return template.replace("{{skills_section}}", "");
        }

        return bindSection(
                template,
                "{{skills_section}}",
                getSkillsTitle(resumeTemplate),
                "<div class=\"skills-container\">%s</div>".formatted(skillsHtml)
        );
    }

    private String bindCertificationsSection(String template, ParsedResumeDto data) {
        String certificationsHtml = certificationRenderer.renderList(data.getCertifications());
        return bindSection(template, "{{certifications_section}}", "Certifications", certificationsHtml);
    }

    private String bindProjectsSection(String template, ParsedResumeDto data) {
        String projectsHtml = projectRenderer.renderList(data.getProjects());
        return bindSection(template, "{{projects_section}}", "Projects", projectsHtml);
    }

    private String stripOptionalSections(String template) {
        return template
                .replace("{{certifications_section}}", "")
                .replace("{{projects_section}}", "");
    }

    private String bindSection(String template, String placeholder, String title, String bodyHtml) {
        if (bodyHtml.isBlank()) {
            return template.replace(placeholder, "");
        }

        return template.replace(placeholder, renderSection(title, bodyHtml));
    }

    private String renderSection(String title, String bodyHtml) {
        return """
                <section class="section">
                    <h2 class="section-title">%s</h2>
                    %s
                </section>
                """.formatted(title, bodyHtml);
    }

    private String buildContactEntries(ParsedResumeDto.PersonalInfo info) {
        List<String> entries = new ArrayList<>();

        appendContactEntry(entries, info.getEmail(), "email");
        appendContactEntry(entries, info.getPhone(), "phone");
        appendContactEntry(entries, info.getLocation(), "location");
        appendContactEntry(entries, info.getLinkedin(), "linkedin");
        appendContactEntry(entries, info.getGithub(), "github");
        appendContactEntry(entries, info.getWebsite(), "website");

        return String.join("\n", entries);
    }

    private void appendContactEntry(List<String> entries, String value, String type) {
        if (ResumeTemplateRenderSupport.hasText(value)) {
            entries.add("<span class=\"contact-item contact-" + type + "\">" + orEmpty(value.trim()) + "</span>");
        }
    }

    private String getSummaryTitle(ResumeTemplate template) {
        return "Professional Summary";
    }

    private String getWorkExperienceTitle(ResumeTemplate template) {
        return switch (template) {
            case CLASSIC -> "Professional Experience";
            case PROFESSIONAL -> "Experience History";
            case MODERN, CREATIVE -> "Work Experience";
        };
    }

    private String getSkillsTitle(ResumeTemplate template) {
        return switch (template) {
            case CLASSIC, PROFESSIONAL -> "Core Competencies";
            case MODERN, CREATIVE -> "Skills";
        };
    }
}
