package ai.applysmart.service.pdf;

import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.service.pdf.PdfManipulationService;
import ai.applysmart.service.pdf.LineReplacementPlan;
import ai.applysmart.service.pdf.PdfDocumentRebuilder;
import ai.applysmart.service.pdf.PdfLineReplacementPlanner;
import ai.applysmart.service.pdf.PdfTextPositionExtractor;
import ai.applysmart.service.pdf.TextPositionSequence;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PdfManipulationServiceImpl implements PdfManipulationService {

    private final PdfTextPositionExtractor textPositionExtractor;
    private final PdfLineReplacementPlanner lineReplacementPlanner;
    private final PdfDocumentRebuilder documentRebuilder;

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
            List<TextPositionSequence> textPositions = textPositionExtractor.extract(document);
            log.info("Extracted {} text sequences from PDF", textPositions.size());

            LineReplacementPlan replacementPlan = lineReplacementPlanner.createPlan(originalText, optimizedText);
            log.info("Created {} line replacements", replacementPlan.replacements().size());

            documentRebuilder.rebuild(document, textPositions, replacementPlan);

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
}
