package ai.applysmart.service.impl;

import ai.applysmart.dto.resume.ParsedResumeDto;
import ai.applysmart.service.ResumeMatchScorer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class ResumeMatchScorerImpl implements ResumeMatchScorer {

    private static final int BASE_SCORE = 50;
    private static final int MAX_KEYWORD_BONUS = 40;
    private static final int EXPERIENCE_BONUS = 15;
    private static final int MAX_SCORE = 100;
    private static final int MAX_IMPROVEMENT = 45;  // Allow up to 45 point improvement for aggressive optimization

    @Override
    public int calculateScore(ParsedResumeDto resume, String jobDescription) {
        if (isInvalidInput(resume, jobDescription)) {
            return BASE_SCORE;
        }

        int score = BASE_SCORE;
        score += calculateKeywordBonus(resume, jobDescription);
        score += calculateExperienceBonus(resume);
        score += calculateContentQualityBonus(resume);

        return Math.min(score, MAX_SCORE);
    }

    @Override
    public int capScoreImprovement(int originalScore, int optimizedScore) {
        int improvement = optimizedScore - originalScore;
        if (improvement > MAX_IMPROVEMENT) {
            return originalScore + MAX_IMPROVEMENT;
        }
        return optimizedScore;
    }

    private boolean isInvalidInput(ParsedResumeDto resume, String jobDescription) {
        return resume == null || jobDescription == null;
    }

    private int calculateKeywordBonus(ParsedResumeDto resume, String jobDescription) {
        String resumeText = extractResumeText(resume);
        List<String> keywords = extractKeywords(jobDescription.toLowerCase());

        if (keywords.isEmpty()) {
            return 0;
        }

        // Count exact matches
        long exactMatches = countMatches(resumeText.toLowerCase(), keywords);

        // Also give partial credit for related terms (more generous scoring)
        long partialMatches = countPartialMatches(resumeText.toLowerCase(), keywords);

        // Calculate match percentage with bonuses for partial matches
        double totalMatches = exactMatches + (partialMatches * 0.5);  // Partial matches count as 50%
        double matchPercent = Math.min(1.0, totalMatches / keywords.size());

        // Apply generous scoring curve - even 40% keyword match should give good score
        double adjustedPercent = Math.pow(matchPercent, 0.7);  // Curve makes lower matches more valuable

        return (int) (adjustedPercent * MAX_KEYWORD_BONUS);
    }

    private int calculateExperienceBonus(ParsedResumeDto resume) {
        boolean hasExperience = resume.getWorkExperience() != null &&
                !resume.getWorkExperience().isEmpty();
        return hasExperience ? EXPERIENCE_BONUS : 0;
    }

    private String extractResumeText(ParsedResumeDto resume) {
        StringBuilder text = new StringBuilder();

        appendIfPresent(text, resume.getSummary());
        appendSkills(text, resume);
        appendWorkExperience(text, resume);

        return text.toString();
    }

    private void appendIfPresent(StringBuilder builder, String value) {
        if (value != null && !value.isEmpty()) {
            builder.append(value).append(" ");
        }
    }

    private void appendSkills(StringBuilder builder, ParsedResumeDto resume) {
        if (resume.getSkills() != null) {
            builder.append(String.join(" ", resume.getSkills())).append(" ");
        }
    }

    private void appendWorkExperience(StringBuilder builder, ParsedResumeDto resume) {
        if (resume.getWorkExperience() == null) {
            return;
        }

        resume.getWorkExperience().forEach(exp -> {
            appendIfPresent(builder, exp.getPosition());
            if (exp.getResponsibilities() != null) {
                builder.append(String.join(" ", exp.getResponsibilities())).append(" ");
            }
        });
    }

    private List<String> extractKeywords(String jobDescription) {
        String cleanedText = cleanJobDescription(jobDescription);
        List<String> extractedKeywords = new java.util.ArrayList<>();

        // Priority 1: Capitalized terms (tools, technologies, certifications)
        List<String> capitalizedTerms = extractCapitalizedTerms(jobDescription);
        extractedKeywords.addAll(capitalizedTerms);

        // Priority 2: Required terms (most important)
        List<String> requiredTerms = extractRequiredTerms(cleanedText);
        extractedKeywords.addAll(requiredTerms);

        // Priority 3: Experience requirements
        List<String> experienceTerms = extractExperienceRequirements(jobDescription);
        extractedKeywords.addAll(experienceTerms);

        // Priority 4: Multi-word phrases (concepts, methodologies)
        List<String> phrases = extractMultiWordPhrases(cleanedText);
        extractedKeywords.addAll(phrases);

        // Priority 5: Action verbs and skills from job description
        extractedKeywords.addAll(extractActionSkills(cleanedText));

        // Return more keywords for better matching (increased from 15 to 35)
        return extractedKeywords.stream()
                .distinct()
                .limit(35)
                .toList();
    }

    private String cleanJobDescription(String jobDescription) {
        return jobDescription.toLowerCase()
                .replaceAll("[^a-z0-9\\s.+-/#]", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    private List<String> extractMultiWordPhrases(String text) {
        List<String> phrases = new java.util.ArrayList<>();
        String[] words = text.split("\\s+");

        for (int i = 0; i < words.length - 1; i++) {
            String twoWord = words[i] + " " + words[i + 1];
            if (isPotentialKeyword(twoWord)) {
                phrases.add(twoWord);
            }

            if (i < words.length - 2) {
                String threeWord = words[i] + " " + words[i + 1] + " " + words[i + 2];
                if (isPotentialKeyword(threeWord)) {
                    phrases.add(threeWord);
                }
            }
        }

        return phrases;
    }

    private List<String> extractCapitalizedTerms(String originalText) {
        List<String> terms = new java.util.ArrayList<>();
        String[] words = originalText.split("\\s+");

        for (String word : words) {
            if (isCapitalizedTerm(word)) {
                terms.add(word.toLowerCase());
            }
        }

        return terms;
    }

    private List<String> extractRequiredTerms(String text) {
        List<String> requiredTerms = new java.util.ArrayList<>();

        String[] requirementPhrases = {
                "required:", "must have:", "must-have:", "required skills:",
                "experience with", "proficiency in", "proficient in",
                "knowledge of", "expertise in", "familiar with",
                "strong understanding of", "deep knowledge of",
                "certification in", "certified in",
                "proven experience in", "demonstrated ability in"
        };

        for (String phrase : requirementPhrases) {
            int index = text.indexOf(phrase);
            while (index != -1 && requiredTerms.size() < 20) {
                String followingText = text.substring(index + phrase.length()).trim();
                String[] nextWords = followingText.split("\\s+");

                StringBuilder termBuilder = new StringBuilder();
                for (int i = 0; i < Math.min(4, nextWords.length); i++) {
                    String word = nextWords[i];
                    if (isPotentialKeyword(word)) {
                        if (termBuilder.length() > 0) {
                            termBuilder.append(" ");
                        }
                        termBuilder.append(word);
                    } else {
                        break;
                    }
                }

                if (termBuilder.length() > 0) {
                    requiredTerms.add(termBuilder.toString());
                }

                index = text.indexOf(phrase, index + phrase.length());
            }
        }

        return requiredTerms;
    }

    private boolean isPotentialKeyword(String term) {
        if (term.length() < 3) {
            return false;
        }

        String[] commonWords = {
                "the", "and", "for", "with", "you", "will", "our", "are", "have",
                "this", "that", "from", "they", "been", "other", "which", "their",
                "would", "about", "than", "into", "could", "should", "does", "being"
        };

        return Arrays.stream(commonWords).noneMatch(term::equals);
    }

    private boolean isCapitalizedTerm(String word) {
        if (word.length() < 2) {
            return false;
        }
        return Character.isUpperCase(word.charAt(0)) &&
               (word.matches("^[A-Z][a-zA-Z0-9+#.-]*$") || word.matches("^[A-Z]{2,}$"));
    }

    private List<String> extractExperienceRequirements(String originalText) {
        List<String> requirements = new java.util.ArrayList<>();

        String[] patterns = {
                "\\d+\\+?\\s*years?\\s*(?:of\\s*)?(?:experience\\s*)?(?:with|in)\\s+([\\w\\s-]+?)(?:[,.]|$)",
                "experience\\s+(?:with|in)\\s+([\\w\\s-]+?)(?:[,.]|$)",
                "proficiency\\s+(?:with|in)\\s+([\\w\\s-]+?)(?:[,.]|$)",
                "expertise\\s+(?:with|in)\\s+([\\w\\s-]+?)(?:[,.]|$)"
        };

        for (String pattern : patterns) {
            java.util.regex.Pattern p = java.util.regex.Pattern.compile(pattern, java.util.regex.Pattern.CASE_INSENSITIVE);
            java.util.regex.Matcher m = p.matcher(originalText);

            while (m.find() && requirements.size() < 10) {
                String term = m.group(1).trim().toLowerCase();
                if (isPotentialKeyword(term) && term.split("\\s+").length <= 3) {
                    requirements.add(term);
                }
            }
        }

        return requirements;
    }

    private long countMatches(String text, List<String> keywords) {
        return keywords.stream()
                .filter(text::contains)
                .count();
    }

    private long countPartialMatches(String text, List<String> keywords) {
        return keywords.stream()
                .filter(keyword -> !text.contains(keyword))  // Only check keywords not already matched
                .filter(keyword -> {
                    // Check for partial/related terms
                    String[] keywordParts = keyword.split("\\s+");
                    if (keywordParts.length > 1) {
                        // Multi-word keyword: check if any part matches
                        return Arrays.stream(keywordParts)
                                .anyMatch(part -> part.length() > 3 && text.contains(part));
                    }
                    // Single word: check for root word matches (e.g., "develop" matches "developer")
                    return text.contains(keyword.substring(0, Math.min(keyword.length(), keyword.length() - 2)));
                })
                .count();
    }

    private int calculateContentQualityBonus(ParsedResumeDto resume) {
        int bonus = 0;

        // Bonus for having a professional summary
        if (resume.getSummary() != null && resume.getSummary().length() > 50) {
            bonus += 3;
        }

        // Bonus for having multiple work experiences
        if (resume.getWorkExperience() != null) {
            bonus += Math.min(4, resume.getWorkExperience().size());
        }

        // Bonus for having quantifiable achievements (contains numbers)
        if (resume.getWorkExperience() != null) {
            boolean hasNumbers = resume.getWorkExperience().stream()
                    .flatMap(exp -> exp.getResponsibilities() != null ? exp.getResponsibilities().stream() : java.util.stream.Stream.empty())
                    .anyMatch(resp -> resp.matches(".*\\d+.*"));
            if (hasNumbers) {
                bonus += 3;
            }
        }

        return Math.min(bonus, 10);  // Cap quality bonus at 10 points
    }

    private List<String> extractActionSkills(String text) {
        List<String> skills = new java.util.ArrayList<>();

        // Common skill-related patterns in job descriptions
        String[] skillPatterns = {
                "ability to", "experience in", "skills in", "background in",
                "understanding of", "familiarity with", "working knowledge"
        };

        for (String pattern : skillPatterns) {
            int index = text.indexOf(pattern);
            while (index != -1 && skills.size() < 20) {
                String followingText = text.substring(index + pattern.length()).trim();
                String[] words = followingText.split("\\s+");

                // Extract next 1-3 words as potential skill
                StringBuilder skill = new StringBuilder();
                for (int i = 0; i < Math.min(3, words.length); i++) {
                    String word = words[i];
                    if (isPotentialKeyword(word)) {
                        if (skill.length() > 0) skill.append(" ");
                        skill.append(word);
                    } else {
                        break;
                    }
                }

                if (skill.length() > 0) {
                    skills.add(skill.toString());
                }

                index = text.indexOf(pattern, index + pattern.length());
            }
        }

        return skills;
    }
}
