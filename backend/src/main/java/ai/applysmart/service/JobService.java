package ai.applysmart.service;

import ai.applysmart.dto.job.CreateJobRequest;
import ai.applysmart.dto.job.JobDto;
import ai.applysmart.dto.job.UpdateJobRequest;
import ai.applysmart.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface JobService {
    JobDto createJob(CreateJobRequest request, User user);
    List<JobDto> getAllJobs(User user);
    Page<JobDto> getAllJobs(User user, Pageable pageable);
    JobDto getJobById(Long id, User user);
    JobDto updateJob(Long id, UpdateJobRequest request, User user);
    void deleteJob(Long id, User user);
    List<JobDto> getJobsByStatus(String status, User user);
    List<JobDto> searchJobs(String query, User user);
}
