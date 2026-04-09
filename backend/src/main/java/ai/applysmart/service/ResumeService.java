package ai.applysmart.service;

import ai.applysmart.dto.resume.*;
import ai.applysmart.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResumeService {
    List<ResumeDto> getAllResumes(User user);
    ResumeDto getResumeById(Long id, User user);
    ResumeDto createResume(CreateResumeRequest request, User user);
    ResumeDto updateResume(Long id, UpdateResumeRequest request, User user);
    void deleteResume(Long id, User user);
    ResumeAnalysisDto analyzeResume(Long id, String jobDescription, User user);
    ResumeOptimizationDto optimizeResume(Long id, OptimizeResumeRequest request, User user);
    ResumeDto uploadResumeFile(MultipartFile file, User user);
    ResumeOptimizationDto optimizeUploadedFile(MultipartFile file, String jobDescription, User user);
    CoverLetterDto generateCoverLetter(MultipartFile resumeFile, String jobDescription, String companyName,
                                       String positionTitle, String tone, String keyAchievements, User user);
}
