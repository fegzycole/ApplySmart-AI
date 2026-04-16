package ai.applysmart.controller;

import ai.applysmart.dto.dashboard.*;
import ai.applysmart.entity.User;
import ai.applysmart.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Dashboard analytics and statistics endpoints")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    @Operation(summary = "Get complete dashboard data")
    public ResponseEntity<DashboardDataDto> getDashboardData(@AuthenticationPrincipal User user) {
        log.info("Get dashboard data request from user: {}", user.getId());
        DashboardDataDto dashboard = dashboardService.getDashboardData(user);
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/stats")
    @Operation(summary = "Get dashboard statistics cards")
    public ResponseEntity<List<StatCardDto>> getStats(@AuthenticationPrincipal User user) {
        log.info("Get dashboard stats request from user: {}", user.getId());
        List<StatCardDto> stats = dashboardService.getStats(user);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/recent-applications")
    @Operation(summary = "Get recent job applications")
    public ResponseEntity<List<RecentApplicationDto>> getRecentApplications(@AuthenticationPrincipal User user) {
        log.info("Get recent applications request from user: {}", user.getId());
        List<RecentApplicationDto> applications = dashboardService.getRecentApplications(user);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/funnel")
    @Operation(summary = "Get application funnel data")
    public ResponseEntity<List<FunnelStageDto>> getFunnelData(@AuthenticationPrincipal User user) {
        log.info("Get funnel data request from user: {}", user.getId());
        List<FunnelStageDto> funnel = dashboardService.getFunnelData(user);
        return ResponseEntity.ok(funnel);
    }

    @GetMapping("/metrics")
    @Operation(summary = "Get conversion metrics")
    public ResponseEntity<List<ConversionMetricDto>> getMetrics(@AuthenticationPrincipal User user) {
        log.info("Get metrics request from user: {}", user.getId());
        List<ConversionMetricDto> metrics = dashboardService.getMetrics(user);
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/success-metrics")
    @Operation(summary = "Get success metrics trend data")
    public ResponseEntity<List<SuccessMetricDto>> getSuccessMetrics(@AuthenticationPrincipal User user) {
        log.info("Get success metrics request from user: {}", user.getId());
        List<SuccessMetricDto> metrics = dashboardService.getSuccessMetrics(user);
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/application-velocity")
    @Operation(summary = "Get application velocity data")
    public ResponseEntity<List<ApplicationVelocityDto>> getApplicationVelocity(@AuthenticationPrincipal User user) {
        log.info("Get application velocity request from user: {}", user.getId());
        List<ApplicationVelocityDto> velocity = dashboardService.getApplicationVelocity(user);
        return ResponseEntity.ok(velocity);
    }
}
