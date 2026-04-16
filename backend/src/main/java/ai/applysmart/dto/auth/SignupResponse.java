package ai.applysmart.dto.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for signup response containing user information and verification status.
 * Does not include authentication tokens - users must verify email and login.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SignupResponse {
    private boolean success;
    private String message;
    private UserDto user;
}
