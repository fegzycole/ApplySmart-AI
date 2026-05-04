package ai.applysmart.dto.resume;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RenderResumePdfRequest {

    private String name;

    @NotNull
    private ResumeTemplate template;

    @Valid
    @NotNull
    private ParsedResumeDto resumeData;
}
