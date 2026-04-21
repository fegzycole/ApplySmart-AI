package ai.applysmart.service;

import ai.applysmart.dto.resume.ParsedResumeDto;

public interface ResumeMatchScorer {

    /**
     * Calculate match score between resume and job description
     *
     * @param resume Parsed resume data
     * @param jobDescription Job description text
     * @return Score between 0-100
     */
    int calculateScore(ParsedResumeDto resume, String jobDescription);

    /**
     * Calculate realistic optimized score with cap on improvement
     *
     * @param originalScore Original resume score
     * @param optimizedScore Raw optimized score
     * @return Capped optimized score (max +15 improvement)
     */
    int capScoreImprovement(int originalScore, int optimizedScore);
}
