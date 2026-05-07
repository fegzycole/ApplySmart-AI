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

    List<CoverLetter> findByUserOrderByCreatedAtDesc(User user);

    Page<CoverLetter> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);

    @Query(
            value = """
                    SELECT *
                    FROM cover_letters c
                    WHERE c.user_id = :userId
                      AND c.deleted = false
                      AND (:query IS NULL
                           OR LOWER(c.company) LIKE LOWER(CONCAT('%', :query, '%'))
                           OR LOWER(c.position) LIKE LOWER(CONCAT('%', :query, '%'))
                           OR LOWER(c.tone) LIKE LOWER(CONCAT('%', :query, '%'))
                           OR LOWER(COALESCE(c.content, '')) LIKE LOWER(CONCAT('%', :query, '%')))
                    ORDER BY c.created_at DESC
                    """,
            countQuery = """
                    SELECT COUNT(*)
                    FROM cover_letters c
                    WHERE c.user_id = :userId
                      AND c.deleted = false
                      AND (:query IS NULL
                           OR LOWER(c.company) LIKE LOWER(CONCAT('%', :query, '%'))
                           OR LOWER(c.position) LIKE LOWER(CONCAT('%', :query, '%'))
                           OR LOWER(c.tone) LIKE LOWER(CONCAT('%', :query, '%'))
                           OR LOWER(COALESCE(c.content, '')) LIKE LOWER(CONCAT('%', :query, '%')))
                    """,
            nativeQuery = true
    )
    Page<CoverLetter> findDocumentPageByUser(
            @Param("userId") Long userId,
            @Param("query") String query,
            Pageable pageable
    );

    Optional<CoverLetter> findByIdAndUser(Long id, User user);

    List<CoverLetter> findByUserAndCompanyContainingIgnoreCaseOrderByCreatedAtDesc(User user, String company);

    long countByUser(User user);

    @Query("SELECT c.cloudinaryPublicId FROM CoverLetter c WHERE c.user.id = :userId AND c.cloudinaryPublicId IS NOT NULL")
    List<String> findAllCloudinaryPublicIdsByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE CoverLetter c SET c.deleted = true WHERE c.id = :id AND c.user = :user")
    void softDelete(@Param("id") Long id, @Param("user") User user);

    @Modifying
    @Query(value = "DELETE FROM cover_letters WHERE user_id = :userId", nativeQuery = true)
    void deleteAllByUserId(@Param("userId") Long userId);
}
