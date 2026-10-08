---
title: Agent-assisted triage of transaction-monitoring alerts
organisation: Example Bank A
fictional: true
detail_level: full
summary: A bank uses an agent to gather evidence on transaction-monitoring alerts, close clear false positives within set limits and escalate the rest to analysts.
org_type: private-sector
ecosystem_role: deployer
sector: financial-services
application_area: compliance
intended_users: internal
client_orientation: internal-only
region: europe
deployment_stage: pilot
autonomy_level: human-on-the-loop
delegation:
  decisions_delegated: Closing alerts assessed as clear false positives below a defined risk threshold, with a recorded rationale.
  approvals_required: Any alert above the threshold, any case involving a new pattern, and every decision to file a suspicious activity report remain with human analysts.
  accountability_owner: The head of the financial crime compliance function remains accountable for all alert outcomes, including those closed by the agent.
human_oversight:
  - Analysts review a daily random sample of alerts closed by the agent.
  - The agent escalates automatically when evidence is incomplete or sources conflict.
  - A weekly review compares agent closures with analyst decisions on matched alerts.
benefits:
  - operational-efficiency
  - workforce-augmentation
challenges:
  - human-oversight-over-reliance
  - traceability-explainability
  - data-governance-privacy-attribution
  - evaluation-assurance
responses:
  - calibrated-human-oversight
  - access-permission-management
  - observability-mechanisms
  - agent-specific-evaluation
model_disclosure: not-disclosed-by-design
source_type: self-reported
haip_linked: true
in_oecd_ai_subset: true
lessons:
  - Agree the threshold for autonomous closure with compliance, risk and audit before the pilot starts, not after.
  - Record why an alert was closed, not only that it was closed; reviewers and auditors need the reasoning.
  - Keep a share of alerts fully human-handled so that analysts retain their own judgement.
last_verified: 2026-09-15
history:
  - date: 2026-03-02
    note: Use case first submitted.
  - date: 2026-06-10
    note: Autonomous closure extended from one alert category to three after a three-month review.
  - date: 2026-09-15
    note: Oversight section updated to describe the weekly matched-alert review.
---

Our analysts were spending most of their time on alerts that turned out to be false positives. We introduced an agent that, for each new alert, gathers the relevant account history, counterparty information and previous case notes from our internal systems, and prepares a short evidence summary.

For a limited set of alert categories, the agent can close an alert itself when the evidence clearly indicates a false positive and the alert falls below a risk threshold agreed with our compliance and audit functions. Everything else goes to an analyst with the evidence already assembled.

The hardest questions were not technical. Our technology teams were keen to expand the agent's scope quickly, while colleagues in compliance were concerned about losing visibility over closed alerts, and senior management wanted assurance before approving any expansion. We addressed this by expanding scope one alert category at a time, each time after a review of sampled closures.

Two issues remain open for us. First, we do not yet have an evaluation method we fully trust beyond comparing agent and analyst decisions. Second, our access controls were designed for people: the agent initially inherited a broad analyst role, and we had to define a narrower set of permissions specifically for it.
