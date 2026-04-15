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
        List<Float> yPositions = new ArrayList<>();

        try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {

            PDFTextStripper stripper = new PDFTextStripper() {
                private float lastY = -1;

                @Override
                protected void writeString(String text, List<TextPosition> textPositions) throws IOException {
                    for (TextPosition position : textPositions) {
                        PDFont font = position.getFont();
                        float fontSize = position.getFontSizeInPt();
                        float yPos = position.getY();

                        if (font != null) {
                            String fontName = extractFontFamily(font.getName());
                            fontCounts.put(fontName, fontCounts.getOrDefault(fontName, 0) + 1);
                            detectedFonts.add(fontName);

                            log.debug("Detected font: {} (size: {}pt)", fontName, fontSize);
                        }

                        if (fontSize > 0) {
                            fontSizes.add(fontSize);
                        }

                        if (lastY > 0 && Math.abs(yPos - lastY) > 1) {
                            yPositions.add(Math.abs(yPos - lastY));
                        }
                        lastY = yPos;
                    }
                    super.writeString(text, textPositions);
                }
            };

            StringWriter writer = new StringWriter();
            stripper.writeText(document, writer);

            log.info("Font analysis complete. Detected {} unique fonts, {} font size samples, {} line spacing samples",
                     detectedFonts.size(), fontSizes.size(), yPositions.size());
            log.info("Font usage: {}", fontCounts);

            return buildLayoutInfo(fontCounts, fontSizes, detectedFonts, yPositions);

        } catch (IOException e) {
            log.error("Error analyzing PDF layout", e);
            return getDefaultLayout();
        }
    }

    private String extractFontFamily(String fullFontName) {
        if (fullFontName == null) {
            return "Arial";
        }

        String cleaned = fullFontName.replaceAll("^[A-Z]{6}\\+", "");

        cleaned = cleaned.split("-")[0];
        cleaned = cleaned.split(",")[0];

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
                                             Set<String> detectedFonts,
                                             List<Float> yPositions) {
        String primaryFont = fontCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Arial");

        String secondaryFont = fontCounts.entrySet().stream()
                .filter(e -> !e.getKey().equals(primaryFont))
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(primaryFont);

        double averageFontSize = fontSizes.stream()
                .mapToDouble(Float::doubleValue)
                .average()
                .orElse(11.0);

        double headingFontSize = fontSizes.stream()
                .mapToDouble(Float::doubleValue)
                .max()
                .orElse(16.0);

        int lineSpacing = calculateLineSpacing(yPositions, averageFontSize);

        log.info("Primary font: {}, Secondary font: {}, Avg size: {}pt, Heading size: {}pt, Line spacing: {}pt",
                 primaryFont, secondaryFont, averageFontSize, headingFontSize, lineSpacing);

        return ResumeLayoutInfo.builder()
                .primaryFont(primaryFont)
                .secondaryFont(secondaryFont)
                .primaryColor("#000000")
                .accentColor("#2c3e50")
                .backgroundColor("#ffffff")
                .detectedFonts(new ArrayList<>(detectedFonts))
                .fontUsageCount(fontCounts)
                .averageFontSize(averageFontSize)
                .headingFontSize(headingFontSize)
                .hasMultipleColumns(false)
                .lineSpacing(lineSpacing)
                .build();
    }

    private int calculateLineSpacing(List<Float> yPositions, double averageFontSize) {
        if (yPositions.isEmpty()) {
            return (int) Math.round(averageFontSize * 1.3);
        }

        double median = yPositions.stream()
                .mapToDouble(Float::doubleValue)
                .sorted()
                .skip(yPositions.size() / 2)
                .findFirst()
                .orElse(averageFontSize * 1.3);

        List<Float> filtered = yPositions.stream()
                .filter(y -> y > averageFontSize * 0.8 && y < averageFontSize * 3.0)
                .collect(java.util.stream.Collectors.toList());

        if (filtered.isEmpty()) {
            return (int) Math.round(median);
        }

        double avgLineSpacing = filtered.stream()
                .mapToDouble(Float::doubleValue)
                .average()
                .orElse(median);

        return (int) Math.round(avgLineSpacing);
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
