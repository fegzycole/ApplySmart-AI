package ai.applysmart.util;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.exception.UnauthorizedException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ControllerUtilsTest {

    @Test
    void extractBearerTokenReturnsTokenValue() {
        assertEquals("abc.def.ghi", ControllerUtils.extractBearerToken("Bearer abc.def.ghi"));
    }

    @Test
    void extractBearerTokenRejectsMissingBearerPrefix() {
        assertThrows(UnauthorizedException.class, () -> ControllerUtils.extractBearerToken(null));
        assertThrows(UnauthorizedException.class, () -> ControllerUtils.extractBearerToken("Basic abc.def.ghi"));
    }

    @Test
    void successResponseBuildsStandardEnvelope() {
        ApiResponse<Void> response = ControllerUtils.successResponse("Saved");

        assertTrue(response.getSuccess());
        assertEquals("Saved", response.getMessage());
    }
}
