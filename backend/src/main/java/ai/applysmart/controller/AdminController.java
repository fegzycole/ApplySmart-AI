package ai.applysmart.controller;

import ai.applysmart.dto.admin.AnalyticsDto;
import ai.applysmart.dto.admin.UserAdminDto;
import ai.applysmart.entity.User;
import ai.applysmart.service.AdminService;
import ai.applysmart.util.PaginationUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin panel endpoints for user management and analytics")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all users (admin only)", description = "Retrieve all users with their statistics. Supports pagination.")
    public ResponseEntity<?> getAllUsers(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        log.info("Get all users request from admin: {} (page: {}, size: {})", user.getId(), page, size);

        if (PaginationUtils.isPaginationRequested(page, size)) {
            Pageable pageable = PaginationUtils.createPageable(page, size);
            Page<UserAdminDto> userPage = adminService.getAllUsers(pageable);
            return ResponseEntity.ok(userPage);
        }

        List<UserAdminDto> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get admin analytics (admin only)", description = "Retrieve comprehensive analytics including user growth, subscriptions, and AI usage statistics")
    public ResponseEntity<AnalyticsDto> getAnalytics(@AuthenticationPrincipal User user) {
        log.info("Get analytics request from admin: {}", user.getId());
        AnalyticsDto analytics = adminService.getAnalytics();
        return ResponseEntity.ok(analytics);
    }
}
