package ai.applysmart.service.coverletter;

import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import ai.applysmart.repository.CoverLetterRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CoverLetterServiceImplTest {

    @Mock
    private CoverLetterRepository coverLetterRepository;

    @Mock
    private CoverLetterContentGenerator coverLetterContentGenerator;

    @Mock
    private CoverLetterFactory coverLetterFactory;

    @Mock
    private CoverLetterFileManager coverLetterFileManager;

    @Mock
    private CoverLetterDtoMapper coverLetterDtoMapper;

    private CoverLetterServiceImpl coverLetterService;

    @BeforeEach
    void setUp() {
        coverLetterService = new CoverLetterServiceImpl(
                coverLetterRepository,
                coverLetterContentGenerator,
                coverLetterFactory,
                coverLetterFileManager,
                coverLetterDtoMapper
        );
    }

    @Test
    void deleteCoverLetterRemovesStoredFileBeforeSoftDelete() {
        User user = User.builder().email("user@example.com").firstName("Ada").lastName("Lovelace").build();
        user.setId(5L);
        CoverLetter coverLetter = CoverLetter.builder()
                .company("Acme")
                .position("Backend Engineer")
                .cloudinaryPublicId("cover-letter-public-id")
                .build();
        coverLetter.setId(8L);

        when(coverLetterRepository.findByIdAndUser(8L, user)).thenReturn(Optional.of(coverLetter));

        coverLetterService.deleteCoverLetter(8L, user);

        verify(coverLetterFileManager).deleteStoredFile(coverLetter);
        verify(coverLetterRepository).softDelete(8L, user);
    }
}
