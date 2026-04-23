package ai.applysmart.service.pdf;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class PdfDocumentRebuilder {

    private final PdfFontSelector fontSelector;

    public void rebuild(PDDocument document, List<TextPositionSequence> textPositions,
                        LineReplacementPlan replacementPlan) throws IOException {
        log.info("Creating text-only optimized PDF from original text positions");

        PDDocument newDocument = new PDDocument();
        try {
            Map<Integer, List<TextPositionSequence>> sequencesByPage = groupSequencesByPage(textPositions);
            copyPages(document, newDocument, sequencesByPage, replacementPlan);
            replacePages(document, newDocument);
        } finally {
            newDocument.close();
        }
    }

    private Map<Integer, List<TextPositionSequence>> groupSequencesByPage(List<TextPositionSequence> textPositions) {
        Map<Integer, List<TextPositionSequence>> sequencesByPage = new HashMap<>();

        for (TextPositionSequence sequence : textPositions) {
            if (!sequence.getText().trim().isEmpty()) {
                sequencesByPage.computeIfAbsent(sequence.getPageNumber(), key -> new ArrayList<>()).add(sequence);
            }
        }

        return sequencesByPage;
    }

    private void copyPages(PDDocument originalDocument, PDDocument newDocument,
                           Map<Integer, List<TextPositionSequence>> sequencesByPage,
                           LineReplacementPlan replacementPlan) throws IOException {
        for (int pageNum = 0; pageNum < originalDocument.getNumberOfPages(); pageNum++) {
            PDPage originalPage = originalDocument.getPage(pageNum);
            PDRectangle mediaBox = originalPage.getMediaBox();
            PDPage newPage = new PDPage(mediaBox);
            newDocument.addPage(newPage);

            List<TextPositionSequence> pageSequences = sequencesByPage.get(pageNum);
            if (pageSequences != null) {
                writePageText(newDocument, newPage, mediaBox, pageSequences, replacementPlan);
            }
        }
    }

    private void writePageText(PDDocument document, PDPage page, PDRectangle mediaBox,
                               List<TextPositionSequence> pageSequences,
                               LineReplacementPlan replacementPlan) throws IOException {
        try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
            int currentLine = 0;

            for (TextPositionSequence sequence : pageSequences) {
                String textToShow = resolveLineText(sequence, replacementPlan, currentLine);
                writeText(contentStream, mediaBox, sequence, textToShow);
                currentLine++;
            }
        }
    }

    private String resolveLineText(TextPositionSequence sequence, LineReplacementPlan replacementPlan, int currentLine) {
        String originalLineText = sequence.getText().trim();
        int lineIndex = findMatchingLineIndex(originalLineText, replacementPlan.originalLines(), currentLine);

        if (lineIndex != -1 && replacementPlan.replacements().containsKey(lineIndex)) {
            return replacementPlan.replacements().get(lineIndex);
        }

        return originalLineText;
    }

    private void writeText(PDPageContentStream contentStream, PDRectangle mediaBox,
                           TextPositionSequence sequence, String textToShow) throws IOException {
        float x = sequence.getX();
        float y = mediaBox.getHeight() - sequence.getY() - sequence.getHeight();
        PDFont font = fontSelector.select(sequence.getFontName());

        contentStream.beginText();
        contentStream.setNonStrokingColor(0f, 0f, 0f);
        contentStream.setFont(font, sequence.getFontSize());
        contentStream.newLineAtOffset(x, y);
        contentStream.showText(textToShow);
        contentStream.endText();
    }

    private int findMatchingLineIndex(String text, List<String> originalLines, int startIndex) {
        for (int i = startIndex; i < originalLines.size(); i++) {
            String originalLine = originalLines.get(i);
            if (originalLine.equals(text) || originalLine.contains(text) || text.contains(originalLine)) {
                return i;
            }
        }
        return -1;
    }

    private void replacePages(PDDocument document, PDDocument newDocument) {
        while (document.getNumberOfPages() > 0) {
            document.removePage(0);
        }

        for (PDPage page : newDocument.getPages()) {
            document.addPage(page);
        }
    }
}
