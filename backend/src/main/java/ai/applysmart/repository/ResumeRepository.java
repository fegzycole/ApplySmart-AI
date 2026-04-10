package ai.applysmart.repository;

import ai.applysmart.entity.Resume;
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
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    @Query("SELECT r FROM Resume r WHERE r.user = :user AND r.deleted = false ORDER BY r.updatedAt DESC")
    List<Resume> findByUserOrderByUpdatedAtDesc(@Param("user") User user);

    @Query("SELECT r FROM Resume r WHERE r.user = :user AND r.deleted = false ORDER BY r.updatedAt DESC")
    Page<Resume> findByUserOrderByUpdatedAtDesc(@Param("user") User user, Pageable pageable);

    @Query("SELECT r FROM Resume r WHERE r.id = :id AND r.user = :user AND r.deleted = false")
    Optional<Resume> findByIdAndUser(@Param("id") Long id, @Param("user") User user);

    void deleteByIdAndUser(Long id, User user);

    @Query("SELECT COUNT(r) FROM Resume r WHERE r.user = :user AND r.deleted = false")
    long countByUser(@Param("user") User user);
}
