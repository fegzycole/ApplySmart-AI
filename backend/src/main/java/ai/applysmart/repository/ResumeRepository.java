package ai.applysmart.repository;

import ai.applysmart.entity.Resume;
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
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByUserOrderByUpdatedAtDesc(User user);

    Page<Resume> findByUserOrderByUpdatedAtDesc(User user, Pageable pageable);

    @Query(
            value = """
                    SELECT *
                    FROM resumes r
                    WHERE r.user_id = :userId
                      AND r.deleted = false
                      AND (:query IS NULL
                           OR LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%'))
                           OR LOWER(COALESCE(r.content, '')) LIKE LOWER(CONCAT('%', :query, '%')))
                      AND (:documentKind IS NULL
                           OR (:documentKind = 'optimized' AND r.status = 'OPTIMIZED')
                           OR (:documentKind = 'built'
                               AND (r.status = 'PUBLISHED'
                                    OR (r.status = 'DRAFT'
                                        AND r.content IS NULL
                                        AND r.file_url IS NOT NULL)))
                           OR (:documentKind = 'original'
                               AND NOT (r.status = 'OPTIMIZED'
                                        OR r.status = 'PUBLISHED'
                                        OR (r.status = 'DRAFT'
                                            AND r.content IS NULL
                                            AND r.file_url IS NOT NULL))))
                    ORDER BY r.updated_at DESC
                    """,
            countQuery = """
                    SELECT COUNT(*)
                    FROM resumes r
                    WHERE r.user_id = :userId
                      AND r.deleted = false
                      AND (:query IS NULL
                           OR LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%'))
                           OR LOWER(COALESCE(r.content, '')) LIKE LOWER(CONCAT('%', :query, '%')))
                      AND (:documentKind IS NULL
                           OR (:documentKind = 'optimized' AND r.status = 'OPTIMIZED')
                           OR (:documentKind = 'built'
                               AND (r.status = 'PUBLISHED'
                                    OR (r.status = 'DRAFT'
                                        AND r.content IS NULL
                                        AND r.file_url IS NOT NULL)))
                           OR (:documentKind = 'original'
                               AND NOT (r.status = 'OPTIMIZED'
                                        OR r.status = 'PUBLISHED'
                                        OR (r.status = 'DRAFT'
                                            AND r.content IS NULL
                                            AND r.file_url IS NOT NULL))))
                    """,
            nativeQuery = true
    )
    Page<Resume> findDocumentPageByUser(
            @Param("userId") Long userId,
            @Param("query") String query,
            @Param("documentKind") String documentKind,
            Pageable pageable
    );

    Optional<Resume> findByIdAndUser(Long id, User user);

    long countByUser(User user);

    @Modifying
    @Query("UPDATE Resume r SET r.deleted = true WHERE r.id = :id AND r.user = :user")
    void softDelete(@Param("id") Long id, @Param("user") User user);

    @Query(value = "SELECT cloudinary_public_id FROM resumes WHERE user_id = :userId AND cloudinary_public_id IS NOT NULL", nativeQuery = true)
    List<String> findAllCloudinaryPublicIdsByUserId(@Param("userId") Long userId);

    @Modifying
    @Query(value = "DELETE FROM resumes WHERE user_id = :userId", nativeQuery = true)
    void deleteAllByUserId(@Param("userId") Long userId);
}
