package ai.applysmart.service.scoring;

import ai.applysmart.dto.resume.ParsedResumeDto;

public interface ResumeMatchScorer {

    int calculateScore(ParsedResumeDto resume, String jobDescription);

    int capScoreImprovement(int originalScore, int optimizedScore);
}
