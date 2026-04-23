package ai.applysmart.service.job;

import ai.applysmart.dto.job.UpdateJobRequest;
import ai.applysmart.entity.Job;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class JobUpdaterTest {

    private final JobUpdater updater = new JobUpdater();

    @Test
    void applyUpdatesOnlyProvidedFields() {
        Job job = Job.builder()
                .company("Old Company")
                .role("Old Role")
                .status(Job.Status.SAVED)
                .notes("Keep this")
                .build();

        UpdateJobRequest request = new UpdateJobRequest();
        request.setCompany("New Company");
        request.setStatus("INTERVIEW");

        updater.apply(job, request);

        assertEquals("New Company", job.getCompany());
        assertEquals("Old Role", job.getRole());
        assertEquals("Keep this", job.getNotes());
        assertEquals(Job.Status.INTERVIEW, job.getStatus());
    }
}
