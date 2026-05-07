package ai.applysmart.service.resume;

import ai.applysmart.dto.resume.*;
import ai.applysmart.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResumeService {
    List<ResumeDto> getAllResumes(User user);
    Page<ResumeDto> getAllResumes(User user, Pageable pageable, String query, String documentKind);
    ResumeDto getResumeById(Long id, User user);
    void deleteResume(Long id, User user);
    ResumeAnalysisDto analyzeResume(Long id, String jobDescription, User user);
    ResumeOptimizationDto optimizeResume(Long id, OptimizeResumeRequest request, User user);
    ResumeDto uploadResumeFile(MultipartFile file, User user);
    ResumeOptimizationDto optimizeUploadedFile(MultipartFile file, OptimizeResumeRequest request, User user);
    ResumeDto buildResumeFromData(BuildResumeFromDataRequest request, User user);
    byte[] renderResumePdf(RenderResumePdfRequest request, User user);
}
