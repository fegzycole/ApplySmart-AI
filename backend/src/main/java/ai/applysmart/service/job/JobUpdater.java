package ai.applysmart.service.job;

import ai.applysmart.dto.job.UpdateJobRequest;
import ai.applysmart.entity.Job;
import ai.applysmart.util.DateUtils;
import ai.applysmart.util.EnumUtils;
import ai.applysmart.util.TextUtils;
import org.springframework.stereotype.Component;

@Component
public class JobUpdater {

    public void apply(Job job, UpdateJobRequest request) {
        if (request.getCompany() != null) {
            String company = TextUtils.trimToNull(request.getCompany());
            if (company != null) {
                job.setCompany(company);
            }
        }

        if (request.getRole() != null) {
            String role = TextUtils.trimToNull(request.getRole());
            if (role != null) {
                job.setRole(role);
            }
        }

        if (request.getLink() != null) {
            job.setLink(TextUtils.trimToNull(request.getLink()));
        }

        if (TextUtils.isNotBlank(request.getStatus())) {
            job.setStatus(EnumUtils.parseEnum(Job.Status.class, request.getStatus(), "status"));
        }

        if (request.getNotes() != null) {
            job.setNotes(TextUtils.trimToNull(request.getNotes()));
        }

        if (request.getSalary() != null) {
            job.setSalary(TextUtils.trimToNull(request.getSalary()));
        }

        if (request.getLocation() != null) {
            job.setLocation(TextUtils.trimToNull(request.getLocation()));
        }

        if (request.getApplicationDeadline() != null) {
            job.setApplicationDeadline(DateUtils.parseOptionalLocalDateTime(
                    request.getApplicationDeadline(),
                    "applicationDeadline"
            ));
        }
    }
}
