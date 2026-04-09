package ai.applysmart.controller;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.dto.resume.*;
import ai.applysmart.entity.User;
import ai.applysmart.service.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    @Operation(summary = "Get all resumes for authenticated user")
    public ResponseEntity<List<ResumeDto>> getAllResumes(@AuthenticationPrincipal User user) {
        log.info("Get all resumes request from user: {}", user.getId());
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
    @Operation(summary = "Upload and optimize resume file for job description")
    public ResponseEntity<ResumeOptimizationDto> optimizeUploadedFile(
            @RequestPart("file") MultipartFile file,
            @RequestPart("jobDescription") String jobDescription,
            @AuthenticationPrincipal User user) {
        log.info("Optimize uploaded file request from user: {}", user.getId());
        ResumeOptimizationDto optimization = resumeService.optimizeUploadedFile(file, jobDescription, user);
        return ResponseEntity.ok(optimization);
    }

    @PostMapping(value = "/cover-letter", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Generate cover letter for job application with customizable tone")
    public ResponseEntity<CoverLetterDto> generateCoverLetter(
            @RequestPart(value = "resume", required = false) MultipartFile resumeFile,
            @RequestPart("jobDescription") String jobDescription,
            @RequestPart(value = "companyName", required = false) String companyName,
            @RequestPart(value = "positionTitle", required = false) String positionTitle,
            @RequestPart(value = "tone", required = false) String tone,
            @RequestPart(value = "keyAchievements", required = false) String keyAchievements,
            @AuthenticationPrincipal User user) {
        log.info("Generate cover letter request from user: {} for company: {}, position: {}",
                 user.getId(), companyName, positionTitle);
        CoverLetterDto coverLetter = resumeService.generateCoverLetter(
                resumeFile, jobDescription, companyName, positionTitle, tone, keyAchievements, user);
        return ResponseEntity.ok(coverLetter);
    }
}
