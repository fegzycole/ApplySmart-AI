package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.ResumeLayoutInfo;
import ai.applysmart.service.HtmlPdfGenerator;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Slf4j
@Service
public class HtmlPdfGeneratorImpl implements HtmlPdfGenerator {

    @Override
    public byte[] generateStyledPdf(String markdownContent, ResumeLayoutInfo layoutInfo) {
        try {
            String html = markdownToHtml(markdownContent, layoutInfo);

            return htmlToPdf(html);
        } catch (Exception e) {
            log.error("Error generating styled PDF", e);
            throw new RuntimeException("Failed to generate styled PDF", e);
        }
    }

    private String markdownToHtml(String markdown, ResumeLayoutInfo layout) {
        StringBuilder html = new StringBuilder();

        html.append("<!DOCTYPE html>");
        html.append("<html>");
        html.append("<head>");
        html.append("<meta charset=\"UTF-8\"/>");
        html.append("<style>");
        html.append(generateCSS(layout));
        html.append("</style>");
        html.append("</head>");
        html.append("<body>");

        String[] lines = markdown.split("\\n");
        boolean inList = false;

        for (String line : lines) {
            line = line.trim();

            if (line.isEmpty()) {
                if (inList) {
                    html.append("</ul>");
                    inList = false;
                }
                html.append("<br/>");
                continue;
            }

            if (line.startsWith("# ")) {
                if (inList) {
                    html.append("</ul>");
                    inList = false;
                }
                html.append("<h1>").append(escapeHtml(line.substring(2))).append("</h1>");
            }
            else if (line.startsWith("## ")) {
                if (inList) {
                    html.append("</ul>");
                    inList = false;
                }
                html.append("<h2>").append(escapeHtml(line.substring(3))).append("</h2>");
            }
            else if (line.startsWith("- ") || line.startsWith("* ") || line.startsWith("• ")) {
                if (!inList) {
                    html.append("<ul>");
                    inList = true;
                }
                String content = line.substring(2);
                html.append("<li>").append(processInlineFormatting(content)).append("</li>");
            }
            else {
                if (inList) {
                    html.append("</ul>");
                    inList = false;
                }
                html.append("<p>").append(processInlineFormatting(line)).append("</p>");
            }
        }

        if (inList) {
            html.append("</ul>");
        }

        html.append("</body>");
        html.append("</html>");

        return html.toString();
    }

    private String processInlineFormatting(String text) {
        text = text.replaceAll("\\*\\*(.+?)\\*\\*", "<strong>$1</strong>");
        text = text.replaceAll("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)", "<em>$1</em>");
        return escapeHtml(text);
    }

    private String escapeHtml(String text) {
        if (text.contains("<strong>") || text.contains("<em>")) {
            return text;
        }
        return text.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;");
    }

    private String generateCSS(ResumeLayoutInfo layout) {
        String primaryFont = layout.getPrimaryFont() != null ? layout.getPrimaryFont() : "Arial";
        String accentColor = layout.getAccentColor() != null ? layout.getAccentColor() : "#2c3e50";
        String primaryColor = layout.getPrimaryColor() != null ? layout.getPrimaryColor() : "#000000";
        double fontSize = layout.getAverageFontSize() != null ? layout.getAverageFontSize() : 11.0;
        double headingSize = layout.getHeadingFontSize() != null ? layout.getHeadingFontSize() : 16.0;
        int lineSpacing = layout.getLineSpacing() != null ? layout.getLineSpacing() : (int) Math.round(fontSize * 1.4);

        double lineHeight = lineSpacing / fontSize;

        String fontStack = buildFontStack(primaryFont);

        log.info("Generating PDF with font: {} (stack: {}), size: {}pt, line-height: {}, accent color: {}",
                 primaryFont, fontStack, fontSize, lineHeight, accentColor);

        return String.format(
            "@page { size: A4; margin: 0.5in; } " +
            "* { " +
            "  -fs-font-subset: complete-font; " +
            "} " +
            "body { " +
            "  font-family: %s; " +
            "  font-size: %.1fpt; " +
            "  line-height: %.2f; " +
            "  color: %s; " +
            "  margin: 0; " +
            "  padding: 0; " +
            "} " +
            "h1 { " +
            "  font-family: %s; " +
            "  font-size: %.1fpt; " +
            "  font-weight: bold; " +
            "  color: %s; " +
            "  margin: 0 0 8pt 0; " +
            "  padding: 0; " +
            "  text-align: center; " +
            "  line-height: %.2f; " +
            "} " +
            "h2 { " +
            "  font-family: %s; " +
            "  font-size: %.1fpt; " +
            "  font-weight: bold; " +
            "  color: %s; " +
            "  margin: 12pt 0 6pt 0; " +
            "  padding-bottom: 3pt; " +
            "  border-bottom: 1.5pt solid %s; " +
            "  text-transform: uppercase; " +
            "  line-height: %.2f; " +
            "} " +
            "p { " +
            "  margin: 4pt 0; " +
            "  padding: 0; " +
            "  font-family: %s; " +
            "  line-height: %.2f; " +
            "} " +
            "ul { " +
            "  margin: 4pt 0; " +
            "  padding-left: 20pt; " +
            "} " +
            "li { " +
            "  margin: 2pt 0; " +
            "  padding: 0; " +
            "  font-family: %s; " +
            "  line-height: %.2f; " +
            "} " +
            "strong { " +
            "  font-weight: bold; " +
            "  color: %s; " +
            "} " +
            "br { " +
            "  line-height: 0.5; " +
            "}",
            fontStack, fontSize, lineHeight, primaryColor,
            fontStack, headingSize, accentColor, lineHeight * 0.9,
            fontStack, fontSize * 1.2, accentColor, accentColor, lineHeight * 0.95,
            fontStack, lineHeight,
            fontStack, lineHeight,
            accentColor
        );
    }

    private String buildFontStack(String primaryFont) {
        StringBuilder fontStack = new StringBuilder();

        if (primaryFont != null && !primaryFont.isEmpty()) {
            fontStack.append("'").append(primaryFont).append("', ");
        }

        if (primaryFont != null) {
            if (primaryFont.contains("Calibri")) {
                fontStack.append("'Calibri', 'Candara', 'Segoe UI', ");
            } else if (primaryFont.contains("Times") || primaryFont.contains("Garamond")) {
                fontStack.append("'Times New Roman', 'Georgia', 'Garamond', serif, ");
            } else if (primaryFont.contains("Helvetica") || primaryFont.contains("Arial")) {
                fontStack.append("'Arial', 'Helvetica', ");
            } else if (primaryFont.contains("Verdana") || primaryFont.contains("Tahoma")) {
                fontStack.append("'Verdana', 'Tahoma', ");
            } else if (primaryFont.contains("Courier")) {
                fontStack.append("'Courier New', 'Courier', monospace, ");
            } else if (primaryFont.contains("Georgia")) {
                fontStack.append("'Georgia', 'Times New Roman', serif, ");
            } else if (primaryFont.contains("Trebuchet")) {
                fontStack.append("'Trebuchet MS', 'Lucida Grande', ");
            }
        }

        fontStack.append("'Helvetica Neue', Helvetica, Arial, sans-serif");

        return fontStack.toString();
    }

    private byte[] htmlToPdf(String html) throws Exception {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Document document = Jsoup.parse(html);
            document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
            String xhtml = document.html();

            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(xhtml, null);
            builder.toStream(outputStream);
            builder.run();

            return outputStream.toByteArray();
        }
    }
}
