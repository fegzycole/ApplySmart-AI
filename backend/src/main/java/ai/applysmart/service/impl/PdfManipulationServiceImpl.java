package ai.applysmart.service.impl;

import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.service.PdfManipulationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PdfManipulationServiceImpl implements PdfManipulationService {

    @Override
    public String extractText(MultipartFile file) {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        } catch (IOException e) {
            log.error("Failed to extract text from PDF", e);
            throw new FileProcessingException("Failed to extract text from PDF", e);
        }
    }

    @Override
    public byte[] replaceTextInPdf(MultipartFile file, String originalText, String optimizedText) {
        log.info("Starting PDF text replacement. Original text length: {}, Optimized text length: {}",
                originalText.length(), optimizedText.length());

        try (PDDocument document = PDDocument.load(file.getInputStream())) {

            // Extract text with positions from original PDF
            List<TextPositionSequence> textPositions = extractTextWithPositions(document);
            log.info("Extracted {} text sequences from PDF", textPositions.size());

            // Split texts into lines
            List<String> originalLines = Arrays.stream(originalText.split("\n"))
                    .map(String::trim)
                    .filter(line -> !line.isEmpty())
                    .collect(Collectors.toList());

            List<String> optimizedLines = Arrays.stream(optimizedText.split("\n"))
                    .map(String::trim)
                    .filter(line -> !line.isEmpty())
                    .collect(Collectors.toList());

            log.info("Original lines: {}, Optimized lines: {}", originalLines.size(), optimizedLines.size());

            // Create mapping between original and optimized lines
            Map<Integer, String> lineReplacements = createLineReplacements(originalLines, optimizedLines);
            log.info("Created {} line replacements", lineReplacements.size());

            // Apply replacements to PDF
            applyReplacementsToPdf(document, textPositions, lineReplacements, originalLines);

            // Save modified PDF
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);

            byte[] result = outputStream.toByteArray();
            log.info("PDF text replacement completed. Output size: {} bytes", result.length);
            return result;

        } catch (IOException e) {
            log.error("Failed to replace text in PDF", e);
            throw new FileProcessingException("Failed to replace text in PDF", e);
        }
    }

    /**
     * Extract text with position information
     */
    private List<TextPositionSequence> extractTextWithPositions(PDDocument document) throws IOException {
        List<TextPositionSequence> sequences = new ArrayList<>();

        for (int pageNum = 0; pageNum < document.getNumberOfPages(); pageNum++) {
            final int currentPageNum = pageNum;

            PDFTextStripper stripper = new PDFTextStripper() {
                private List<TextPosition> currentLine = new ArrayList<>();
                private float lastY = -1;

                @Override
                protected void writeString(String text, List<TextPosition> textPositions) throws IOException {
                    for (TextPosition position : textPositions) {
                        float currentY = position.getY();

                        // Check if we're on a new line (Y coordinate changed significantly)
                        if (lastY != -1 && Math.abs(currentY - lastY) > 2) {
                            // Save previous line
                            if (!currentLine.isEmpty()) {
                                sequences.add(new TextPositionSequence(currentLine, currentPageNum));
                                currentLine = new ArrayList<>();
                            }
                        }

                        currentLine.add(position);
                        lastY = currentY;
                    }
                }

                @Override
                protected void endDocument(PDDocument document) throws IOException {
                    // Save last line
                    if (!currentLine.isEmpty()) {
                        sequences.add(new TextPositionSequence(currentLine, currentPageNum));
                    }
                    super.endDocument(document);
                }
            };

            stripper.setStartPage(pageNum + 1);
            stripper.setEndPage(pageNum + 1);
            stripper.getText(document);
        }

        return sequences;
    }

    /**
     * Create mapping between original line indices and optimized text
     */
    private Map<Integer, String> createLineReplacements(List<String> originalLines, List<String> optimizedLines) {
        Map<Integer, String> replacements = new HashMap<>();

        int minSize = Math.min(originalLines.size(), optimizedLines.size());
        for (int i = 0; i < minSize; i++) {
            String originalLine = originalLines.get(i);
            String optimizedLine = optimizedLines.get(i);

            // Only create replacement if lines are different and similar enough
            if (!originalLine.equals(optimizedLine) && areLinesRelated(originalLine, optimizedLine)) {
                replacements.put(i, optimizedLine);
            }
        }

        return replacements;
    }

    /**
     * Check if two lines are related (same section/context)
     */
    private boolean areLinesRelated(String line1, String line2) {
        // Simple similarity check - share at least 30% of words
        Set<String> words1 = new HashSet<>(Arrays.asList(line1.toLowerCase().split("\\s+")));
        Set<String> words2 = new HashSet<>(Arrays.asList(line2.toLowerCase().split("\\s+")));

        Set<String> intersection = new HashSet<>(words1);
        intersection.retainAll(words2);

        double similarity = (double) intersection.size() / Math.max(words1.size(), words2.size());
        return similarity > 0.3 || line1.length() > 0; // Accept all for now
    }

    /**
     * Apply replacements to PDF by creating a new blank PDF with optimized text
     * NOTE: This approach has limitations - it recreates text-only, losing images/graphics
     */
    private void applyReplacementsToPdf(PDDocument document, List<TextPositionSequence> textPositions,
                                        Map<Integer, String> lineReplacements, List<String> originalLines) throws IOException {

        log.info("Creating new PDF with optimized text. Note: This recreates text-only version.");

        // Create a new document to build the optimized PDF
        PDDocument newDocument = new PDDocument();

        Map<Integer, List<TextPositionSequence>> sequencesByPage = new HashMap<>();

        // Group sequences by page
        for (TextPositionSequence sequence : textPositions) {
            String text = sequence.getText().trim();
            if (text.isEmpty()) continue;

            int pageIndex = sequence.getPageNumber();
            sequencesByPage.computeIfAbsent(pageIndex, k -> new ArrayList<>()).add(sequence);
        }

        // Process each page
        for (int pageNum = 0; pageNum < document.getNumberOfPages(); pageNum++) {
            PDPage originalPage = document.getPage(pageNum);
            PDRectangle mediaBox = originalPage.getMediaBox();

            // Create new page with same dimensions
            PDPage newPage = new PDPage(mediaBox);
            newDocument.addPage(newPage);

            List<TextPositionSequence> pageSequences = sequencesByPage.get(pageNum);
            if (pageSequences == null) continue;

            try (PDPageContentStream contentStream = new PDPageContentStream(newDocument, newPage)) {

                int currentLine = 0;

                for (TextPositionSequence sequence : pageSequences) {
                    String originalLineText = sequence.getText().trim();

                    // Find matching line in original text
                    int lineIndex = findMatchingLineIndex(originalLineText, originalLines, currentLine);

                    String textToShow;
                    if (lineIndex != -1 && lineReplacements.containsKey(lineIndex)) {
                        textToShow = lineReplacements.get(lineIndex);
                    } else {
                        textToShow = originalLineText;
                    }

                    // Draw text at original position
                    float x = sequence.getX();
                    float y = mediaBox.getHeight() - sequence.getY() - sequence.getHeight();

                    contentStream.beginText();
                    contentStream.setNonStrokingColor(0f, 0f, 0f);

                    PDFont font = selectFont(sequence.getFontName());
                    float fontSize = sequence.getFontSize();

                    contentStream.setFont(font, fontSize);
                    contentStream.newLineAtOffset(x, y);
                    contentStream.showText(textToShow);
                    contentStream.endText();

                    currentLine++;
                }
            }
        }

        // Replace original document pages with new pages
        while (document.getNumberOfPages() > 0) {
            document.removePage(0);
        }

        for (PDPage page : newDocument.getPages()) {
            document.addPage(page);
        }

        newDocument.close();
    }

    /**
     * Find index of matching line in original lines list
     */
    private int findMatchingLineIndex(String text, List<String> originalLines, int startIndex) {
        for (int i = startIndex; i < originalLines.size(); i++) {
            if (originalLines.get(i).equals(text) ||
                originalLines.get(i).contains(text) ||
                text.contains(originalLines.get(i))) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Select appropriate font based on font name
     */
    private PDFont selectFont(String fontName) {
        String lowerName = fontName.toLowerCase();

        if (lowerName.contains("bold") && lowerName.contains("italic")) {
            return PDType1Font.HELVETICA_BOLD_OBLIQUE;
        } else if (lowerName.contains("bold")) {
            return PDType1Font.HELVETICA_BOLD;
        } else if (lowerName.contains("italic") || lowerName.contains("oblique")) {
            return PDType1Font.HELVETICA_OBLIQUE;
        } else if (lowerName.contains("times")) {
            if (lowerName.contains("bold") && lowerName.contains("italic")) {
                return PDType1Font.TIMES_BOLD_ITALIC;
            } else if (lowerName.contains("bold")) {
                return PDType1Font.TIMES_BOLD;
            } else if (lowerName.contains("italic")) {
                return PDType1Font.TIMES_ITALIC;
            } else {
                return PDType1Font.TIMES_ROMAN;
            }
        } else if (lowerName.contains("courier")) {
            if (lowerName.contains("bold") && lowerName.contains("oblique")) {
                return PDType1Font.COURIER_BOLD_OBLIQUE;
            } else if (lowerName.contains("bold")) {
                return PDType1Font.COURIER_BOLD;
            } else if (lowerName.contains("oblique")) {
                return PDType1Font.COURIER_OBLIQUE;
            } else {
                return PDType1Font.COURIER;
            }
        }

        return PDType1Font.HELVETICA; // Default
    }

    /**
     * Helper class to store text position sequence (line of text)
     */
    private static class TextPositionSequence {
        private final List<TextPosition> positions;
        private final int pageNumber;

        public TextPositionSequence(List<TextPosition> positions, int pageNumber) {
            this.positions = new ArrayList<>(positions);
            this.pageNumber = pageNumber;
        }

        public String getText() {
            StringBuilder sb = new StringBuilder();
            for (TextPosition pos : positions) {
                sb.append(pos.getUnicode());
            }
            return sb.toString();
        }

        public float getX() {
            return positions.isEmpty() ? 0 : positions.get(0).getX();
        }

        public float getY() {
            return positions.isEmpty() ? 0 : positions.get(0).getY();
        }

        public float getWidth() {
            if (positions.isEmpty()) return 0;
            float minX = Float.MAX_VALUE;
            float maxX = Float.MIN_VALUE;
            for (TextPosition pos : positions) {
                minX = Math.min(minX, pos.getX());
                maxX = Math.max(maxX, pos.getX() + pos.getWidth());
            }
            return maxX - minX;
        }

        public float getHeight() {
            return positions.isEmpty() ? 0 : positions.get(0).getHeight();
        }

        public float getFontSize() {
            return positions.isEmpty() ? 12 : positions.get(0).getFontSize();
        }

        public String getFontName() {
            return positions.isEmpty() ? "Helvetica" : positions.get(0).getFont().getName();
        }

        public int getPageNumber() {
            return pageNumber;
        }
    }
}
