package ai.applysmart.service.resume;

import ai.applysmart.exception.BadRequestException;
import ai.applysmart.validation.JobDescriptionValidationRules;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ResumeFileValidator {

    public String requireUploadableFile(MultipartFile file) {
        requireNonEmptyFile(file);

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            throw new BadRequestException("Invalid file name");
        }

        return originalFilename;
    }

    public void requireOptimizationInput(MultipartFile file, String jobDescription) {
        requireNonEmptyFile(file);
        String validationError = JobDescriptionValidationRules.findValidationError(jobDescription);
        if (validationError != null) {
            throw new BadRequestException(validationError);
        }
    }

    public void requireBuiltResumePdf(byte[] fileBytes, String name) {
        if (fileBytes == null || fileBytes.length == 0) {
            throw new BadRequestException("File is empty");
        }

        if (name == null || name.isBlank()) {
            throw new BadRequestException("Resume name is required");
        }
    }

    private void requireNonEmptyFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("File is empty");
        }
    }
}
