package ai.applysmart.dto.resume;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CoverLetterDto {
    private String content;
    private String pdfUrl;
}
