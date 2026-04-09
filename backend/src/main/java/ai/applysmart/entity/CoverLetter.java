package ai.applysmart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cover_letters", indexes = {
    @Index(name = "idx_user_company", columnList = "user_id,company"),
    @Index(name = "idx_created_at", columnList = "created_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoverLetter extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 255)
    private String company;

    @Column(nullable = false, length = 255)
    private String position;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(length = 50)
    private String tone;

    @Column(name = "word_count")
    private Integer wordCount;

    @Column(name = "linked_resume_id")
    private Long linkedResumeId;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;
}
