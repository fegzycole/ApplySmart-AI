package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeTemplate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

class PdfGeneratorTest {

    private TemplateLoader templateLoader;
    private TemplateDataBinder templateDataBinder;
    private PdfGenerator pdfGenerator;

    @BeforeEach
    void setUp() {
        templateLoader = new TemplateLoader();
        templateDataBinder = new TemplateDataBinder(
                new WorkExperienceRenderer(),
                new EducationRenderer(),
                new CertificationRenderer(),
                new ProjectRenderer(),
                new SkillsRenderer()
        );
        pdfGenerator = new PdfGenerator();
    }

    @Test
    void allResumeBuilderTemplatesRenderToPdf() {
        ParsedResumeDto resumeData = ParsedResumeDto.builder()
                .personalInfo(ParsedResumeDto.PersonalInfo.builder()
                        .name("Ferguson Iyara")
                        .email("ferguson@example.com")
                        .phone("+234 800 000 0000")
                        .location("Lagos, Nigeria")
                        .linkedin("linkedin.com/in/ferguson")
                        .github("github.com/ferguson")
                        .website("ferguson.dev")
                        .build())
                .summary("Creative software engineer building sharp frontend and backend systems.")
                .workExperience(List.of(ParsedResumeDto.WorkExperience.builder()
                        .company("ApplySmart")
                        .position("Lead Engineer")
                        .location("Remote")
                        .startDate("2024")
                        .endDate("Present")
                        .responsibilities(List.of(
                                "Designed and shipped AI-assisted resume workflows",
                                "Led frontend and backend template system improvements"
                        ))
                        .build()))
                .education(List.of(ParsedResumeDto.Education.builder()
                        .institution("University of Lagos")
                        .degree("Bachelor of Science")
                        .field("Computer Science")
                        .location("Lagos")
                        .startDate("2018")
                        .graduationDate("2022")
                        .gpa("4.7/5.0")
                        .build()))
                .skills(List.of("React", "TypeScript", "Java", "Spring Boot", "PostgreSQL"))
                .build();

        for (ResumeTemplate template : ResumeTemplate.values()) {
            String html = templateDataBinder.bind(templateLoader.load(template), resumeData, template);
            byte[] pdf = pdfGenerator.generate(html);

            assertTrue(pdf.length > 0, template + " PDF should not be empty");
        }
    }
}
