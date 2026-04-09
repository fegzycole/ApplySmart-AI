package ai.applysmart.service;

import ai.applysmart.dto.resume.ResumeLayoutInfo;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service for analyzing PDF layout, fonts, and colors.
 */
public interface PdfLayoutAnalyzer {
    /**
     * Analyze the visual properties of a PDF resume.
     *
     * @param file the PDF file to analyze
     * @return layout information including fonts, colors, and structure
     */
    ResumeLayoutInfo analyzeLayout(MultipartFile file);

    /**
     * Analyze layout from PDF bytes.
     *
     * @param pdfBytes the PDF content as byte array
     * @return layout information
     */
    ResumeLayoutInfo analyzeLayout(byte[] pdfBytes);
}
