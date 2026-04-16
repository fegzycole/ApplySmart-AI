package ai.applysmart.util;

import ai.applysmart.dto.common.ApiResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.function.Function;

/**
 * Utility class for common controller operations.
 */
public final class ControllerUtils {

    private ControllerUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    /**
     * Handle paginated or non-paginated list retrieval.
     * Returns paginated response if pagination parameters are provided, otherwise returns full list.
     *
     * @param page optional page number
     * @param size optional page size
     * @param paginatedSupplier function to get paginated results
     * @param listSupplier function to get full list
     * @param <T> the type of items in the list
     * @return ResponseEntity with either Page or List
     */
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

    /**
     * Create a success ApiResponse for delete operations.
     *
     * @param message success message
     * @param <T> the type parameter (usually Void)
     * @return ApiResponse with success message
     */
    public static <T> ApiResponse<T> createDeleteSuccessResponse(String message) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .build();
    }
}
