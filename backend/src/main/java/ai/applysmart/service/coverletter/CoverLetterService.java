package ai.applysmart.service.coverletter;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.coverletter.CoverLetterResponseDto;
import ai.applysmart.dto.coverletter.UpdateCoverLetterRequest;
import ai.applysmart.dto.resume.CoverLetterDto;
import ai.applysmart.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CoverLetterService {
    CoverLetterResponseDto generateCoverLetter(CoverLetterRequest request, User user);
    CoverLetterDto generateCoverLetter(MultipartFile resumeFile, String jobDescription, String companyName,
                                       String positionTitle, String tone, String keyAchievements, User user);
    List<CoverLetterResponseDto> getAllCoverLetters(User user);
    Page<CoverLetterResponseDto> getAllCoverLetters(User user, Pageable pageable);
    CoverLetterResponseDto getCoverLetterById(Long id, User user);
    CoverLetterResponseDto updateCoverLetter(Long id, UpdateCoverLetterRequest request, User user);
    void deleteCoverLetter(Long id, User user);
    CoverLetterResponseDto regenerateCoverLetter(Long id, CoverLetterRequest request, User user);
}
