package ai.applysmart.service.scoring;

import ai.applysmart.dto.resume.ParsedResumeDto;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
public class ResumeQualityScorer {

    private static final int EXPERIENCE_BONUS = 15;
    private static final int MAX_WORK_HISTORY_BONUS = 4;
    private static final int SUMMARY_BONUS = 3;
    private static final int QUANTIFIED_ACHIEVEMENT_BONUS = 3;
    private static final int MAX_CONTENT_QUALITY_BONUS = 10;

    public int calculateExperienceBonus(ParsedResumeDto resume) {
        boolean hasExperience = resume.getWorkExperience() != null && !resume.getWorkExperience().isEmpty();
        return hasExperience ? EXPERIENCE_BONUS : 0;
    }

    public int calculateContentQualityBonus(ParsedResumeDto resume) {
        int bonus = 0;

        if (resume.getSummary() != null && resume.getSummary().length() > 50) {
            bonus += SUMMARY_BONUS;
        }

        if (resume.getWorkExperience() != null) {
            bonus += Math.min(MAX_WORK_HISTORY_BONUS, resume.getWorkExperience().size());
        }

        if (hasQuantifiedAchievement(resume)) {
            bonus += QUANTIFIED_ACHIEVEMENT_BONUS;
        }

        return Math.min(bonus, MAX_CONTENT_QUALITY_BONUS);
    }

    private boolean hasQuantifiedAchievement(ParsedResumeDto resume) {
        if (resume.getWorkExperience() == null) {
            return false;
        }

        return resume.getWorkExperience().stream()
                .flatMap(experience -> experience.getResponsibilities() != null
                        ? experience.getResponsibilities().stream()
                        : Stream.empty())
                .anyMatch(responsibility -> responsibility.matches(".*\\d+.*"));
    }
}
