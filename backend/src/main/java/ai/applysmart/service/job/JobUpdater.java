package ai.applysmart.service.job;

import ai.applysmart.dto.job.UpdateJobRequest;
import ai.applysmart.entity.Job;
import ai.applysmart.util.EnumUtils;
import ai.applysmart.util.TextUtils;
import org.springframework.stereotype.Component;

@Component
public class JobUpdater {

    public void apply(Job job, UpdateJobRequest request) {
        if (request.getCompany() != null) {
            job.setCompany(request.getCompany());
        }

        if (request.getRole() != null) {
            job.setRole(request.getRole());
        }

        if (request.getLink() != null) {
            job.setLink(request.getLink());
        }

        if (TextUtils.isNotBlank(request.getStatus())) {
            job.setStatus(EnumUtils.parseEnum(Job.Status.class, request.getStatus(), "status"));
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
    }
}
