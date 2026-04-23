package ai.applysmart.service.resume;

import ai.applysmart.exception.BadRequestException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ResumeFileValidator {

    private static final String PDF_CONTENT_TYPE = "application/pdf";

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
        if (jobDescription == null || jobDescription.isBlank()) {
            throw new BadRequestException("Job description is required");
        }
    }

    public void requireBuiltResumePdf(MultipartFile file) {
        requireNonEmptyFile(file);
        if (!PDF_CONTENT_TYPE.equals(file.getContentType())) {
            throw new BadRequestException("Only PDF files are allowed");
        }
    }

    private void requireNonEmptyFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("File is empty");
        }
    }
}
