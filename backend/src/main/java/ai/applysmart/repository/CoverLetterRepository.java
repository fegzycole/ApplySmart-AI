package ai.applysmart.repository;

import ai.applysmart.entity.CoverLetter;
import ai.applysmart.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoverLetterRepository extends JpaRepository<CoverLetter, Long> {

    // @Where clause automatically filters deleted = false
    List<CoverLetter> findByUserOrderByCreatedAtDesc(User user);

    Page<CoverLetter> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);

    Optional<CoverLetter> findByIdAndUser(Long id, User user);

    List<CoverLetter> findByUserAndCompanyContainingIgnoreCaseOrderByCreatedAtDesc(User user, String company);

    long countByUser(User user);

    @Modifying
    @Query("UPDATE CoverLetter c SET c.deleted = true WHERE c.id = :id AND c.user = :user")
    void softDelete(@Param("id") Long id, @Param("user") User user);
}
