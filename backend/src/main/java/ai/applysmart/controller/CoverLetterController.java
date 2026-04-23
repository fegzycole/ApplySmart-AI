package ai.applysmart.controller;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.coverletter.CoverLetterResponseDto;
import ai.applysmart.dto.coverletter.UpdateCoverLetterRequest;
import ai.applysmart.dto.resume.CoverLetterDto;
import ai.applysmart.entity.User;
import ai.applysmart.service.coverletter.CoverLetterService;
import ai.applysmart.util.ControllerUtils;
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

@Slf4j
@RestController
@RequestMapping("/api/v1/cover-letters")
@RequiredArgsConstructor
@Tag(name = "Cover Letters", description = "Cover letter management and AI generation endpoints")
public class CoverLetterController {

    private final CoverLetterService coverLetterService;

    @PostMapping("/generate")
    @Operation(summary = "Generate a new cover letter using AI")
    public ResponseEntity<CoverLetterResponseDto> generateCoverLetter(
            @Valid @RequestBody CoverLetterRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Generate cover letter request from user: {} for company: {}", user.getId(), request.getCompany());
        CoverLetterResponseDto coverLetter = coverLetterService.generateCoverLetter(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(coverLetter);
    }

    @PostMapping(value = "/generate-from-file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Generate cover letter from resume file with customizable tone")
    public ResponseEntity<CoverLetterDto> generateCoverLetterFromFile(
            @RequestPart(value = "resume", required = false) MultipartFile resumeFile,
            @RequestPart("jobDescription") String jobDescription,
            @RequestPart(value = "companyName", required = false) String companyName,
            @RequestPart(value = "positionTitle", required = false) String positionTitle,
            @RequestPart(value = "tone", required = false) String tone,
            @RequestPart(value = "keyAchievements", required = false) String keyAchievements,
            @AuthenticationPrincipal User user) {
        log.info("Generate cover letter from file request from user: {} for company: {}, position: {}",
                 user.getId(), companyName, positionTitle);
        CoverLetterDto coverLetter = coverLetterService.generateCoverLetter(
                resumeFile, jobDescription, companyName, positionTitle, tone, keyAchievements, user);
        return ResponseEntity.ok(coverLetter);
    }

    @GetMapping
    @Operation(summary = "Get all cover letters for authenticated user with pagination support")
    public ResponseEntity<?> getAllCoverLetters(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        log.info("Get all cover letters request from user: {} (page: {}, size: {})", user.getId(), page, size);
        return ControllerUtils.handlePaginatedRequest(
                page,
                size,
                pageable -> coverLetterService.getAllCoverLetters(user, pageable),
                () -> coverLetterService.getAllCoverLetters(user)
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get cover letter by ID")
    public ResponseEntity<CoverLetterResponseDto> getCoverLetterById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        log.info("Get cover letter {} request from user: {}", id, user.getId());
        CoverLetterResponseDto coverLetter = coverLetterService.getCoverLetterById(id, user);
        return ResponseEntity.ok(coverLetter);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Update cover letter")
    public ResponseEntity<CoverLetterResponseDto> updateCoverLetter(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCoverLetterRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Update cover letter {} request from user: {}", id, user.getId());
        CoverLetterResponseDto coverLetter = coverLetterService.updateCoverLetter(id, request, user);
        return ResponseEntity.ok(coverLetter);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete cover letter")
    public ResponseEntity<ApiResponse<Void>> deleteCoverLetter(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        log.info("Delete cover letter {} request from user: {}", id, user.getId());
        coverLetterService.deleteCoverLetter(id, user);
        return ResponseEntity.ok(ControllerUtils.successResponse("Cover letter deleted successfully"));
    }

    @PostMapping("/{id}/regenerate")
    @Operation(summary = "Regenerate an existing cover letter with new parameters")
    public ResponseEntity<CoverLetterResponseDto> regenerateCoverLetter(
            @PathVariable Long id,
            @Valid @RequestBody CoverLetterRequest request,
            @AuthenticationPrincipal User user) {
        log.info("Regenerate cover letter {} request from user: {}", id, user.getId());
        CoverLetterResponseDto coverLetter = coverLetterService.regenerateCoverLetter(id, request, user);
        return ResponseEntity.ok(coverLetter);
    }
}
