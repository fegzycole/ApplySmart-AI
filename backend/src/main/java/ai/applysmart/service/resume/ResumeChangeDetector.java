package ai.applysmart.service.resume;

import ai.applysmart.dto.resume.ParsedResumeDto;

import java.util.List;

public interface ResumeChangeDetector {

    List<String> detectChanges(ParsedResumeDto original, ParsedResumeDto optimized);
}
