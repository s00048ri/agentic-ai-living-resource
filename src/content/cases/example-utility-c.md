---
title: Prioritising outage reports and preparing crew briefings
organisation: Example Utility C
fictional: true
detail_level: card
summary: An energy utility uses an agent to group incoming outage reports, estimate likely causes and prepare briefings for field crews.
org_type: private-sector
ecosystem_role: deployer
sector: energy-utilities
application_area: analytical-support
intended_users: internal
client_orientation: internal-only
region: europe
deployment_stage: full-deployment
autonomy_level: human-on-the-loop
human_oversight:
  - Control-room staff confirm crew dispatch.
benefits:
  - operational-efficiency
challenges:
  - unpredictability
  - compounding-errors
responses:
  - observability-mechanisms
  - rule-based-safety-layers
model_disclosure: not-disclosed-by-design
source_type: self-reported
haip_linked: false
in_oecd_ai_subset: true
last_verified: 2026-07-30
history:
  - date: 2026-07-30
    note: Use case first submitted.
---

During storms we receive thousands of outage reports within hours. The agent groups reports by location, combines them with network data to suggest likely causes, and drafts briefings for crews. Control-room staff decide where crews go.
