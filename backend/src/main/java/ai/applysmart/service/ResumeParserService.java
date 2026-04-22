package ai.applysmart.service;

import ai.applysmart.dto.resume.ParsedResumeDto;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service for parsing resumes into structured data
 */
public interface ResumeParserService {

    /**
     * Parse resume PDF into structured data using AI
     *
     * @param file Resume PDF file
     * @return Structured resume data
     */
    ParsedResumeDto parseResume(MultipartFile file);

    /**
     * Parse resume text into structured data using AI
     *
     * @param resumeText Raw resume text
     * @return Structured resume data
     */
    ParsedResumeDto parseResumeText(String resumeText);
}
