package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.ResumeLayoutInfo;
import ai.applysmart.service.PdfLayoutAnalyzer;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PdfLayoutAnalyzerImpl implements PdfLayoutAnalyzer {

    @Override
    public ResumeLayoutInfo analyzeLayout(MultipartFile file) {
        try {
            return analyzeLayout(file.getBytes());
        } catch (IOException e) {
            log.error("Error analyzing PDF layout from MultipartFile", e);
            return getDefaultLayout();
        }
    }

    @Override
    public ResumeLayoutInfo analyzeLayout(byte[] pdfBytes) {
        Map<String, Integer> fontCounts = new HashMap<>();
        List<Float> fontSizes = new ArrayList<>();
        Set<String> detectedFonts = new HashSet<>();

        try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {

            // Create custom stripper to extract font information
            PDFTextStripper stripper = new PDFTextStripper() {
                @Override
                protected void writeString(String text, List<TextPosition> textPositions) throws IOException {
                    for (TextPosition position : textPositions) {
                        PDFont font = position.getFont();
                        float fontSize = position.getFontSizeInPt();

                        if (font != null) {
                            String fontName = extractFontFamily(font.getName());
                            fontCounts.put(fontName, fontCounts.getOrDefault(fontName, 0) + 1);
                            detectedFonts.add(fontName);

                            log.debug("Detected font: {} (size: {}pt)", fontName, fontSize);
                        }

                        if (fontSize > 0) {
                            fontSizes.add(fontSize);
                        }
                    }
                    super.writeString(text, textPositions);
                }
            };

            // Extract text to trigger font analysis
            StringWriter writer = new StringWriter();
            stripper.writeText(document, writer);

            log.info("Font analysis complete. Detected {} unique fonts, {} font size samples",
                     detectedFonts.size(), fontSizes.size());
            log.info("Font usage: {}", fontCounts);

            return buildLayoutInfo(fontCounts, fontSizes, detectedFonts);

        } catch (IOException e) {
            log.error("Error analyzing PDF layout", e);
            return getDefaultLayout();
        }
    }

    private String extractFontFamily(String fullFontName) {
        if (fullFontName == null) {
            return "Arial";
        }

        // Remove subset prefix (e.g., "ABCDEE+FontName" -> "FontName")
        String cleaned = fullFontName.replaceAll("^[A-Z]{6}\\+", "");

        // Extract base font family
        cleaned = cleaned.split("-")[0];  // "TimesNewRoman-Bold" -> "TimesNewRoman"
        cleaned = cleaned.split(",")[0];   // "Arial,Bold" -> "Arial"

        // Map common PDF fonts to web-safe fonts
        if (cleaned.contains("Times")) return "Times New Roman";
        if (cleaned.contains("Helvetica") || cleaned.contains("Arial")) return "Arial";
        if (cleaned.contains("Courier")) return "Courier New";
        if (cleaned.contains("Georgia")) return "Georgia";
        if (cleaned.contains("Verdana")) return "Verdana";
        if (cleaned.contains("Calibri")) return "Calibri";
        if (cleaned.contains("Cambria")) return "Cambria";
        if (cleaned.contains("Tahoma")) return "Tahoma";
        if (cleaned.contains("Trebuchet")) return "Trebuchet MS";
        if (cleaned.contains("Garamond")) return "Garamond";
        if (cleaned.contains("Palatino")) return "Palatino";

        return cleaned.isEmpty() ? "Arial" : cleaned;
    }

    private ResumeLayoutInfo buildLayoutInfo(Map<String, Integer> fontCounts,
                                             List<Float> fontSizes,
                                             Set<String> detectedFonts) {
        // Determine primary font (most used)
        String primaryFont = fontCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Arial");

        // Determine secondary font (second most used)
        String secondaryFont = fontCounts.entrySet().stream()
                .filter(e -> !e.getKey().equals(primaryFont))
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(primaryFont);

        // Calculate average and heading font sizes
        double averageFontSize = fontSizes.stream()
                .mapToDouble(Float::doubleValue)
                .average()
                .orElse(11.0);

        double headingFontSize = fontSizes.stream()
                .mapToDouble(Float::doubleValue)
                .max()
                .orElse(16.0);

        log.info("Primary font: {}, Secondary font: {}, Avg size: {}pt, Heading size: {}pt",
                 primaryFont, secondaryFont, averageFontSize, headingFontSize);

        return ResumeLayoutInfo.builder()
                .primaryFont(primaryFont)
                .secondaryFont(secondaryFont)
                .primaryColor("#000000")  // Default black
                .accentColor("#2c3e50")   // Default dark blue
                .backgroundColor("#ffffff") // White background
                .detectedFonts(new ArrayList<>(detectedFonts))
                .fontUsageCount(fontCounts)
                .averageFontSize(averageFontSize)
                .headingFontSize(headingFontSize)
                .hasMultipleColumns(false)
                .lineSpacing(14)
                .build();
    }

    private ResumeLayoutInfo getDefaultLayout() {
        return ResumeLayoutInfo.builder()
                .primaryFont("Arial")
                .secondaryFont("Arial")
                .primaryColor("#000000")
                .accentColor("#2c3e50")
                .backgroundColor("#ffffff")
                .detectedFonts(Arrays.asList("Arial"))
                .fontUsageCount(Map.of("Arial", 100))
                .averageFontSize(11.0)
                .headingFontSize(16.0)
                .hasMultipleColumns(false)
                .lineSpacing(14)
                .build();
    }
}
