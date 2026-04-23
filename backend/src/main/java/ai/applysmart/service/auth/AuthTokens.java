package ai.applysmart.service.auth;

import ai.applysmart.entity.User;

public record AuthTokens(String accessToken, String refreshToken, User user) {
}
