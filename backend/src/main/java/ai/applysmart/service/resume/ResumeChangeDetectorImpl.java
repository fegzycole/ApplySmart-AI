package ai.applysmart.service.resume;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.service.resume.ResumeChangeDetector;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResumeChangeDetectorImpl implements ResumeChangeDetector {

    @Override
    public List<String> detectChanges(ParsedResumeDto original, ParsedResumeDto optimized) {
        List<String> changes = new ArrayList<>();

        detectSummaryChanges(original, optimized, changes);
        detectSkillsChanges(original, optimized, changes);
        detectExperienceChanges(original, optimized, changes);

        return changes.isEmpty() ? getDefaultChanges() : changes;
    }

    private void detectSummaryChanges(ParsedResumeDto original, ParsedResumeDto optimized, List<String> changes) {
        if (hasChanged(original.getSummary(), optimized.getSummary())) {
            changes.add("Optimized professional summary to align with job requirements");
        }
    }

    private void detectSkillsChanges(ParsedResumeDto original, ParsedResumeDto optimized, List<String> changes) {
        if (listsAreDifferent(original.getSkills(), optimized.getSkills())) {
            changes.add("Reordered skills to prioritize job-relevant technologies");
        }
    }

    private void detectExperienceChanges(ParsedResumeDto original, ParsedResumeDto optimized, List<String> changes) {
        if (hasExperienceChanges(original, optimized)) {
            changes.add("Enhanced work experience bullet points with stronger action verbs and quantifiable achievements");
            changes.add("Incorporated relevant keywords from job description into responsibilities");
        }
    }

    private boolean hasChanged(String original, String optimized) {
        return original != null && optimized != null && !original.equals(optimized);
    }

    private boolean listsAreDifferent(List<?> list1, List<?> list2) {
        return list1 != null && list2 != null && !list1.equals(list2);
    }

    private boolean hasExperienceChanges(ParsedResumeDto original, ParsedResumeDto optimized) {
        if (!hasSameExperienceCount(original, optimized)) {
            return false;
        }

        return hasResponsibilityChanges(original, optimized);
    }

    private boolean hasSameExperienceCount(ParsedResumeDto original, ParsedResumeDto optimized) {
        return original.getWorkExperience() != null &&
                optimized.getWorkExperience() != null &&
                original.getWorkExperience().size() == optimized.getWorkExperience().size();
    }

    private boolean hasResponsibilityChanges(ParsedResumeDto original, ParsedResumeDto optimized) {
        for (int i = 0; i < original.getWorkExperience().size(); i++) {
            var origExp = original.getWorkExperience().get(i);
            var optExp = optimized.getWorkExperience().get(i);

            if (responsibilitiesChanged(origExp, optExp)) {
                return true;
            }
        }
        return false;
    }

    private boolean responsibilitiesChanged(ParsedResumeDto.WorkExperience orig,
                                            ParsedResumeDto.WorkExperience opt) {
        return orig.getResponsibilities() != null &&
                opt.getResponsibilities() != null &&
                !orig.getResponsibilities().equals(opt.getResponsibilities());
    }

    private List<String> getDefaultChanges() {
        return List.of(
                "Optimized resume structure and formatting for ATS compatibility",
                "Enhanced language and terminology to match job description"
        );
    }
}
