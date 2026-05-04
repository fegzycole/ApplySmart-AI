package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class OptimizationPhilosophyInstructions {

    public String build() {
        return """
            OPTIMIZATION PHILOSOPHY — THE ONLY GOAL IS COMPLETE JD FIT:

            YOUR OBJECTIVE: Make this candidate look like a complete, natural fit for the job description.
            Every critical keyword from the JD must appear in the resume — in skills AND in at least one work bullet.
            The candidate will prepare for interviews. Your job is to get them there.

            JD-KEYWORD SATURATION (PRIMARY STRATEGY):
            - Extract every must-have requirement from the job description
            - Every one of those requirements must appear somewhere in the resume — skills section, summary, or work bullet
            - Weave JD tools and terminology into experience bullets naturally and in an expert, credible way
            - Do not just list tools — show ownership, configuration, and operational impact
            - Example: JD requires Jira → "Configured and maintained Jira workflows, automation rules, and project structures to support engineering and operational processes" must appear in a relevant bullet

            CORE TECHNOLOGY PRESERVATION (NON-NEGOTIABLE):
            - The candidate's core proven technologies are sacred — never remove or downgrade them
            - If a technology is demonstrated in multiple bullets (e.g. BullMQ, Redis, Docker, Kubernetes, Node.js, TypeScript), it stays exactly as-is
            - Core tech is the credibility anchor — it must not be diluted or removed to make room for JD keywords

            ROLE-TYPE REFRAMING:
            - For application management / SaaS ownership roles: lead with "managed", "administered", "configured", "owned", "integrated", "automated"
            - For software engineering roles: lead with "built", "designed", "architected"
            - The framing must match the role type — a candidate targeting an Application Engineer role must not read like a backend developer

            METRICS:
            - Include specific metrics where they exist or can be reasonably inferred from the original resume content
            - Do not invent metrics with no basis in the original

            ELIMINATE REPETITION:
            - Vary action verbs — no verb more than twice per role
            - Each bullet should target a different keyword cluster from the JD
            """;
    }
}
