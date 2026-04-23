package ai.applysmart.util;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.exception.UnauthorizedException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.function.Function;

public final class ControllerUtils {

    private static final String BEARER_PREFIX = "Bearer ";

    private ControllerUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    public static <T> ResponseEntity<?> handlePaginatedRequest(
            Integer page,
            Integer size,
            Function<Pageable, Page<T>> paginatedSupplier,
            java.util.function.Supplier<List<T>> listSupplier) {

        if (PaginationUtils.isPaginationRequested(page, size)) {
            Pageable pageable = PaginationUtils.createPageable(page, size);
            Page<T> resultPage = paginatedSupplier.apply(pageable);
            return ResponseEntity.ok(resultPage);
        }

        List<T> results = listSupplier.get();
        return ResponseEntity.ok(results);
    }

    public static <T> ApiResponse<T> successResponse(String message) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .build();
    }

    public static String extractBearerToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith(BEARER_PREFIX)) {
            throw new UnauthorizedException("Missing bearer token");
        }

        return authorizationHeader.substring(BEARER_PREFIX.length());
    }
}
