package ai.applysmart.service.impl;

import ai.applysmart.dto.job.CreateJobRequest;
import ai.applysmart.dto.job.JobDto;
import ai.applysmart.dto.job.UpdateJobRequest;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.JobRepository;
import ai.applysmart.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    @Override
    @Transactional
    public JobDto createJob(CreateJobRequest request, User user) {
        log.info("Creating job for user: {} - Company: {}, Role: {}", user.getId(), request.getCompany(), request.getRole());

        Job.Status status = Job.Status.SAVED; // Default status
        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            try {
                status = Job.Status.valueOf(request.getStatus().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid status: " + request.getStatus());
            }
        }

        Job job = Job.builder()
                .user(user)
                .company(request.getCompany())
                .role(request.getRole())
                .link(request.getLink())
                .status(status)
                .notes(request.getNotes())
                .salary(request.getSalary())
                .location(request.getLocation())
                .applicationDeadline(request.getApplicationDeadline())
                .build();

        job = jobRepository.save(job);
        log.info("Created job with ID: {}", job.getId());

        return convertToDto(job);
    }

    @Override
    public List<JobDto> getAllJobs(User user) {
        log.info("Fetching all jobs for user: {}", user.getId());

        return jobRepository.findByUserOrderByUpdatedAtDesc(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public JobDto getJobById(Long id, User user) {
        log.info("Fetching job {} for user: {}", id, user.getId());

        Job job = jobRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        return convertToDto(job);
    }

    @Override
    @Transactional
    public JobDto updateJob(Long id, UpdateJobRequest request, User user) {
        log.info("Updating job {} for user: {}", id, user.getId());

        Job job = jobRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (request.getCompany() != null) {
            job.setCompany(request.getCompany());
        }

        if (request.getRole() != null) {
            job.setRole(request.getRole());
        }

        if (request.getLink() != null) {
            job.setLink(request.getLink());
        }

        if (request.getStatus() != null) {
            try {
                job.setStatus(Job.Status.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid status: " + request.getStatus());
            }
        }

        if (request.getNotes() != null) {
            job.setNotes(request.getNotes());
        }

        if (request.getSalary() != null) {
            job.setSalary(request.getSalary());
        }

        if (request.getLocation() != null) {
            job.setLocation(request.getLocation());
        }

        if (request.getApplicationDeadline() != null) {
            job.setApplicationDeadline(request.getApplicationDeadline());
        }

        job = jobRepository.save(job);
        log.info("Updated job with ID: {}", job.getId());

        return convertToDto(job);
    }

    @Override
    @Transactional
    public void deleteJob(Long id, User user) {
        log.info("Deleting job {} for user: {}", id, user.getId());

        Job job = jobRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        jobRepository.delete(job);
        log.info("Deleted job with ID: {}", id);
    }

    @Override
    public List<JobDto> getJobsByStatus(String status, User user) {
        log.info("Fetching jobs with status {} for user: {}", status, user.getId());

        Job.Status jobStatus;
        try {
            jobStatus = Job.Status.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + status);
        }

        return jobRepository.findByUserAndStatusOrderByUpdatedAtDesc(user, jobStatus).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobDto> searchJobs(String query, User user) {
        log.info("Searching jobs for user: {} with query: {}", user.getId(), query);

        if (query == null || query.isBlank()) {
            return getAllJobs(user);
        }

        return jobRepository.searchJobs(user, query).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private JobDto convertToDto(Job job) {
        return JobDto.builder()
                .id(job.getId())
                .company(job.getCompany())
                .role(job.getRole())
                .link(job.getLink())
                .status(job.getStatus().name())
                .notes(job.getNotes())
                .salary(job.getSalary())
                .location(job.getLocation())
                .applicationDeadline(job.getApplicationDeadline())
                .createdAt(job.getCreatedAt())
                .updatedAt(job.getUpdatedAt())
                .build();
    }
}
