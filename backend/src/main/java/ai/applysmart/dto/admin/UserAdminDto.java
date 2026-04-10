package ai.applysmart.dto.admin;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserAdminDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private Boolean enabled;
    private Boolean emailVerified;
    private Boolean twoFactorEnabled;
    private String authProvider;
    private String plan;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long resumeCount;
    private Long coverLetterCount;
    private Long jobCount;
}
