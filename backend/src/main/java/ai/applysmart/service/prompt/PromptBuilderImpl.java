package ai.applysmart.service.prompt;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.exception.PromptBuildingException;
import ai.applysmart.util.TextUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static ai.applysmart.service.prompt.PromptConstants.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PromptBuilderImpl implements PromptBuilder {

    private final ObjectMapper objectMapper;
    private final AnalysisInstructionsBuilder analysisInstructionsBuilder;
    private final SimpleOptimizationInstructionsBuilder simpleOptimizationBuilder;
    private final OptimizationInstructionsBuilder optimizationInstructionsBuilder;
    private final CoverLetterInstructionsBuilder coverLetterInstructionsBuilder;

    @Override
    public String buildAnalysisPrompt(String resumeContent, String jobDescription) {
        StringBuilder prompt = new StringBuilder()
            .append(RESUME_REVIEWER_ROLE)
            .append("Analyze the following resume and provide a comprehensive assessment.\n\n")
            .append(RESUME_HEADER).append(resumeContent).append("\n\n");

        if (TextUtils.isNotBlank(jobDescription)) {
            prompt.append(JOB_DESCRIPTION_HEADER).append(jobDescription).append("\n\n")
                  .append("Analyze how well this resume matches the job requirements.\n\n");
        }

        return prompt.append(analysisInstructionsBuilder.build()).toString();
    }

    @Override
    public String buildOptimizationPrompt(String resumeContent, String jobDescription) {
        return new StringBuilder()
            .append(RESUME_WRITER_ROLE)
            .append("Optimize the following resume for the job description provided.\n\n")
            .append(ORIGINAL_RESUME_HEADER).append(resumeContent).append("\n\n")
            .append(TARGET_JOB_HEADER).append(jobDescription).append("\n\n")
            .append(simpleOptimizationBuilder.build())
            .toString();
    }

    @Override
    public String buildStructuredOptimizationPrompt(ParsedResumeDto resumeData, String jobDescription) {
        try {
            String resumeJson = serializeResumeData(resumeData);

            return new StringBuilder()
                .append(RESUME_WRITER_ROLE)
                .append("Optimize the following structured resume data for the job description provided.\n\n")
                .append(ORIGINAL_RESUME_DATA_HEADER).append(resumeJson).append("\n\n")
                .append(TARGET_JOB_HEADER).append(jobDescription).append("\n\n")
                .append(optimizationInstructionsBuilder.buildFullInstructions())
                .toString();
        } catch (Exception e) {
            log.error("Failed to serialize resume data for prompt", e);
            throw new PromptBuildingException("Failed to build structured optimization prompt", e);
        }
    }

    private String serializeResumeData(ParsedResumeDto resumeData) throws Exception {
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(resumeData);
    }

    @Override
    public String buildCoverLetterPrompt(String resumeContent, String jobDescription,
                                        String company, String position, String tone,
                                        String keyAchievements) {
        StringBuilder prompt = new StringBuilder()
            .append(COVER_LETTER_WRITER_ROLE)
            .append("Generate a professional, compelling cover letter.\n\n");

        appendIfPresent(prompt, "RESUME CONTEXT", resumeContent);
        prompt.append(JOB_DESCRIPTION_HEADER).append(jobDescription).append("\n\n");
        appendIfPresent(prompt, "COMPANY NAME", company);
        appendIfPresent(prompt, "POSITION TITLE", position);
        appendIfPresent(prompt, "DESIRED TONE", tone);
        appendIfPresent(prompt, "KEY ACHIEVEMENTS TO HIGHLIGHT", keyAchievements);

        return prompt.append(coverLetterInstructionsBuilder.build(tone)).toString();
    }


    private void appendIfPresent(StringBuilder prompt, String label, String value) {
        if (TextUtils.isNotBlank(value)) {
            prompt.append(label).append(":\n").append(value).append("\n\n");
        }
    }
}
