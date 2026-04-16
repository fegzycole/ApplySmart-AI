package ai.applysmart.service;

import ai.applysmart.dto.resume.ResumeLayoutInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Service for analyzing PDF layout, fonts, and colors.
 */
public interface PdfLayoutAnalyzer {
    /**
     * Analyze the visual properties of a PDF resume.
     *
     * @param file the PDF file to analyze
     * @return layout information including fonts, colors, and structure
     * @throws IOException if PDF reading fails
     */
    ResumeLayoutInfo analyzeLayout(MultipartFile file) throws IOException;

    /**
     * Analyze layout from PDF bytes.
     *
     * @param pdfBytes the PDF content as byte array
     * @return layout information
     * @throws IOException if PDF reading fails
     */
    ResumeLayoutInfo analyzeLayout(byte[] pdfBytes) throws IOException;
}
