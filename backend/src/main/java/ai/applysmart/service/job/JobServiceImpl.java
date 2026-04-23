package ai.applysmart.service.job;

import ai.applysmart.dto.job.CreateJobRequest;
import ai.applysmart.dto.job.JobDto;
import ai.applysmart.dto.job.UpdateJobRequest;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.User;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.JobRepository;
import ai.applysmart.service.job.JobService;
import ai.applysmart.service.job.JobDtoMapper;
import ai.applysmart.service.job.JobFactory;
import ai.applysmart.service.job.JobUpdater;
import ai.applysmart.util.EnumUtils;
import ai.applysmart.util.TextUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final JobFactory jobFactory;
    private final JobUpdater jobUpdater;
    private final JobDtoMapper jobDtoMapper;

    @Override
    @Transactional
    public JobDto createJob(CreateJobRequest request, User user) {
        log.info("Creating job for user: {} - Company: {}, Role: {}", user.getId(), request.getCompany(), request.getRole());

        Job job = jobFactory.create(request, user);
        job = jobRepository.save(job);
        log.info("Created job with ID: {}", job.getId());

        return jobDtoMapper.toDto(job);
    }

    @Override
    public List<JobDto> getAllJobs(User user) {
        log.info("Fetching all jobs for user: {}", user.getId());

        return jobRepository.findByUserOrderByUpdatedAtDesc(user).stream()
                .map(jobDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<JobDto> getAllJobs(User user, Pageable pageable) {
        log.info("Fetching paginated jobs for user: {} (page: {}, size: {})",
                user.getId(), pageable.getPageNumber(), pageable.getPageSize());

        return jobRepository.findByUserOrderByUpdatedAtDesc(user, pageable)
                .map(jobDtoMapper::toDto);
    }

    @Override
    public JobDto getJobById(Long id, User user) {
        log.info("Fetching job {} for user: {}", id, user.getId());

        Job job = jobRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        return jobDtoMapper.toDto(job);
    }

    @Override
    @Transactional
    public JobDto updateJob(Long id, UpdateJobRequest request, User user) {
        log.info("Updating job {} for user: {}", id, user.getId());

        Job job = jobRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        jobUpdater.apply(job, request);
        job = jobRepository.save(job);
        log.info("Updated job with ID: {}", job.getId());

        return jobDtoMapper.toDto(job);
    }

    @Override
    @Transactional
    public void deleteJob(Long id, User user) {
        log.info("Deleting job {} for user: {}", id, user.getId());

        jobRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        jobRepository.softDelete(id, user);
        log.info("Soft deleted job with ID: {}", id);
    }

    @Override
    public List<JobDto> getJobsByStatus(String status, User user) {
        log.info("Fetching jobs with status {} for user: {}", status, user.getId());

        Job.Status jobStatus = EnumUtils.parseEnum(Job.Status.class, status, "status");

        return jobRepository.findByUserAndStatusOrderByUpdatedAtDesc(user, jobStatus).stream()
                .map(jobDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobDto> searchJobs(String query, User user) {
        log.info("Searching jobs for user: {} with query: {}", user.getId(), query);

        if (TextUtils.isBlank(query)) {
            return getAllJobs(user);
        }

        return jobRepository.searchJobs(user, query).stream()
                .map(jobDtoMapper::toDto)
                .collect(Collectors.toList());
    }
}
