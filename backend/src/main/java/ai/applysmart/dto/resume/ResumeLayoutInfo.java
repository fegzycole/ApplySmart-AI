package ai.applysmart.dto.resume;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeLayoutInfo {
    private String primaryFont;
    private String secondaryFont;
    private String primaryColor;
    private String accentColor;
    private List<String> detectedFonts;
    private Map<String, Integer> fontUsageCount;
    private Double averageFontSize;
    private Double headingFontSize;
    private String backgroundColor;
    private Boolean hasMultipleColumns;
    private Integer lineSpacing;
}
