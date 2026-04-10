package ai.applysmart.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

/**
 * Utility class for pagination operations.
 */
public final class PaginationUtils {

    private PaginationUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    private static final int DEFAULT_PAGE_SIZE = 20;
    private static final int MAX_PAGE_SIZE = 100;

    /**
     * Create pageable from optional page and size parameters.
     * Applies default values and max size constraints.
     *
     * @param page page number (nullable)
     * @param size page size (nullable)
     * @return Pageable instance
     */
    public static Pageable createPageable(Integer page, Integer size) {
        int pageNum = page != null ? Math.max(0, page) : 0;
        int pageSize = size != null ? Math.min(Math.max(1, size), MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE;
        return PageRequest.of(pageNum, pageSize);
    }

    /**
     * Check if pagination parameters are provided.
     *
     * @param page page number (nullable)
     * @param size page size (nullable)
     * @return true if either parameter is provided
     */
    public static boolean isPaginationRequested(Integer page, Integer size) {
        return page != null || size != null;
    }

    /**
     * Get default page size.
     *
     * @return default page size
     */
    public static int getDefaultPageSize() {
        return DEFAULT_PAGE_SIZE;
    }

    /**
     * Get maximum allowed page size.
     *
     * @return maximum page size
     */
    public static int getMaxPageSize() {
        return MAX_PAGE_SIZE;
    }
}
