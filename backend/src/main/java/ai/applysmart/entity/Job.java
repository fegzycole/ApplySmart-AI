package ai.applysmart.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs", indexes = {
    @Index(name = "idx_user_status", columnList = "user_id,status"),
    @Index(name = "idx_updated_at", columnList = "updated_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 255)
    private String company;

    @Column(nullable = false, length = 255)
    private String role;

    @Column(length = 500)
    private String link;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.SAVED;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(length = 100)
    private String salary;

    @Column(length = 255)
    private String location;

    @Column(name = "application_deadline")
    private LocalDateTime applicationDeadline;

    public enum Status {
        SAVED, APPLIED, INTERVIEW, OFFER, REJECTED
    }
}
