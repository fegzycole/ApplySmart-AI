package ai.applysmart.service.prompt;

import org.springframework.stereotype.Component;

@Component
public class SummaryOptimizationInstructions {

    public String build() {
        return """
            1. PROFESSIONAL SUMMARY (3-4 sentences MAX) - CRITICAL FOR SCORE:
               - MUST be concise, specific, and metric-driven
               - NO generic phrases: avoid "proven track record", "extensive experience", "passionate about"
               - Each sentence must have DIFFERENT keywords (no repetition)
               - MUST include at least 1-2 specific metrics or scale indicators

               ROLE-TYPE ALIGNMENT IN SUMMARY:
               - Before writing, identify the primary role type from the JD (e.g. application management, software engineering, data, design)
               - Open with the title or framing that mirrors the JD's role — not necessarily the candidate's last job title
               - Sentence 1 must reference the candidate's most directly relevant domain to the JD
               - If the JD emphasizes specific platforms, ecosystems, or toolsets the candidate has experience with, name them in the summary

               ROLE-TYPE FRAMING — ADAPT TO THE JD:
               - Read the JD and identify what kind of professional it is hiring — then frame the summary as that person
               - Tech / platform roles: lead with ownership, administration, automation, and operational impact — not programming language lists
               - Clinical / healthcare roles: lead with patient outcomes, care coordination, compliance, and clinical domain expertise
               - Marketing / growth roles: lead with campaign results, channel ownership, and revenue or engagement impact
               - Finance / accounting roles: lead with accuracy, compliance, reporting scope, and financial impact
               - Sales roles: lead with quota attainment, deal size, pipeline, and territory or account ownership
               - Operations / project management: lead with process ownership, cross-functional coordination, and delivery outcomes
               - If the JD names specific tools, systems, or methodologies the candidate has experience with, name them in the summary — this is the primary ATS and hiring signal
               - The summary must make the reader think "this is exactly the person we described in the job posting"

               STRATEGIC VISION (required when the JD asks for "clear vision", "strategic thinking", or "think outside the box"):
               - Include one sentence that frames the candidate's philosophy or approach — not just what they did, but how they think about it
               - Example: "Approaches SaaS tooling with a governance-first mindset — building for auditability, scalability, and minimal operational toil from day one."
               - This differentiates execution-only candidates from senior/strategic ones

               SENIORITY SIGNALS (required for Senior or Staff level roles):
               - The summary must contain signals from at least TWO of these three categories:
                 1. Architectural ownership: "defined the architecture for...", "established the standard for...", "drove adoption of..."
                 2. Mentoring / growing others: "mentored engineers on...", "accelerated onboarding of...", "acted as technical authority for..."
                 3. Strategic vision: "approaches [domain] with a [philosophy]-first mindset...", "builds for [long-term outcome] rather than short-term fixes..."
               - Avoid purely task-level language — Senior/Staff candidates own domains and shape how others work
               - A summary that only lists what was done reads as a strong IC. A summary that includes how the candidate shaped the team and platform reads as a senior leader.

               MANDATORY FORMAT:
               Sentence 1: [Role framing aligned with JD] with [X] years + [most JD-relevant skill areas] + [1 metric/scale]
               Sentence 2: [Execution evidence directly relevant to JD responsibilities] + [specific result/metric]
               Sentence 3: [Strategic vision OR mentoring/influence signal] + [cross-team or organisational impact]
            """;
    }
}
