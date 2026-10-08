---
title: Drafting replies to residents' enquiries across multiple services
organisation: Example Public Agency B
fictional: true
detail_level: full
summary: A local public agency uses an agent to draft replies to residents' enquiries by consulting several internal procedure systems; staff review and send every reply.
org_type: public-sector
ecosystem_role: deployer
sector: public-administration
application_area: public-services
intended_users: internal
client_orientation: g2c
region: asia-pacific
deployment_stage: pilot
autonomy_level: human-in-the-loop
delegation:
  decisions_delegated: Identifying which procedures apply to an enquiry and drafting a reply that cites the relevant official guidance.
  approvals_required: Every reply is reviewed, edited where needed and sent by a member of staff. The agent cannot send messages or change any resident record.
  accountability_owner: The service team that sends the reply remains responsible for its content.
human_oversight:
  - Staff approve each reply before it is sent.
  - Each draft shows which guidance documents it relied on.
  - Replies on benefits or legal status are routed to senior staff.
benefits:
  - workforce-augmentation
  - value-creation
challenges:
  - linguistic-contextual-accuracy
  - traceability-explainability
  - task-adherence-policy-compliance
responses:
  - grounding-trusted-data
  - calibrated-human-oversight
  - local-language-capabilities
  - agentic-ready-procurement
model_disclosure: not-disclosed-by-design
source_type: interview
haip_linked: false
in_oecd_ai_subset: true
lessons:
  - The quality of drafts depended more on the state of our procedure documents than on the agent itself.
  - Residents write in several languages and in informal terms; testing only with formal language overstated accuracy.
  - Procurement questions about data location and permitted tools had to be answered before the pilot, not during it.
last_verified: 2026-08-28
history:
  - date: 2026-05-20
    note: Use case first recorded.
  - date: 2026-08-28
    note: Added a second language for drafted replies and the routing rule for benefits-related enquiries.
---

Residents contact us about many everyday procedures, such as registering a change of address or applying for local support schemes, and a single enquiry often touches several services. Staff previously had to search separate procedure systems to answer each one.

We piloted an agent that reads an incoming enquiry, identifies the procedures that may apply, consults our official guidance documents and drafts a reply in plain language. The draft lists the documents it relied on. A member of staff always reviews, edits and sends the reply; the agent cannot contact residents or change records.

Our main difficulty has been language. Residents write in more than one language and often use informal or regional expressions, and early drafts sometimes misread what was being asked or cited the wrong procedure. We now restrict the agent to our own guidance documents and are testing models with stronger local-language performance.

Because public services are held to high standards of accountability, we treat traceability as a requirement: staff must be able to see, for every draft, why a particular procedure was suggested.
