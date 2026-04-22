package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto.Certification;
import org.springframework.stereotype.Component;

import static ai.applysmart.util.HtmlEscaper.escape;
import static ai.applysmart.util.HtmlEscaper.orEmpty;

@Component
public class CertificationRenderer implements SectionRenderer<Certification> {

    @Override
    public String render(Certification cert) {
        StringBuilder html = new StringBuilder();
        html.append("<div class=\"certification-item\">\n");
        html.append("  <strong>").append(orEmpty(cert.getName())).append("</strong>");
        if (cert.getIssuer() != null && !cert.getIssuer().isEmpty()) {
            html.append(" - ").append(escape(cert.getIssuer()));
        }
        if (cert.getDate() != null && !cert.getDate().isEmpty()) {
            html.append(" (").append(escape(cert.getDate())).append(")");
        }
        html.append("\n</div>\n");
        return html.toString();
    }
}
