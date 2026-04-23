package ai.applysmart.service.pdf;

import org.apache.pdfbox.text.TextPosition;

import java.util.ArrayList;
import java.util.List;

public class TextPositionSequence {

    private final List<TextPosition> positions;
    private final int pageNumber;

    public TextPositionSequence(List<TextPosition> positions, int pageNumber) {
        this.positions = new ArrayList<>(positions);
        this.pageNumber = pageNumber;
    }

    public String getText() {
        StringBuilder builder = new StringBuilder();
        for (TextPosition position : positions) {
            builder.append(position.getUnicode());
        }
        return builder.toString();
    }

    public float getX() {
        return positions.isEmpty() ? 0 : positions.get(0).getX();
    }

    public float getY() {
        return positions.isEmpty() ? 0 : positions.get(0).getY();
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
