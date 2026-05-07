package ai.applysmart.service.job;

import ai.applysmart.dto.job.CreateJobRequest;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.User;
import ai.applysmart.util.DateUtils;
import ai.applysmart.util.EnumUtils;
import ai.applysmart.util.TextUtils;
import org.springframework.stereotype.Component;

@Component
public class JobFactory {

    public Job create(CreateJobRequest request, User user) {
        Job.Status status = EnumUtils.parseEnumOrDefault(
                Job.Status.class,
                request.getStatus(),
                Job.Status.SAVED
        );

        return Job.builder()
                .user(user)
                .company(TextUtils.trimToNull(request.getCompany()))
                .role(TextUtils.trimToNull(request.getRole()))
                .link(TextUtils.trimToNull(request.getLink()))
                .status(status)
                .notes(TextUtils.trimToNull(request.getNotes()))
                .salary(TextUtils.trimToNull(request.getSalary()))
                .location(TextUtils.trimToNull(request.getLocation()))
                .applicationDeadline(DateUtils.parseOptionalLocalDateTime(
                        request.getApplicationDeadline(),
                        "applicationDeadline"
                ))
                .build();
    }
}
