package ai.applysmart.service;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.coverletter.CoverLetterResponseDto;
import ai.applysmart.dto.coverletter.UpdateCoverLetterRequest;
import ai.applysmart.entity.User;

import java.util.List;

public interface CoverLetterService {
    CoverLetterResponseDto generateCoverLetter(CoverLetterRequest request, User user);
    List<CoverLetterResponseDto> getAllCoverLetters(User user);
    CoverLetterResponseDto getCoverLetterById(Long id, User user);
    CoverLetterResponseDto updateCoverLetter(Long id, UpdateCoverLetterRequest request, User user);
    void deleteCoverLetter(Long id, User user);
    CoverLetterResponseDto regenerateCoverLetter(Long id, CoverLetterRequest request, User user);
}
