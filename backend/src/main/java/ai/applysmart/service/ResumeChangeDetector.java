package ai.applysmart.service;

import ai.applysmart.dto.resume.ParsedResumeDto;

import java.util.List;

/**
 * Service for detecting changes between original and optimized resumes
 */
public interface ResumeChangeDetector {

    /**
     * Detect and describe changes between two resume versions
     *
     * @param original Original resume
     * @param optimized Optimized resume
     * @return List of human-readable change descriptions
     */
    List<String> detectChanges(ParsedResumeDto original, ParsedResumeDto optimized);
}
