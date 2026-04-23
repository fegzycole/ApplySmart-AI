package ai.applysmart.service.scoring;

import ai.applysmart.dto.resume.ParsedResumeDto;
import org.springframework.stereotype.Component;

@Component
public class ResumeTextExtractor {

    public String extract(ParsedResumeDto resume) {
        StringBuilder text = new StringBuilder();

        appendIfPresent(text, resume.getSummary());
        appendSkills(text, resume);
        appendWorkExperience(text, resume);

        return text.toString();
    }

    private void appendIfPresent(StringBuilder builder, String value) {
        if (value != null && !value.isEmpty()) {
            builder.append(value).append(" ");
        }
    }

    private void appendSkills(StringBuilder builder, ParsedResumeDto resume) {
        if (resume.getSkills() != null) {
            builder.append(String.join(" ", resume.getSkills())).append(" ");
        }
    }

    private void appendWorkExperience(StringBuilder builder, ParsedResumeDto resume) {
        if (resume.getWorkExperience() == null) {
            return;
        }

        resume.getWorkExperience().forEach(experience -> {
            appendIfPresent(builder, experience.getPosition());
            if (experience.getResponsibilities() != null) {
                builder.append(String.join(" ", experience.getResponsibilities())).append(" ");
            }
        });
    }
}
