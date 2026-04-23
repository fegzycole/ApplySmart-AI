package ai.applysmart.service.job;

import ai.applysmart.dto.job.JobDto;
import ai.applysmart.entity.Job;
import org.springframework.stereotype.Component;

@Component
public class JobDtoMapper {

    public JobDto toDto(Job job) {
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
