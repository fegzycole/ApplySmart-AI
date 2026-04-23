package ai.applysmart.service.scoring;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.service.scoring.ResumeMatchScorer;
import ai.applysmart.service.scoring.KeywordMatchCalculator;
import ai.applysmart.service.scoring.ResumeQualityScorer;
import ai.applysmart.service.scoring.ResumeTextExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResumeMatchScorerImpl implements ResumeMatchScorer {

    private static final int BASE_SCORE = 50;
    private static final int MAX_SCORE = 100;
    private static final int MAX_IMPROVEMENT = 45;

    private final ResumeTextExtractor resumeTextExtractor;
    private final KeywordMatchCalculator keywordMatchCalculator;
    private final ResumeQualityScorer resumeQualityScorer;

    @Override
    public int calculateScore(ParsedResumeDto resume, String jobDescription) {
        if (isInvalidInput(resume, jobDescription)) {
            return BASE_SCORE;
        }

        int score = BASE_SCORE;
        score += keywordMatchCalculator.calculateBonus(resumeTextExtractor.extract(resume), jobDescription);
        score += resumeQualityScorer.calculateExperienceBonus(resume);
        score += resumeQualityScorer.calculateContentQualityBonus(resume);

        return Math.min(score, MAX_SCORE);
    }

    @Override
    public int capScoreImprovement(int originalScore, int optimizedScore) {
        int improvement = optimizedScore - originalScore;
        if (improvement > MAX_IMPROVEMENT) {
            return originalScore + MAX_IMPROVEMENT;
        }
        return optimizedScore;
    }

    private boolean isInvalidInput(ParsedResumeDto resume, String jobDescription) {
        return resume == null || jobDescription == null;
    }
}
