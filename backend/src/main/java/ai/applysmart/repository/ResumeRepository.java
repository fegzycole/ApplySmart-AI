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

    Optional<Resume> findByIdAndUser(Long id, User user);

    long countByUser(User user);

    @Modifying
    @Query("UPDATE Resume r SET r.deleted = true WHERE r.id = :id AND r.user = :user")
    void softDelete(@Param("id") Long id, @Param("user") User user);
}
