package ai.applysmart.controller;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.dto.resume.*;
import ai.applysmart.entity.User;
import ai.applysmart.service.ResumeService;
import ai.applysmart.util.PaginationUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
@Tag(name = "Resumes", description = "Resume management and AI optimization endpoints")
public class ResumeController {

    private final ResumeService resumeService;

    @GetMapping
    @Operation(summary = "Get all resumes for authenticated user with pagination support")
    public ResponseEntity<?> getAllResumes(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        log.info("Get all resumes request from user: {} (page: {}, size: {})", user.getId(), page, size);

        if (PaginationUtils.isPaginationRequested(page, size)) {
            Pageable pageable = PaginationUtils.createPageable(page, size);
            Page<ResumeDto> resumePage = resumeService.getAllResumes(user, pageable);
            return ResponseEntity.ok(resumePage);
        }

        List<ResumeDto> resumes = resumeService.getAllResumes(user);
        return ResponseEntity.ok(resumes);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get resume by ID")
    public ResponseEntity<ResumeDto> getResumeById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        log.info("Get resume {} request from user: {}", id, user.getId());
        ResumeDto resume = resumeService.getResumeById(id, user);
        return ResponseEntity.ok(resume);
    }

    @PostMapping
    @Operation(summary = "Create new resume")
    public ResponseEntity<ResumeDto> createResume(
            @Valid @RequestBody CreateResumeRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Create resume request from user: {}", user.getId());
        ResumeDto resume = resumeService.createResume(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(resume);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Update resume")
    public ResponseEntity<ResumeDto> updateResume(
            @PathVariable Long id,
            @Valid @RequestBody UpdateResumeRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Update resume {} request from user: {}", id, user.getId());
        ResumeDto resume = resumeService.updateResume(id, request, user);
        return ResponseEntity.ok(resume);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete resume")
    public ResponseEntity<ApiResponse<Void>> deleteResume(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        log.info("Delete resume {} request from user: {}", id, user.getId());
        resumeService.deleteResume(id, user);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Resume deleted successfully")
                        .build()
        );
    }

    @PostMapping("/{id}/analyze")
    @Operation(summary = "Analyze resume with AI")
    public ResponseEntity<ResumeAnalysisDto> analyzeResume(
            @PathVariable Long id,
            @RequestParam(required = false) String jobDescription,
            @AuthenticationPrincipal User user) {
        log.info("Analyze resume {} request from user: {}", id, user.getId());
        ResumeAnalysisDto analysis = resumeService.analyzeResume(id, jobDescription, user);
        return ResponseEntity.ok(analysis);
    }

    @PostMapping("/{id}/optimize")
    @Operation(summary = "Optimize resume for job description")
    public ResponseEntity<ResumeOptimizationDto> optimizeResume(
            @PathVariable Long id,
            @Valid @RequestBody OptimizeResumeRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Optimize resume {} request from user: {}", id, user.getId());
        ResumeOptimizationDto optimization = resumeService.optimizeResume(id, request, user);
        return ResponseEntity.ok(optimization);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload resume file (PDF, DOCX, or TXT)")
    public ResponseEntity<ResumeDto> uploadResumeFile(
            @RequestPart("file") MultipartFile file,
            @AuthenticationPrincipal User user) {
        log.info("Upload resume file request from user: {}", user.getId());
        ResumeDto resume = resumeService.uploadResumeFile(file, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(resume);
    }

    @PostMapping(value = "/optimize-upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload and optimize resume file for job description with template selection")
    public ResponseEntity<ResumeOptimizationDto> optimizeUploadedFile(
            @RequestPart("file") MultipartFile file,
            @RequestPart("jobDescription") String jobDescription,
            @RequestParam(required = false, defaultValue = "MODERN") String template,
            @AuthenticationPrincipal User user) {
        log.info("Optimize uploaded file request from user: {} - File: {}, Job desc length: {}, Template: {}",
                user.getId(), file.getOriginalFilename(), jobDescription.length(), template);

        try {
            ResumeOptimizationDto optimization = resumeService.optimizeUploadedFile(file, jobDescription, template, user);
            log.info("Successfully completed optimization for user: {}. Returning response with {} changes",
                    user.getId(), optimization.getChanges().size());
            return ResponseEntity.ok(optimization);
        } catch (Exception e) {
            log.error("Error during optimization for user: {}", user.getId(), e);
            throw e;
        }
    }
}
