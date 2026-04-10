package ai.applysmart.repository;

import ai.applysmart.entity.Job;
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
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByUserOrderByUpdatedAtDesc(User user);

    Page<Job> findByUserOrderByUpdatedAtDesc(User user, Pageable pageable);

    Optional<Job> findByIdAndUser(Long id, User user);

    List<Job> findByUserAndStatusOrderByUpdatedAtDesc(User user, Job.Status status);

    long countByUser(User user);

    @Query("SELECT j FROM Job j WHERE j.user = :user AND " +
           "(LOWER(j.company) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(j.role) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Job> searchJobs(@Param("user") User user, @Param("query") String query);

    @Modifying
    @Query("UPDATE Job j SET j.deleted = true WHERE j.id = :id AND j.user = :user")
    void softDelete(@Param("id") Long id, @Param("user") User user);
}
