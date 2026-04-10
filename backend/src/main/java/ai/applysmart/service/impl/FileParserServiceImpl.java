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
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
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
