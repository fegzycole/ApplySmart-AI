package ai.applysmart.repository;

import ai.applysmart.entity.Job;
import ai.applysmart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByUserOrderByUpdatedAtDesc(User user);
    Optional<Job> findByIdAndUser(Long id, User user);
    List<Job> findByUserAndStatusOrderByUpdatedAtDesc(User user, Job.Status status);

    @Query("SELECT j FROM Job j WHERE j.user = :user AND " +
           "(LOWER(j.company) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(j.role) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Job> searchJobs(@Param("user") User user, @Param("query") String query);
}
