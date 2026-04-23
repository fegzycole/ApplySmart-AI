package ai.applysmart.service.file;

import ai.applysmart.dto.file.FileUploadResult;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    FileUploadResult uploadFile(MultipartFile file);

    FileUploadResult uploadFileBytes(byte[] fileBytes, String filename);

    void deleteFile(String publicId);
}
