package ai.applysmart.service.resume;

import ai.applysmart.dto.resume.OptimizeResumeRequest;
import ai.applysmart.dto.resume.ResumeAnalysisDto;
import ai.applysmart.dto.resume.ResumeDto;
import ai.applysmart.dto.resume.ResumeOptimizationDto;
import ai.applysmart.entity.Resume;
import ai.applysmart.entity.User;
import ai.applysmart.exception.BadRequestException;
import ai.applysmart.exception.FileProcessingException;
import ai.applysmart.exception.ResourceNotFoundException;
import ai.applysmart.repository.ResumeRepository;
import ai.applysmart.service.ai.ClaudeService;
import ai.applysmart.service.resume.ResumeService;
import ai.applysmart.service.resume.ResumeDtoMapper;
import ai.applysmart.service.resume.ResumeFileFactory;
import ai.applysmart.service.resume.ResumeOptimizationWorkflow;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final ClaudeService claudeService;
    private final ResumeFileFactory resumeFileFactory;
    private final ResumeOptimizationWorkflow optimizationWorkflow;
    private final ResumeDtoMapper resumeDtoMapper;

    @Override
    public List<ResumeDto> getAllResumes(User user) {
        log.info("Fetching all resumes for user: {}", user.getId());
        return resumeRepository.findByUserOrderByUpdatedAtDesc(user).stream()
                .map(resumeDtoMapper::toDto)
                .toList();
    }

    @Override
    public Page<ResumeDto> getAllResumes(User user, Pageable pageable) {
        log.info("Fetching paginated resumes for user: {} (page: {}, size: {})",
                user.getId(), pageable.getPageNumber(), pageable.getPageSize());
        return resumeRepository.findByUserOrderByUpdatedAtDesc(user, pageable)
                .map(resumeDtoMapper::toDto);
    }

    @Override
    public ResumeDto getResumeById(Long id, User user) {
        log.info("Fetching resume {} for user: {}", id, user.getId());
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));
        return resumeDtoMapper.toDto(resume);
    }

    @Override
    @Transactional
    public void deleteResume(Long id, User user) {
        log.info("Deleting resume {} for user: {}", id, user.getId());
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        resumeFileFactory.deleteStoredFile(resume);

        resumeRepository.softDelete(id, user);
        log.info("Soft deleted resume with ID: {}", id);
    }

    @Override
    @Transactional
    public ResumeAnalysisDto analyzeResume(Long id, String jobDescription, User user) {
        log.info("Analyzing resume {} for user: {}", id, user.getId());
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        requireResumeContent(resume);

        ResumeAnalysisDto analysis = claudeService.analyzeResume(resume.getContent(), jobDescription);
        resume.setScore(analysis.getScore());
        resume.setAtsScore(analysis.getAtsCompatibility());
        resumeRepository.save(resume);

        return analysis;
    }

    @Override
    @Transactional
    public ResumeOptimizationDto optimizeResume(Long id, OptimizeResumeRequest request, User user) {
        log.info("Optimizing resume {} for user: {}", id, user.getId());
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        requireResumeContent(resume);
        ResumeOptimizationDto optimization = optimizationWorkflow.optimizeStoredResume(resume, request);
        resumeRepository.save(resume);

        return optimization;
    }

    @Override
    @Transactional
    public ResumeDto uploadResumeFile(MultipartFile file, User user) {
        log.info("Uploading resume file for user: {}", user.getId());

        Resume resume = resumeFileFactory.createUploadedResume(file, user);
        resume = resumeRepository.save(resume);
        log.info("Uploaded and created resume with ID: {}", resume.getId());

        return resumeDtoMapper.toDto(resume);
    }

    @Override
    @Transactional
    public ResumeOptimizationDto optimizeUploadedFile(MultipartFile file, String jobDescription, String template, User user) {
        return optimizationWorkflow.optimizeUploadedFile(file, jobDescription, template, user);
    }

    @Override
    @Transactional
    public ResumeDto uploadBuiltResume(MultipartFile file, String name, User user) {
        log.info("Uploading built resume for user: {} - Name: {}, File: {}",
                user.getId(), name, file.getOriginalFilename());

        try {
            Resume resume = resumeFileFactory.createBuiltResume(file, name, user);
            resume = resumeRepository.save(resume);
            log.info("Created resume with ID: {}", resume.getId());

            return resumeDtoMapper.toDto(resume);
        } catch (BadRequestException e) {
            throw e;
        } catch (FileProcessingException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error uploading built resume for user: {}", user.getId(), e);
            throw new FileProcessingException("Failed to upload resume", e);
        }
    }

    private void requireResumeContent(Resume resume) {
        if (resume.getContent() == null || resume.getContent().isBlank()) {
            throw new BadRequestException("Resume content is empty");
        }
    }
}
