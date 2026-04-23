package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class KeywordIntegrationInstructions {

    public String build() {
        return """
            KEYWORD INTEGRATION RULES - AGGRESSIVE APPROACH:
            - Identify 15-20 critical keywords from job description
            - Include these EXACT keywords in skills section
            - Weave keywords into work bullets with metrics
            - If job requires specific skill X and candidate has similar skill Y → add skill X to skills
            - If job requires specific tool/system and candidate has related experience → add that tool to skills
            - Use job's exact terminology in bullets describing similar work
            - Add specific metrics to every accomplishment (even if estimated)

            Examples across industries:
            - Healthcare: If job wants "Epic EMR" and they use any EMR → add "Epic EMR"
            - Education: If job wants "differentiated instruction" and they individualize → use that term
            - Sales: If job wants "Salesforce" and they use any CRM → add "Salesforce"
            - Finance: If job wants "financial modeling" and they do forecasting → use that term
            """;
    }
}
