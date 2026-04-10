package ai.applysmart.repository;

import ai.applysmart.entity.Job;
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
public interface JobRepository extends JpaRepository<Job, Long> {
    @Query("SELECT j FROM Job j WHERE j.user = :user AND j.deleted = false ORDER BY j.updatedAt DESC")
    List<Job> findByUserOrderByUpdatedAtDesc(@Param("user") User user);

    @Query("SELECT j FROM Job j WHERE j.user = :user AND j.deleted = false ORDER BY j.updatedAt DESC")
    Page<Job> findByUserOrderByUpdatedAtDesc(@Param("user") User user, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.id = :id AND j.user = :user AND j.deleted = false")
    Optional<Job> findByIdAndUser(@Param("id") Long id, @Param("user") User user);

    @Query("SELECT j FROM Job j WHERE j.user = :user AND j.status = :status AND j.deleted = false ORDER BY j.updatedAt DESC")
    List<Job> findByUserAndStatusOrderByUpdatedAtDesc(@Param("user") User user, @Param("status") Job.Status status);

    @Query("SELECT j FROM Job j WHERE j.user = :user AND j.deleted = false AND " +
           "(LOWER(j.company) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(j.role) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Job> searchJobs(@Param("user") User user, @Param("query") String query);
}
