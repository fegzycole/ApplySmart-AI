package ai.applysmart.dto.resume;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Structured resume data extracted from PDF
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParsedResumeDto {
    private PersonalInfo personalInfo;
    private String summary;
    private List<WorkExperience> workExperience;
    private List<Education> education;
    private List<String> skills;
    private List<Certification> certifications;
    private List<Project> projects;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PersonalInfo {
        private String name;
        private String email;
        private String phone;
        private String location;
        private String linkedin;
        private String github;
        private String website;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WorkExperience {
        private String company;
        private String position;
        private String location;
        private String startDate;
        private String endDate;
        private List<String> responsibilities;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Education {
        private String institution;
        private String degree;
        private String field;
        private String location;
        private String graduationDate;
        private String gpa;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Certification {
        private String name;
        private String issuer;
        private String date;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Project {
        private String name;
        private String description;
        private List<String> technologies;
        private String link;
    }
}
