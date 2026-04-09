package ai.applysmart.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Service for parsing text content from various file formats.
 */
public interface FileParserService {
    /**
     * Extract text content from an uploaded file.
     * Supports PDF, DOCX, and TXT formats.
     *
     * @param file the uploaded file
     * @return extracted text content
     */
    String extractTextFromFile(MultipartFile file);
}
