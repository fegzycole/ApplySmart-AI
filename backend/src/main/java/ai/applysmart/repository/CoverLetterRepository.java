package ai.applysmart.repository;

import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoverLetterRepository extends JpaRepository<CoverLetter, Long> {
    List<CoverLetter> findByUserOrderByCreatedAtDesc(User user);
    Optional<CoverLetter> findByIdAndUser(Long id, User user);
    List<CoverLetter> findByUserAndCompanyContainingIgnoreCaseOrderByCreatedAtDesc(User user, String company);
}
