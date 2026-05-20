package ai.applysmart.service.template;

import ai.applysmart.exception.FileProcessingException;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class PdfGenerator {

    private static final List<String> CHROMIUM_PATH_CANDIDATES = List.of(
            "/usr/bin/chromium",
            "/usr/bin/chromium-browser",
            "/usr/bin/google-chrome",
            "/usr/bin/google-chrome-stable",
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    );

    private final ChromiumPdfRenderer chromiumPdfRenderer = new ChromiumPdfRenderer();
    private final ResumeFontRegistry resumeFontRegistry = new ResumeFontRegistry();

    @Value("${app.pdf.prefer-chromium:true}")
    private boolean preferChromium = true;

    @Value("${app.pdf.chromium-path:}")
    private String configuredChromiumPath;

    public byte[] generate(String html) {
        if (preferChromium) {
            Optional<String> chromiumPath = resolveChromiumPath();
            if (chromiumPath.isPresent()) {
                return chromiumPdfRenderer.render(injectEmbeddedFonts(html), chromiumPath.get());
            }

            log.warn("Chromium executable not found. Falling back to OpenHTMLToPDF.");
        }

        return generateWithOpenHtml(html);
    }

    private byte[] generateWithOpenHtml(String html) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            resumeFontRegistry.registerFonts(builder);
            builder.withHtmlContent(html, null);
            builder.toStream(outputStream);
            builder.run();

            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new FileProcessingException("Failed to generate PDF", e);
        }
    }

    private Optional<String> resolveChromiumPath() {
        if (configuredChromiumPath != null && !configuredChromiumPath.isBlank()) {
            return Optional.of(configuredChromiumPath.trim());
        }

        return CHROMIUM_PATH_CANDIDATES.stream()
                .filter(candidate -> Files.isExecutable(Path.of(candidate)))
                .findFirst();
    }

    private String injectEmbeddedFonts(String html) {
        String fontCss = resumeFontRegistry.embeddedFontCss();
        if (html.contains("<head>")) {
            return html.replace("<head>", "<head>\n" + fontCss);
        }

        return fontCss + html;
    }
}
