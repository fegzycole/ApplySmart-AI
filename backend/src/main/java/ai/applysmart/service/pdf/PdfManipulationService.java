package ai.applysmart.service.pdf;

import org.springframework.web.multipart.MultipartFile;

public interface PdfManipulationService {

    String extractText(MultipartFile file);

    byte[] replaceTextInPdf(MultipartFile file, String originalText, String optimizedText);
}
