package ai.applysmart.service.pdf;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class PdfTextPositionExtractor {

    private static final float LINE_Y_THRESHOLD = 2f;

    public List<TextPositionSequence> extract(PDDocument document) throws IOException {
        List<TextPositionSequence> sequences = new ArrayList<>();

        for (int pageNum = 0; pageNum < document.getNumberOfPages(); pageNum++) {
            PDFTextStripper stripper = createStripper(sequences, pageNum);
            stripper.setStartPage(pageNum + 1);
            stripper.setEndPage(pageNum + 1);
            stripper.getText(document);
        }

        return sequences;
    }

    private PDFTextStripper createStripper(List<TextPositionSequence> sequences, int pageNumber) throws IOException {
        return new PDFTextStripper() {
            private List<TextPosition> currentLine = new ArrayList<>();
            private float lastY = -1;

            @Override
            protected void writeString(String text, List<TextPosition> textPositions) throws IOException {
                for (TextPosition position : textPositions) {
                    float currentY = position.getY();
                    if (lastY != -1 && Math.abs(currentY - lastY) > LINE_Y_THRESHOLD) {
                        flushLine();
                    }

                    currentLine.add(position);
                    lastY = currentY;
                }
            }

            @Override
            protected void endDocument(PDDocument document) throws IOException {
                flushLine();
                super.endDocument(document);
            }

            private void flushLine() {
                if (!currentLine.isEmpty()) {
                    sequences.add(new TextPositionSequence(currentLine, pageNumber));
                    currentLine = new ArrayList<>();
                }
            }
        };
    }
}
