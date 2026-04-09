package ai.applysmart.service;

import ai.applysmart.dto.resume.ResumeLayoutInfo;

/**
 * Service for generating PDF from HTML with custom styling.
 */
public interface HtmlPdfGenerator {
    /**
     * Generate PDF from markdown text with layout styling.
     *
     * @param markdownContent the resume content in markdown format
     * @param layoutInfo the layout information extracted from original PDF
     * @return PDF as byte array
     */
    byte[] generateStyledPdf(String markdownContent, ResumeLayoutInfo layoutInfo);
}
