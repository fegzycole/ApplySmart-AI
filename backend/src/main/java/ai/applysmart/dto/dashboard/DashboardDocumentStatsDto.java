package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardDocumentStatsDto {
    private Long totalResumes;
    private Long originalResumes;
    private Long optimizedResumes;
    private Long builtResumes;
    private Long coverLetters;
}
