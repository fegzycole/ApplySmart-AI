package ai.applysmart.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "resumes", indexes = {
    @Index(name = "idx_user_status", columnList = "user_id,status"),
    @Index(name = "idx_updated_at", columnList = "updated_at")
})
@Where(clause = "deleted = false")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Pattern(regexp = "^(https?://)?([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})(:[0-9]{1,5})?(/.*)?$",
             message = "Invalid URL format")
    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "cloudinary_public_id", length = 255)
    private String cloudinaryPublicId;

    @Column(nullable = false)
    private Integer score = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.DRAFT;

    @Column(name = "word_count")
    private Integer wordCount;

    @Column(name = "ats_score")
    private Integer atsScore;

    @Column(name = "keywords", columnDefinition = "TEXT")
    private String keywords;

    public enum Status {
        DRAFT, OPTIMIZED, PUBLISHED
    }
}
