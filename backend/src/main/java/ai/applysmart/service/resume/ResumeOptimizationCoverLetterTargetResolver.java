package ai.applysmart.service.resume;

import ai.applysmart.exception.BadRequestException;
import ai.applysmart.util.TextUtils;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ResumeOptimizationCoverLetterTargetResolver {

    static final String DEFAULT_COMPANY_NAME = "Hiring Team";

    private final ResumeOptimizationJobDescriptionParser jobDescriptionParser;

    public ResumeOptimizationCoverLetterTargetResolver(ResumeOptimizationJobDescriptionParser jobDescriptionParser) {
        this.jobDescriptionParser = jobDescriptionParser;
    }

    public ResumeOptimizationJobTarget resolve(String jobDescription) {
        String company = jobDescriptionParser.extractCompanyName(jobDescription).orElse(null);
        String position = jobDescriptionParser.extractPositionTitle(jobDescription).orElse(null);

        if (company == null || position == null) {
            Optional<ResumeOptimizationJobTarget> aiTarget = jobDescriptionParser.extractTargetWithAI(jobDescription);
            if (aiTarget.isPresent()) {
                ResumeOptimizationJobTarget target = aiTarget.get();
                company = company != null ? company : TextUtils.trimToNull(target.company());
                position = position != null ? position : TextUtils.trimToNull(target.position());
            }
        }

        if (position == null) {
            throw new BadRequestException(
                    "Could not infer the position from the job description. Please use a job description that clearly includes the role title."
            );
        }

        return new ResumeOptimizationJobTarget(
                company != null ? company : DEFAULT_COMPANY_NAME,
                position
        );
    }
}
