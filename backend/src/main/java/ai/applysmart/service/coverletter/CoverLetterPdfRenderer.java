package ai.applysmart.service.coverletter;

import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import ai.applysmart.service.template.PdfGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.stream.Collectors;

import static ai.applysmart.util.HtmlEscaper.escape;

@Component
@RequiredArgsConstructor
public class CoverLetterPdfRenderer {

    private final PdfGenerator pdfGenerator;

    public byte[] renderPdf(CoverLetter coverLetter, User user) {
        return pdfGenerator.generate(buildHtml(coverLetter, user));
    }

    private String buildHtml(CoverLetter coverLetter, User user) {
        String body = Arrays.stream(coverLetter.getContent().split("\\r?\\n"))
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .map(line -> "<p>" + escape(line) + "</p>")
                .collect(Collectors.joining());

        String applicantName = escape(buildApplicantName(user));
        String company = escape(coverLetter.getCompany());
        String position = escape(coverLetter.getPosition());

        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      color: #18181b;
                      margin: 0;
                      padding: 48px;
                      line-height: 1.65;
                      font-size: 14px;
                    }
                    .header {
                      margin-bottom: 28px;
                    }
                    .eyebrow {
                      font-size: 11px;
                      letter-spacing: 0.18em;
                      text-transform: uppercase;
                      color: #71717a;
                      margin-bottom: 10px;
                    }
                    h1 {
                      margin: 0 0 6px;
                      font-size: 28px;
                    }
                    .subtle {
                      color: #52525b;
                      margin: 0;
                    }
                    .content p {
                      margin: 0 0 14px;
                    }
                  </style>
                </head>
                <body>
                  <div class="header">
                    <div class="eyebrow">Cover Letter</div>
                    <h1>%s</h1>
                    <p class="subtle">%s • %s</p>
                  </div>
                  <div class="content">%s</div>
                </body>
                </html>
                """.formatted(applicantName, position, company, body);
    }

    private String buildApplicantName(User user) {
        String fullName = "%s %s".formatted(
                user.getFirstName() != null ? user.getFirstName().trim() : "",
                user.getLastName() != null ? user.getLastName().trim() : ""
        ).trim();

        return fullName.isBlank() ? "ApplySmart User" : fullName;
    }
}
