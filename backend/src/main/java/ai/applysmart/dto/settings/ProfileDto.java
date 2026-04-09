package ai.applysmart.dto.settings;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileDto {
    private String email;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private Boolean emailVerified;
    private String authProvider;
}
