package ai.applysmart.service.pdf;

import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Component;

@Component
public class PdfFontSelector {

    public PDFont select(String fontName) {
        String lowerName = fontName.toLowerCase();

        if (lowerName.contains("bold") && lowerName.contains("italic")) {
            return PDType1Font.HELVETICA_BOLD_OBLIQUE;
        }

        if (lowerName.contains("bold")) {
            return PDType1Font.HELVETICA_BOLD;
        }

        if (lowerName.contains("italic") || lowerName.contains("oblique")) {
            return PDType1Font.HELVETICA_OBLIQUE;
        }

        if (lowerName.contains("times")) {
            return selectTimesFont(lowerName);
        }

        if (lowerName.contains("courier")) {
            return selectCourierFont(lowerName);
        }

        return PDType1Font.HELVETICA;
    }

    private PDFont selectTimesFont(String lowerName) {
        if (lowerName.contains("bold") && lowerName.contains("italic")) {
            return PDType1Font.TIMES_BOLD_ITALIC;
        }
        if (lowerName.contains("bold")) {
            return PDType1Font.TIMES_BOLD;
        }
        if (lowerName.contains("italic")) {
            return PDType1Font.TIMES_ITALIC;
        }
        return PDType1Font.TIMES_ROMAN;
    }

    private PDFont selectCourierFont(String lowerName) {
        if (lowerName.contains("bold") && lowerName.contains("oblique")) {
            return PDType1Font.COURIER_BOLD_OBLIQUE;
        }
        if (lowerName.contains("bold")) {
            return PDType1Font.COURIER_BOLD;
        }
        if (lowerName.contains("oblique")) {
            return PDType1Font.COURIER_OBLIQUE;
        }
        return PDType1Font.COURIER;
    }
}
