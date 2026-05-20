package ai.applysmart.service.template;

import ai.applysmart.exception.FileProcessingException;
import com.openhtmltopdf.outputdevice.helper.BaseRendererBuilder;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.Base64;

class ResumeFontRegistry {

    private volatile String embeddedFontCss;

    String embeddedFontCss() {
        String cached = embeddedFontCss;
        if (cached != null) {
            return cached;
        }

        String css = """
                <style id="resume-embedded-fonts">
                @font-face { font-family: 'Inter'; src: url('data:font/truetype;base64,%s') format('truetype'); font-weight: 500 900; font-style: normal; }
                @font-face { font-family: 'Inter'; src: url('data:font/truetype;base64,%s') format('truetype'); font-weight: 500 900; font-style: italic; }
                @font-face { font-family: 'Libre Baskerville'; src: url('data:font/truetype;base64,%s') format('truetype'); font-weight: 400 700; font-style: normal; }
                @font-face { font-family: 'Libre Baskerville'; src: url('data:font/truetype;base64,%s') format('truetype'); font-weight: 400 700; font-style: italic; }
                @font-face { font-family: 'EB Garamond'; src: url('data:font/truetype;base64,%s') format('truetype'); font-weight: 500 800; font-style: normal; }
                @font-face { font-family: 'EB Garamond'; src: url('data:font/truetype;base64,%s') format('truetype'); font-weight: 500 800; font-style: italic; }
                @font-face { font-family: 'Plus Jakarta Sans'; src: url('data:font/truetype;base64,%s') format('truetype'); font-weight: 500 800; font-style: normal; }
                </style>
                """.formatted(
                encodeFont("fonts/resume/Inter.ttf"),
                encodeFont("fonts/resume/Inter-Italic.ttf"),
                encodeFont("fonts/resume/LibreBaskerville.ttf"),
                encodeFont("fonts/resume/LibreBaskerville-Italic.ttf"),
                encodeFont("fonts/resume/EBGaramond.ttf"),
                encodeFont("fonts/resume/EBGaramond-Italic.ttf"),
                encodeFont("fonts/resume/PlusJakartaSans.ttf")
        );

        embeddedFontCss = css;
        return css;
    }

    void registerFonts(PdfRendererBuilder builder) {
        registerFont(builder, "fonts/resume/Inter.ttf", "Inter", BaseRendererBuilder.FontStyle.NORMAL, 500, 600, 700, 800, 900);
        registerFont(builder, "fonts/resume/Inter-Italic.ttf", "Inter", BaseRendererBuilder.FontStyle.ITALIC, 500, 600, 700, 800, 900);
        registerFont(builder, "fonts/resume/LibreBaskerville.ttf", "Libre Baskerville", BaseRendererBuilder.FontStyle.NORMAL, 400, 700);
        registerFont(builder, "fonts/resume/LibreBaskerville-Italic.ttf", "Libre Baskerville", BaseRendererBuilder.FontStyle.ITALIC, 400, 700);
        registerFont(builder, "fonts/resume/EBGaramond.ttf", "EB Garamond", BaseRendererBuilder.FontStyle.NORMAL, 500, 600, 700, 800);
        registerFont(builder, "fonts/resume/EBGaramond-Italic.ttf", "EB Garamond", BaseRendererBuilder.FontStyle.ITALIC, 500, 600, 700, 800);
        registerFont(builder, "fonts/resume/PlusJakartaSans.ttf", "Plus Jakarta Sans", BaseRendererBuilder.FontStyle.NORMAL, 500, 700, 800);
    }

    private void registerFont(PdfRendererBuilder builder, String classpathLocation, String family,
                              BaseRendererBuilder.FontStyle style, Integer... weights) {
        for (Integer weight : weights) {
            builder.useFont(() -> openFontStream(classpathLocation), family, weight, style, true);
        }
    }

    private InputStream openFontStream(String classpathLocation) {
        try {
            return new ClassPathResource(classpathLocation).getInputStream();
        } catch (Exception e) {
            throw new FileProcessingException("Failed to load font resource: " + classpathLocation, e);
        }
    }

    private String encodeFont(String classpathLocation) {
        try (InputStream inputStream = new ClassPathResource(classpathLocation).getInputStream()) {
            return Base64.getEncoder().encodeToString(inputStream.readAllBytes());
        } catch (Exception e) {
            throw new FileProcessingException("Failed to load font resource: " + classpathLocation, e);
        }
    }
}
