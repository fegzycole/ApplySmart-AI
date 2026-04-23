package ai.applysmart.service.file;

import org.springframework.web.multipart.MultipartFile;

public interface FileParserService {

    String extractTextFromFile(MultipartFile file);
}
