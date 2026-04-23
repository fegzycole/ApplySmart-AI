package ai.applysmart.service.job;

import ai.applysmart.dto.job.CreateJobRequest;
import ai.applysmart.entity.Job;
import ai.applysmart.entity.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;

class JobFactoryTest {

    private final JobFactory factory = new JobFactory();

    @Test
    void createDefaultsStatusWhenRequestDoesNotProvideOne() {
        User user = User.builder().email("user@example.com").firstName("Ada").lastName("Lovelace").build();
        CreateJobRequest request = new CreateJobRequest();
        request.setCompany("Acme");
        request.setRole("Backend Engineer");

        Job job = factory.create(request, user);

        assertSame(user, job.getUser());
        assertEquals("Acme", job.getCompany());
        assertEquals("Backend Engineer", job.getRole());
        assertEquals(Job.Status.SAVED, job.getStatus());
    }
}
