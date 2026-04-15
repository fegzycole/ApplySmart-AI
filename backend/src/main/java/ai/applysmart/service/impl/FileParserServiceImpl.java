package ai.applysmart.service.impl;

import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.service.FileParserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class FileParserServiceImpl implements FileParserService {

    @Override
    public String extractTextFromFile(MultipartFile file) {
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new BadRequestException("Invalid file name");
        }

        try {
            if (filename.toLowerCase().endsWith(".pdf")) {
                return extractTextFromPdf(file);
            } else if (filename.toLowerCase().endsWith(".docx")) {
                return extractTextFromDocx(file);
            } else if (filename.toLowerCase().endsWith(".txt")) {
                return new String(file.getBytes());
            } else {
                throw new BadRequestException("Unsupported file format. Please upload PDF, DOCX, or TXT files.");
            }
        } catch (IOException e) {
            log.error("Error extracting text from file: {}", filename, e);
            throw new FileProcessingException("Failed to extract text from file", e);
        }
    }

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            StructuredPDFTextStripper stripper = new StructuredPDFTextStripper();
            return stripper.getText(document);
        }
    }

    private static class StructuredPDFTextStripper extends PDFTextStripper {
        private final List<TextInfo> textInfos = new ArrayList<>();
        private float averageFontSize = 0;
        private float maxFontSize = 0;

        private static class TextInfo {
            String text;
            float fontSize;
            boolean isBold;

            TextInfo(String text, float fontSize, boolean isBold) {
                this.text = text;
                this.fontSize = fontSize;
                this.isBold = isBold;
            }
        }

        public StructuredPDFTextStripper() throws IOException {
            super();
        }

        @Override
        protected void writeString(String text, List<org.apache.pdfbox.text.TextPosition> textPositions) throws IOException {
            if (textPositions.isEmpty()) {
                super.writeString(text, textPositions);
                return;
            }

            org.apache.pdfbox.text.TextPosition firstPos = textPositions.get(0);
            float fontSize = firstPos.getFontSizeInPt();
            String fontName = firstPos.getFont() != null ? firstPos.getFont().getName() : "";
            boolean isBold = fontName.toLowerCase().contains("bold");

            if (fontSize > maxFontSize) {
                maxFontSize = fontSize;
            }

            textInfos.add(new TextInfo(text, fontSize, isBold));
            super.writeString(text, textPositions);
        }

        @Override
        public String getText(org.apache.pdfbox.pdmodel.PDDocument document) throws IOException {
            textInfos.clear();
            maxFontSize = 0;
            String rawText = super.getText(document);

            if (!textInfos.isEmpty()) {
                float sum = 0;
                for (TextInfo info : textInfos) {
                    sum += info.fontSize;
                }
                averageFontSize = sum / textInfos.size();
            }

            StringBuilder formatted = new StringBuilder();
            String[] lines = rawText.split("\\n");
            int textInfoIndex = 0;

            for (String line : lines) {
                if (line.trim().isEmpty()) {
                    formatted.append("\n");
                    continue;
                }

                float lineFontSize = averageFontSize;
                boolean lineBold = false;

                if (textInfoIndex < textInfos.size()) {
                    for (int i = textInfoIndex; i < textInfos.size(); i++) {
                        TextInfo info = textInfos.get(i);
                        if (line.contains(info.text.trim())) {
                            lineFontSize = info.fontSize;
                            lineBold = info.isBold;
                            textInfoIndex = i + 1;
                            break;
                        }
                    }
                }

                String formattedLine = formatLine(line, lineFontSize, lineBold);
                formatted.append(formattedLine).append("\n");
            }

            return formatted.toString();
        }

        private String formatLine(String line, float fontSize, boolean isBold) {
            String trimmed = line.trim();

            boolean isMainHeading = fontSize >= maxFontSize * 0.9; // Within 90% of max
            boolean isSubHeading = fontSize >= averageFontSize * 1.3; // 30% larger than average

            if (isMainHeading && trimmed.length() < 50) {
                return "# " + trimmed;
            }
            else if ((isSubHeading || isBold) && trimmed.length() < 50 && trimmed.toUpperCase().equals(trimmed)) {
                return "## " + trimmed;
            }
            else if (isBold && !trimmed.startsWith("•") && !trimmed.startsWith("-")) {
                return "**" + trimmed + "**";
            }
            else {
                return line;
            }
        }
    }

    private String extractTextFromDocx(MultipartFile file) throws IOException {
        try (XWPFDocument document = new XWPFDocument(file.getInputStream())) {
            StringBuilder text = new StringBuilder();
            for (XWPFParagraph paragraph : document.getParagraphs()) {
                text.append(paragraph.getText()).append("\n");
            }
            return text.toString();
        }
    }
}
