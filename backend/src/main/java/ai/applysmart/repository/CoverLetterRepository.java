package ai.applysmart.repository;

import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoverLetterRepository extends JpaRepository<CoverLetter, Long> {
    @Query("SELECT c FROM CoverLetter c WHERE c.user = :user AND c.deleted = false ORDER BY c.createdAt DESC")
    List<CoverLetter> findByUserOrderByCreatedAtDesc(@Param("user") User user);

    @Query("SELECT c FROM CoverLetter c WHERE c.user = :user AND c.deleted = false ORDER BY c.createdAt DESC")
    Page<CoverLetter> findByUserOrderByCreatedAtDesc(@Param("user") User user, Pageable pageable);

    @Query("SELECT c FROM CoverLetter c WHERE c.id = :id AND c.user = :user AND c.deleted = false")
    Optional<CoverLetter> findByIdAndUser(@Param("id") Long id, @Param("user") User user);

    @Query("SELECT c FROM CoverLetter c WHERE c.user = :user AND c.deleted = false AND LOWER(c.company) LIKE LOWER(CONCAT('%', :company, '%')) ORDER BY c.createdAt DESC")
    List<CoverLetter> findByUserAndCompanyContainingIgnoreCaseOrderByCreatedAtDesc(@Param("user") User user, @Param("company") String company);
}
