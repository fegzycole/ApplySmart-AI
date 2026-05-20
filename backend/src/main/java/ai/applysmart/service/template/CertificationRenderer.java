package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto.Certification;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static ai.applysmart.util.HtmlEscaper.escape;

@Component
public class CertificationRenderer implements SectionRenderer<Certification> {

    @Override
    public String render(Certification cert) {
        boolean hasIssuer = ResumeTemplateRenderSupport.hasText(cert.getIssuer());
        boolean hasDate = ResumeTemplateRenderSupport.hasText(cert.getDate());

        StringBuilder html = new StringBuilder();
        html.append("<div class=\"certification-item\">\n");
        html.append("  <strong>")
                .append(ResumeTemplateRenderSupport.textOrFallback(cert.getName(), "Certification"))
                .append("</strong>");
        if (hasIssuer) {
            html.append(" - ").append(escape(cert.getIssuer().trim()));
        }
        if (hasDate) {
            html.append(" (").append(escape(cert.getDate().trim())).append(")");
        }
        html.append("\n</div>\n");
        return html.toString();
    }

    @Override
    public String renderList(List<Certification> certifications) {
        if (certifications == null || certifications.isEmpty()) {
            return "";
        }

        return certifications.stream()
                .filter(this::hasContent)
                .map(this::render)
                .collect(Collectors.joining("\n"));
    }

    @Override
    public boolean hasContent(List<Certification> certifications) {
        return certifications != null && certifications.stream().anyMatch(this::hasContent);
    }

    private boolean hasContent(Certification certification) {
        return certification != null
                && (ResumeTemplateRenderSupport.hasText(certification.getName())
                || ResumeTemplateRenderSupport.hasText(certification.getIssuer())
                || ResumeTemplateRenderSupport.hasText(certification.getDate()));
    }
}
