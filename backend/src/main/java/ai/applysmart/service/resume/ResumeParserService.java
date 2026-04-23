package ai.applysmart.service.resume;

import ai.applysmart.dto.resume.ParsedResumeDto;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service for parsing resumes into structured data
 */
public interface ResumeParserService {

    ParsedResumeDto parseResume(MultipartFile file);

    ParsedResumeDto parseResumeText(String resumeText);
}
