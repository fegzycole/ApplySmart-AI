package ai.applysmart.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Service for manipulating PDF files using Apache PDFBox
 * Handles text extraction and replacement while preserving layout
 */
public interface PdfManipulationService {

    /**
     * Extract text content from PDF file
     *
     * @param file PDF file to extract from
     * @return extracted text content
     */
    String extractText(MultipartFile file);

    /**
     * Replace text in PDF while preserving layout and formatting
     * Uses intelligent text matching to replace similar content
     *
     * @param file Original PDF file
     * @param originalText Original text content (for reference)
     * @param optimizedText New text to insert
     * @return byte array of modified PDF
     */
    byte[] replaceTextInPdf(MultipartFile file, String originalText, String optimizedText);
}
