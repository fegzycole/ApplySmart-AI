package ai.applysmart.service.resume;

import ai.applysmart.exception.BadRequestException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResumeOptimizationCoverLetterTargetResolver {

    private final ResumeOptimizationJobDescriptionParser jobDescriptionParser;

    public ResumeOptimizationCoverLetterTargetResolver(ResumeOptimizationJobDescriptionParser jobDescriptionParser) {
        this.jobDescriptionParser = jobDescriptionParser;
    }

    public ResumeOptimizationJobTarget resolve(String jobDescription) {
        String company = jobDescriptionParser.extractCompanyName(jobDescription).orElse(null);
        String position = jobDescriptionParser.extractPositionTitle(jobDescription).orElse(null);

        if (company != null && position != null) {
            return new ResumeOptimizationJobTarget(company, position);
        }

        List<String> missingFields = new ArrayList<>();
        if (company == null) {
            missingFields.add("company");
        }
        if (position == null) {
            missingFields.add("position");
        }

        throw new BadRequestException(
                "Could not infer the " + String.join(" and ", missingFields)
                        + " from the job description. Please use a job description that clearly includes both."
        );
    }
}
