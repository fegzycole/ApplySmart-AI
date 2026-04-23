package ai.applysmart.service.job;

import ai.applysmart.dto.job.CreateJobRequest;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.User;
import ai.applysmart.util.EnumUtils;
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
                .company(request.getCompany())
                .role(request.getRole())
                .link(request.getLink())
                .status(status)
                .notes(request.getNotes())
                .salary(request.getSalary())
                .location(request.getLocation())
                .applicationDeadline(request.getApplicationDeadline())
                .build();
    }
}
