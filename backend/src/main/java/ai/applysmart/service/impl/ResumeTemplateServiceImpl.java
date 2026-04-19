package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeTemplate;
import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.service.ResumeTemplateService;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ResumeTemplateServiceImpl implements ResumeTemplateService {

    @Override
    public String renderTemplate(ParsedResumeDto resumeData, ResumeTemplate template) {
        log.info("Rendering resume template: {}", template.name());

        try {
            String templateHtml = loadTemplate(template);
            String renderedHtml = bindData(templateHtml, resumeData);
            log.debug("Successfully rendered template for: {}",
                    resumeData.getPersonalInfo() != null ? resumeData.getPersonalInfo().getName() : "Unknown");
            return renderedHtml;
        } catch (Exception e) {
            log.error("Failed to render template: {}", template.name(), e);
            throw new FileProcessingException("Failed to render resume template", e);
        }
    }

    @Override
    public byte[] generatePdf(ParsedResumeDto resumeData, ResumeTemplate template) {
        log.info("Generating PDF for template: {}", template.name());

        try {
            String html = renderTemplate(resumeData, template);

            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
                PdfRendererBuilder builder = new PdfRendererBuilder();
                builder.useFastMode();
                builder.withHtmlContent(html, null);
                builder.toStream(outputStream);
                builder.run();

                byte[] pdfBytes = outputStream.toByteArray();
                log.info("Successfully generated PDF ({} bytes)", pdfBytes.length);
                return pdfBytes;
            }
        } catch (Exception e) {
            log.error("Failed to generate PDF from template: {}", template.name(), e);
            throw new FileProcessingException("Failed to generate PDF from template", e);
        }
    }

    private String loadTemplate(ResumeTemplate template) throws Exception {
        String templatePath = "templates/resume/" + template.getTemplateFile();
        ClassPathResource resource = new ClassPathResource(templatePath);

        if (!resource.exists()) {
            throw new FileProcessingException("Template file not found: " + templatePath);
        }

        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    private String bindData(String template, ParsedResumeDto data) {
        String result = template;

        // Personal Info
        if (data.getPersonalInfo() != null) {
            result = result.replace("{{name}}", orEmpty(data.getPersonalInfo().getName()));
            result = result.replace("{{email}}", orEmpty(data.getPersonalInfo().getEmail()));
            result = result.replace("{{phone}}", orEmpty(data.getPersonalInfo().getPhone()));
            result = result.replace("{{location}}", orEmpty(data.getPersonalInfo().getLocation()));
            result = result.replace("{{linkedin}}", orEmpty(data.getPersonalInfo().getLinkedin()));
            result = result.replace("{{github}}", orEmpty(data.getPersonalInfo().getGithub()));
            result = result.replace("{{website}}", orEmpty(data.getPersonalInfo().getWebsite()));
        }

        // Summary
        result = result.replace("{{summary}}", orEmpty(data.getSummary()));

        // Work Experience
        if (data.getWorkExperience() != null && !data.getWorkExperience().isEmpty()) {
            String workHtml = data.getWorkExperience().stream()
                    .map(this::renderWorkExperience)
                    .collect(Collectors.joining("\n"));
            result = result.replace("{{work_experience}}", workHtml);
            result = result.replace("{{has_work_experience}}", "true");
        } else {
            result = result.replace("{{work_experience}}", "");
            result = result.replace("{{has_work_experience}}", "false");
        }

        // Education
        if (data.getEducation() != null && !data.getEducation().isEmpty()) {
            String eduHtml = data.getEducation().stream()
                    .map(this::renderEducation)
                    .collect(Collectors.joining("\n"));
            result = result.replace("{{education}}", eduHtml);
            result = result.replace("{{has_education}}", "true");
        } else {
            result = result.replace("{{education}}", "");
            result = result.replace("{{has_education}}", "false");
        }

        // Skills
        if (data.getSkills() != null && !data.getSkills().isEmpty()) {
            String skillsHtml = data.getSkills().stream()
                    .map(skill -> "<span class=\"skill\">" + escapeHtml(skill) + "</span>")
                    .collect(Collectors.joining(""));
            result = result.replace("{{skills}}", skillsHtml);
            result = result.replace("{{has_skills}}", "true");
        } else {
            result = result.replace("{{skills}}", "");
            result = result.replace("{{has_skills}}", "false");
        }

        // Certifications - render full section or hide completely
        if (data.getCertifications() != null && !data.getCertifications().isEmpty()) {
            String certsHtml = data.getCertifications().stream()
                    .map(this::renderCertification)
                    .collect(Collectors.joining("\n"));
            String certsSection = """
                    <!-- Certifications -->
                    <div class="section">
                        <h2 class="section-title">Certifications</h2>
                        %s
                    </div>
                    """.formatted(certsHtml);
            result = result.replace("{{certifications_section}}", certsSection);
        } else {
            result = result.replace("{{certifications_section}}", "");
        }

        // Projects - render full section or hide completely
        // Determine section title based on template (Professional uses "Notable Projects")
        String projectsSectionTitle = template.contains("Professional") ? "Notable Projects" : "Projects";
        if (data.getProjects() != null && !data.getProjects().isEmpty()) {
            String projectsHtml = data.getProjects().stream()
                    .map(this::renderProject)
                    .collect(Collectors.joining("\n"));
            String projectsSection = """
                    <!-- Projects -->
                    <div class="section">
                        <h2 class="section-title">%s</h2>
                        %s
                    </div>
                    """.formatted(projectsSectionTitle, projectsHtml);
            result = result.replace("{{projects_section}}", projectsSection);
        } else {
            result = result.replace("{{projects_section}}", "");
        }

        return result;
    }

    private String renderWorkExperience(ParsedResumeDto.WorkExperience work) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"experience-item\">\n");
        html.append("  <div class=\"experience-header\">\n");
        html.append("    <div>\n");
        html.append("      <h3 class=\"position\">").append(orEmpty(work.getPosition())).append("</h3>\n");
        html.append("      <div class=\"company\">").append(orEmpty(work.getCompany())).append("</div>\n");
        html.append("    </div>\n");
        html.append("    <div class=\"experience-meta\">\n");
        html.append("      <div class=\"date\">").append(orEmpty(work.getStartDate()))
                .append(" - ").append(orEmpty(work.getEndDate())).append("</div>\n");
        if (work.getLocation() != null && !work.getLocation().isEmpty()) {
            html.append("      <div class=\"location\">").append(escapeHtml(work.getLocation())).append("</div>\n");
        }
        html.append("    </div>\n");
        html.append("  </div>\n");

        if (work.getResponsibilities() != null && !work.getResponsibilities().isEmpty()) {
            html.append("  <ul class=\"responsibilities\">\n");
            for (String responsibility : work.getResponsibilities()) {
                html.append("    <li>").append(escapeHtml(responsibility)).append("</li>\n");
            }
            html.append("  </ul>\n");
        }
        html.append("</div>\n");
        return html.toString();
    }

    private String renderEducation(ParsedResumeDto.Education edu) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"education-item\">\n");
        html.append("  <div class=\"education-header\">\n");
        html.append("    <div>\n");
        html.append("      <h3 class=\"degree\">").append(orEmpty(edu.getDegree()));
        if (edu.getField() != null && !edu.getField().isEmpty()) {
            html.append(" in ").append(escapeHtml(edu.getField()));
        }
        html.append("</h3>\n");
        html.append("      <div class=\"institution\">").append(orEmpty(edu.getInstitution())).append("</div>\n");
        html.append("    </div>\n");
        html.append("    <div class=\"education-meta\">\n");
        // Show both start and end dates if available
        html.append("      <div class=\"date\">");
        if (edu.getStartDate() != null && !edu.getStartDate().isEmpty()) {
            html.append(escapeHtml(edu.getStartDate())).append(" - ");
        }
        html.append(orEmpty(edu.getGraduationDate())).append("</div>\n");
        if (edu.getLocation() != null && !edu.getLocation().isEmpty()) {
            html.append("      <div class=\"location\">").append(escapeHtml(edu.getLocation())).append("</div>\n");
        }
        html.append("    </div>\n");
        html.append("  </div>\n");
        if (edu.getGpa() != null && !edu.getGpa().isEmpty()) {
            html.append("  <div class=\"gpa\">GPA: ").append(escapeHtml(edu.getGpa())).append("</div>\n");
        }
        html.append("</div>\n");
        return html.toString();
    }

    private String renderCertification(ParsedResumeDto.Certification cert) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"certification-item\">\n");
        html.append("  <strong>").append(orEmpty(cert.getName())).append("</strong>");
        if (cert.getIssuer() != null && !cert.getIssuer().isEmpty()) {
            html.append(" - ").append(escapeHtml(cert.getIssuer()));
        }
        if (cert.getDate() != null && !cert.getDate().isEmpty()) {
            html.append(" (").append(escapeHtml(cert.getDate())).append(")");
        }
        html.append("\n</div>\n");
        return html.toString();
    }

    private String renderProject(ParsedResumeDto.Project project) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"project-item\">\n");
        html.append("  <h3 class=\"project-name\">").append(orEmpty(project.getName())).append("</h3>\n");
        if (project.getDescription() != null && !project.getDescription().isEmpty()) {
            html.append("  <p class=\"project-description\">").append(escapeHtml(project.getDescription())).append("</p>\n");
        }
        if (project.getTechnologies() != null && !project.getTechnologies().isEmpty()) {
            String techList = project.getTechnologies().stream()
                    .map(this::escapeHtml)
                    .collect(Collectors.joining(", "));
            html.append("  <div class=\"technologies\"><strong>Technologies:</strong> ").append(techList).append("</div>\n");
        }
        if (project.getLink() != null && !project.getLink().isEmpty()) {
            html.append("  <div class=\"project-link\">").append(escapeHtml(project.getLink())).append("</div>\n");
        }
        html.append("</div>\n");
        return html.toString();
    }

    private String orEmpty(String value) {
        return value != null ? escapeHtml(value) : "";
    }

    /**
     * Escape HTML special characters to prevent XML parsing errors
     */
    private String escapeHtml(String text) {
        if (text == null) {
            return "";
        }
        return text
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
