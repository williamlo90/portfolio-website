---
schemaVersion: 2
slug: ai-service-desk-ticket-operations-assistant
title: AI Service Desk & Ticket Operations Assistant
descriptor: Jira service requests, bounded MCP tools, verified results
summary: "A custom MCP server connects AI clients to scoped Jira ticket tools. Python policy, PostgreSQL state, and independent human approval govern actions; target read-back verifies the result."
publicationState: published
featured: true
featuredOrder: 3
category: mcp-business-automation
status:
  label: Local workflow and integration validation complete
  detail: "Validated in a local lab with synthetic evaluations and a connected Jira-to-Keycloak access-grant journey."
  tone: verified
timeline: October 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/service-desk-jira-it1.jpg
  alt: "Jira IT-1 synthetic service request for read-only reports access, with a linked IT-2 work item."
  caption: "Actual Jira view of the synthetic IT-1 lab request"
  gallery:
    - image: ../../assets/projects/service-desk-approval.png
      alt: "Synthetic preview of the small supervisor approval page for a proposed access grant."
      caption: "Synthetic preview of independent human approval, not a capture of the connected approval session"
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
  - GitHub Actions
metrics:
  - value: "8"
    label: Scoped ticket tools exposed through MCP
  - value: "16/16"
    label: Held-out synthetic AI triage cases passed
  - value: "48"
    label: Synthetic HTTP workflows exercised
highlights:
  - label: Product
    value: "Built a custom TypeScript MCP server with eight scoped ticket tools, backed by a Python service that reads Jira requests and prepares versioned action proposals. Human approval is separate from the MCP tool set."
  - label: Verified results
    value: "A synthetic Jira IT-1 request led to a human-approved read-only Keycloak grant, target membership read-back, and a separate Jira result-property write. AI triage passed 16/16 held-out synthetic cases; 48 synthetic HTTP journeys exercised bounded recovery behavior."
  - label: Engineering
    value: "Engineered the MCP-to-Python API path with PostgreSQL state, tenant isolation, version-bound approval, durable operation identities, and target read-back for uncertain outcomes."
workflow:
  - Read a scoped Jira ticket through MCP
  - Prepare a versioned action proposal in Python
  - Review and approve the exact payload separately
  - Execute through an approval-aware worker
  - Read back the Keycloak target state
  - Record a bounded result as a Jira issue property
productionBoundary:
  label: Local lab and synthetic evaluation
  detail: "IT-1 is a synthetic Jira request in a connected local lab, not a customer ticket. The approval screenshot is a separate synthetic preview. The 16-case AI triage set and 48 HTTP workflows are synthetic evaluations; Jira workflow status was not changed. Production deployment and Azure validation remain outside the demonstrated scope."
verification:
  date: "2026-10-09"
  contentCommit: "6f4712222cfa0628bca570915988e1b9e68f2625"
  evidenceCommit: "6f4712222cfa0628bca570915988e1b9e68f2625"
  source: "Reviewed the current README, MCP tool contract, Jira-to-Keycloak walkthrough, UI guide, and release evidence at 6f47122."
---

## What I built

Built a custom TypeScript MCP server with eight scoped ticket tools, backed by a Python service that reads Jira requests and prepares versioned action proposals. The browser page is a small, separate surface for supervisor approval. Jira remains the source of the request.

## Verified outcomes

A synthetic Jira IT-1 request for read-only report access led to an approved Keycloak group grant. Target read-back verified `requester-a` in `reports-reader` before the local case closed. A later, separate operation wrote a bounded result to a Jira issue property and read it back. The Jira workflow status and comments were not changed.

OpenAI triage passed 16/16 internally designed synthetic held-out cases. A separate release exercise completed 48 synthetic HTTP journeys against an isolated PostgreSQL lab and synthetic target. These checks do not measure production throughput or business time savings.

## Architecture and reliability

Engineered the platform with Python, PostgreSQL, TypeScript/MCP, OpenAI, Jira Service Management, and Keycloak. The MCP server exposes bounded ticket tools; the Python service enforces identity, tenant scope, policy, approval, and lifecycle transitions.

PostgreSQL retains audit and operation state. The MCP tool set cannot approve its own proposed action. A supervisor approves the exact payload through a small browser page; a separate worker executes after authorization.

Approval is bound to the reviewed version and payload. If an execution receipt is lost, recovery checks the target before attempting another action. Local closure requires a verified outcome; it does not automatically change Jira workflow status.

## Validation scope

The IT-1 Jira screenshot shows the synthetic request, not the approval or a resolved Jira status. The gallery image illustrates a proposal review with disposable fixture data; it was not captured during William's connected approval. The connected Jira-to-Keycloak path and later Jira result-property write have separate records. The delivered system is a local lab; production deployment and Azure validation remain outside this evidence.

## Repository and evidence

- [GitHub repository](https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant)
- [Engineering case study](https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant/blob/main/docs/CASE-STUDY.md)
- [Jira to Keycloak integration walkthrough](https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant/blob/main/docs/JIRA-TO-KEYCLOAK-WALKTHROUGH.md)
- [MCP tool contract](https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant/blob/main/mcp-server/README.md)
- [HTTP release exercise](https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant/blob/main/docs/phase-7/release-lab.json)
