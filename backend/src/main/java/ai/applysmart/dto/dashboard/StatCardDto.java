package ai.applysmart.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatCardDto {
    private String title;
    private String value;
    private String change;
    private String trend; // up, down, neutral
    private String icon;
}
