package ai.applysmart.service.template;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.dto.resume.ResumeTemplate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TemplateDataBinderTest {

    private TemplateLoader templateLoader;
    private TemplateDataBinder templateDataBinder;

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
    }

    @Test
    void modernTemplateUsesFilteredContactsAndOmitsEmptySummarySection() {
        ParsedResumeDto resumeData = ParsedResumeDto.builder()
                .personalInfo(ParsedResumeDto.PersonalInfo.builder()
                        .name("Ada Lovelace")
                        .email("ada@example.com")
                        .phone("+1 555 0100")
                        .build())
                .skills(List.of("Java", "Spring"))
                .certifications(List.of(ParsedResumeDto.Certification.builder()
                        .name("AWS Certified")
                        .issuer("Amazon")
                        .build()))
                .projects(List.of(ParsedResumeDto.Project.builder()
                        .name("Portfolio")
                        .description("Sample project")
                        .build()))
                .build();

        String html = templateDataBinder.bind(templateLoader.load(ResumeTemplate.MODERN), resumeData, ResumeTemplate.MODERN);

        assertTrue(html.contains("ada@example.com"));
        assertTrue(html.contains("+1 555 0100"));
        assertFalse(html.contains("contact-linkedin"));
        assertFalse(html.contains("Professional Summary"));
        assertTrue(html.contains("Certifications"));
        assertTrue(html.contains("AWS Certified"));
        assertTrue(html.contains(">Projects</h2>"));
        assertTrue(html.contains("Portfolio"));
        assertTrue(html.contains(">Skills</h2>"));
    }

    @Test
    void templatesUseBuilderPreviewFallbackText() {
        ParsedResumeDto resumeData = ParsedResumeDto.builder()
                .personalInfo(ParsedResumeDto.PersonalInfo.builder().build())
                .workExperience(List.of(ParsedResumeDto.WorkExperience.builder()
                        .responsibilities(List.of("Built the preview system"))
                        .build()))
                .education(List.of(ParsedResumeDto.Education.builder().build()))
                .build();

        String html = templateDataBinder.bind(templateLoader.load(ResumeTemplate.CREATIVE), resumeData, ResumeTemplate.CREATIVE);

        assertTrue(html.contains(">Your Name</h1>"));
        assertTrue(html.contains(">Position</h3>"));
        assertTrue(html.contains(">Company</div>"));
        assertTrue(html.contains(">Institution</div>"));
        assertFalse(html.contains(">Skills</h2>"));
    }

    @Test
    void bindEscapesPersonalInfoAndContactValues() {
        ParsedResumeDto resumeData = ParsedResumeDto.builder()
                .personalInfo(ParsedResumeDto.PersonalInfo.builder()
                        .name("Ada <Lovelace>")
                        .email(" ada@example.com ")
                        .website("https://example.com?role=<dev>&team=ai")
                        .build())
                .build();

        String html = templateDataBinder.bind(templateLoader.load(ResumeTemplate.MODERN), resumeData, ResumeTemplate.MODERN);

        assertTrue(html.contains("Ada &lt;Lovelace&gt;"));
        assertTrue(html.contains(">ada@example.com</span>"));
        assertTrue(html.contains("https://example.com?role=&lt;dev&gt;&amp;team=ai"));
        assertFalse(html.contains("Ada <Lovelace>"));
    }

    @Test
    void classicTemplateUsesClassicSectionTitlesAndLayoutMarkup() {
        ParsedResumeDto resumeData = ParsedResumeDto.builder()
                .personalInfo(ParsedResumeDto.PersonalInfo.builder()
                        .name("Ada Lovelace")
                        .email("ada@example.com")
                        .build())
                .workExperience(List.of(ParsedResumeDto.WorkExperience.builder()
                        .company("Analytical Engines Ltd")
                        .position("Mathematician")
                        .location("London")
                        .startDate("1842")
                        .endDate("1852")
                        .responsibilities(List.of("Drafted analytical notes"))
                        .build()))
                .skills(List.of("Mathematics", "Research"))
                .build();

        String html = templateDataBinder.bind(templateLoader.load(ResumeTemplate.CLASSIC), resumeData, ResumeTemplate.CLASSIC);

        assertTrue(html.contains(">Professional Experience</h2>"));
        assertTrue(html.contains(">Core Competencies</h2>"));
        assertTrue(html.contains("experience-company-row"));
        assertTrue(html.contains("header-rule"));
    }

    @Test
    void professionalTemplateUsesProfessionalTitlesAndOmitsGpaFromEducationBlock() {
        ParsedResumeDto resumeData = ParsedResumeDto.builder()
                .personalInfo(ParsedResumeDto.PersonalInfo.builder()
                        .name("Ada Lovelace")
                        .email("ada@example.com")
                        .build())
                .workExperience(List.of(ParsedResumeDto.WorkExperience.builder()
                        .company("Royal Society")
                        .position("Research Fellow")
                        .startDate("1835")
                        .endDate("1840")
                        .responsibilities(List.of("Published technical findings"))
                        .build()))
                .education(List.of(ParsedResumeDto.Education.builder()
                        .institution("University of London")
                        .degree("Bachelor of Science")
                        .field("Mathematics")
                        .location("London")
                        .startDate("1830")
                        .graduationDate("1834")
                        .gpa("4.0")
                        .build()))
                .skills(List.of("Mathematics", "Logic"))
                .build();

        String html = templateDataBinder.bind(templateLoader.load(ResumeTemplate.PROFESSIONAL), resumeData, ResumeTemplate.PROFESSIONAL);

        assertTrue(html.contains(">Experience History</h2>"));
        assertTrue(html.contains(">Core Competencies</h2>"));
        assertTrue(html.contains("Bachelor of Science in Mathematics - University of London"));
        assertTrue(html.contains(">London</div>"));
        assertFalse(html.contains("GPA: 4.0"));
    }
}
