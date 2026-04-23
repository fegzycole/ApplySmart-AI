package ai.applysmart.controller;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.dto.job.CreateJobRequest;
import ai.applysmart.dto.job.JobDto;
import ai.applysmart.dto.job.UpdateJobRequest;
import ai.applysmart.entity.User;
import ai.applysmart.service.job.JobService;
import ai.applysmart.util.ControllerUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Tag(name = "Jobs", description = "Job application tracking endpoints")
public class JobController {

    private final JobService jobService;

    @PostMapping
    @Operation(summary = "Create a new job application")
    public ResponseEntity<JobDto> createJob(
            @Valid @RequestBody CreateJobRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Create job request from user: {} for company: {}", user.getId(), request.getCompany());
        JobDto job = jobService.createJob(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(job);
    }

    @GetMapping
    @Operation(summary = "Get all job applications for authenticated user with pagination support")
    public ResponseEntity<?> getAllJobs(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        log.info("Get all jobs request from user: {} (page: {}, size: {})", user.getId(), page, size);
        return ControllerUtils.handlePaginatedRequest(
                page,
                size,
                pageable -> jobService.getAllJobs(user, pageable),
                () -> jobService.getAllJobs(user)
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get job application by ID")
    public ResponseEntity<JobDto> getJobById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        log.info("Get job {} request from user: {}", id, user.getId());
        JobDto job = jobService.getJobById(id, user);
        return ResponseEntity.ok(job);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Update job application")
    public ResponseEntity<JobDto> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody UpdateJobRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Update job {} request from user: {}", id, user.getId());
        JobDto job = jobService.updateJob(id, request, user);
        return ResponseEntity.ok(job);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete job application")
    public ResponseEntity<ApiResponse<Void>> deleteJob(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        log.info("Delete job {} request from user: {}", id, user.getId());
        jobService.deleteJob(id, user);
        return ResponseEntity.ok(ControllerUtils.successResponse("Job deleted successfully"));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get job applications by status")
    public ResponseEntity<List<JobDto>> getJobsByStatus(
            @PathVariable String status,
            @AuthenticationPrincipal User user) {
        log.info("Get jobs with status {} request from user: {}", status, user.getId());
        List<JobDto> jobs = jobService.getJobsByStatus(status, user);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/search")
    @Operation(summary = "Search job applications")
    public ResponseEntity<List<JobDto>> searchJobs(
            @RequestParam(required = false) String q,
            @AuthenticationPrincipal User user) {
        log.info("Search jobs request from user: {} with query: {}", user.getId(), q);
        List<JobDto> jobs = jobService.searchJobs(q, user);
        return ResponseEntity.ok(jobs);
    }
}
