---
schemaVersion: 2
slug: ai-service-desk-ticket-operations-assistant
title: AI Service Desk & Ticket Operations Assistant
descriptor: From Jira tickets to human-approved, verified actions
summary: "An AI-assisted service desk platform that turns Jira tickets into evidence-backed recommendations and versioned action proposals, with human approval for consequential actions."
publicationState: published
featured: true
featuredOrder: 5
category: mcp-business-automation
status:
  label: Local workflow and integration validation complete
  detail: "Validated in a local lab with synthetic evaluations and connected Jira/Keycloak sandbox checks."
  tone: verified
timeline: October 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/service-desk-review.jpg
  alt: Service desk browser workspace reviewing a synthetic access proposal before human approval.
  caption: Proposal review workspace with synthetic data
  gallery:
    - image: ../../assets/projects/service-desk-practice.jpg
      alt: AI practice workspace showing source evidence and next-step guidance.
      caption: Source-backed evidence and next-step guidance
intendedUsers:
  - Service desk operator
  - Supervisor
  - Administrator
stack:
  - Python
  - PostgreSQL
  - TypeScript
  - MCP
  - OpenAI
  - Jira Service Management
  - Keycloak
  - JavaScript
  - GitHub Actions
metrics:
  - value: "16/16"
    label: Held-out synthetic AI triage cases passed
  - value: "48"
    label: Synthetic HTTP workflows exercised
  - value: "183"
    label: Python regression tests passed, plus 8 MCP tests and 21 JavaScript checks
highlights:
  - label: Product
    value: "Built an AI-assisted service desk platform that converts Jira tickets into evidence-backed recommendations and versioned action proposals, with human approval for access grants, service recovery, and related-ticket operations."
  - label: Verified results
    value: "Validated AI triage on 16/16 held-out synthetic cases and exercised 48 synthetic HTTP workflows; verified platform behavior through 183 Python tests, 8 MCP tests, and 21 JavaScript checks, with automated regression and secret scanning in GitHub Actions."
  - label: Engineering
    value: "Engineered the platform with Python, PostgreSQL, TypeScript/MCP, OpenAI, Jira Service Management, and Keycloak; implemented tenant isolation, payload-bound approvals, durable operation identities, and target verification to reconcile uncertain outcomes and prevent duplicate effects."
workflow:
  - Read Jira ticket and source evidence
  - Clarify missing information
  - Persist a versioned action proposal
  - Human approval of the exact payload
  - Execute with a durable operation identity
  - Verify the target and reconcile uncertain outcomes
productionBoundary:
  label: Local lab and synthetic evaluation
  detail: "The 16-case triage set is synthetic and internally designed. The 48 HTTP workflows use an isolated PostgreSQL lab and synthetic target, not live Jira/Keycloak throughput. Connected sandbox checks are separate. Production deployment and Azure validation remain outside the demonstrated scope."
verification:
  date: "2026-10-09"
  contentCommit: "77fbebbb18dcb3a5766a1968964d0c15db08b486"
  evidenceCommit: "77fbebbb18dcb3a5766a1968964d0c15db08b486"
  source: "Reviewed repository README, UI validation, case study, and phase-7 release-lab results."
---

## What I built

Built an AI-assisted service desk platform that converts Jira tickets into evidence-backed recommendations and versioned action proposals, with human approval for access grants, service recovery, and related-ticket operations.

## Verified outcomes

Validated AI triage on 16/16 held-out synthetic cases and exercised 48 synthetic HTTP workflows; verified platform behavior through 183 Python tests, 8 MCP tests, and 21 JavaScript checks, with automated regression and secret scanning in GitHub Actions.

The JavaScript total comprises 14 quote/next-step assertions and seven approval UI behavioral tests. The HTTP release exercise includes eight normal, 16 peak-concurrency, and 24 smoke-soak workflows against an isolated PostgreSQL lab and synthetic target. These are workflow checks, not production throughput or business time-savings measurements.

## Architecture and reliability

Engineered the platform with Python, PostgreSQL, TypeScript/MCP, OpenAI, Jira Service Management, and Keycloak; implemented tenant isolation, payload-bound approvals, durable operation identities, and target verification to reconcile uncertain outcomes and prevent duplicate effects.

The Python domain service owns policy, identity, proposal versions, and lifecycle transitions. PostgreSQL retains audit and operation state. The browser and MCP interface prepare proposals, while a separate approval-aware worker executes permitted actions.

Approval is bound to the reviewed version and payload. If an execution receipt is lost, recovery checks the target before attempting another action. Local closure requires a verified outcome; it does not automatically change Jira workflow status.

## Validation scope

OpenAI passed an internally designed synthetic held-out set. Connected evidence separately covers browser-approved access verification in Keycloak and bounded Jira read/write integration. The delivered system is a local lab; production deployment, extended endurance, and Azure validation are not claimed.

## Repository and evidence

- [GitHub repository](https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant)
- [Engineering case study](https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant/blob/main/docs/CASE-STUDY.md)
- [UI validation and screenshots](https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant/blob/main/docs/WEB-UI.md)
- [HTTP release exercise](https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant/blob/main/docs/phase-7/release-lab.json)
