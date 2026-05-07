package ai.applysmart.service.resume;

import ai.applysmart.dto.resume.ResumeOptimizationDto;
import ai.applysmart.entity.Resume;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResumeOptimizationArtifacts {
    private ResumeOptimizationDto optimization;
    private Resume optimizedResume;
}
