package ai.applysmart.service.scoring;

import ai.applysmart.dto.resume.ParsedResumeDto;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ResumeQualityScorerTest {

    private final ResumeQualityScorer scorer = new ResumeQualityScorer();

    @Test
    void calculateExperienceBonusReturnsConfiguredBonusWhenExperienceExists() {
        ParsedResumeDto resume = ParsedResumeDto.builder()
                .workExperience(List.of(ParsedResumeDto.WorkExperience.builder().build()))
                .build();

        assertEquals(15, scorer.calculateExperienceBonus(resume));
    }

    @Test
    void calculateContentQualityBonusRewardsSummaryHistoryAndQuantifiedAchievements() {
        ParsedResumeDto resume = ParsedResumeDto.builder()
                .summary("Senior backend engineer with extensive experience building reliable distributed systems.")
                .workExperience(List.of(
                        ParsedResumeDto.WorkExperience.builder()
                                .responsibilities(List.of("Reduced processing time by 35%"))
                                .build(),
                        ParsedResumeDto.WorkExperience.builder()
                                .responsibilities(List.of("Led platform reliability improvements"))
                                .build()
                ))
                .build();

        assertEquals(8, scorer.calculateContentQualityBonus(resume));
    }
}
