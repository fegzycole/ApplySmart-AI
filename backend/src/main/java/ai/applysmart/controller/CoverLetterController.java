package ai.applysmart.controller;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.coverletter.CoverLetterResponseDto;
import ai.applysmart.dto.coverletter.UpdateCoverLetterRequest;
import ai.applysmart.entity.User;
import ai.applysmart.service.CoverLetterService;
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

    @GetMapping
    @Operation(summary = "Get all cover letters for authenticated user")
    public ResponseEntity<List<CoverLetterResponseDto>> getAllCoverLetters(@AuthenticationPrincipal User user) {
        log.info("Get all cover letters request from user: {}", user.getId());
        List<CoverLetterResponseDto> coverLetters = coverLetterService.getAllCoverLetters(user);
        return ResponseEntity.ok(coverLetters);
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
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Cover letter deleted successfully")
                        .build()
        );
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
