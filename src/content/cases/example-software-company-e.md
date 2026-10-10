---
title: Automated code review and test generation in a sandbox
organisation: Example Software Company E
fictional: true
detail_level: card
summary: A software company runs an agent that reviews code changes and writes tests in an isolated environment before engineers merge them.
org_type: private-sector
ecosystem_role: developer-deployer
sector: technology
application_area: software-development
intended_users: internal
client_orientation: internal-only
region: north-america
deployment_stage: full-deployment
autonomy_level: bounded-autonomy
human_oversight:
  - Engineers approve every merge.
benefits:
  - operational-efficiency
challenges:
  - task-adherence
  - compute-consumption
  - cybersecurity
responses:
  - sandboxing
  - hard-coded-boundaries
  - agent-specific-evaluation
model_disclosure: not-disclosed-by-design
source_type: self-reported
haip_linked: true
in_oecd_ai_subset: true
last_verified: 2026-09-22
history:
  - date: 2026-04-08
    note: Use case first submitted.
  - date: 2026-09-22
    note: Added compute budgets per review after unexpected cost increases.
---

For each code change, the agent reviews the diff, writes or updates tests and runs them in an isolated environment with no access to production systems. It works end to end within those limits; engineers decide what is merged.
