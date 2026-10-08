---
schemaVersion: 2
slug: connectwise-service-operations-mcp
title: ConnectWise Service Operations MCP
descriptor: Approved ticket updates with verified receipts
summary: "A service-operations MCP server and operator workspace for scoped ticket context, internal notes, and evidence-backed time entries with separate-user approval."
publicationState: published
featured: true
featuredOrder: 0
status:
  label: Local workflow and reliability validation complete
  detail: "Validated against a stateful two-tenant PSA simulator aligned with a publicly documented ConnectWise PSA API subset. Live ConnectWise tenant and cloud deployment validation remain pending."
  tone: verified
timeline: October 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/connectwise-service-operations-mcp"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/connectwise-workspace.png
  alt: "ConnectWise Service Operations MCP operator workspace showing synthetic business records."
  caption: Working application with synthetic data
  gallery:
    - image: ../../assets/projects/connectwise-approval.png
      alt: Separate approver reviewing a synthetic ticket update and its source evidence.
      caption: Separate-user approval before a ticket write
intendedUsers:
  - Operations specialist
  - Independent approver
  - Administrator
stack:
  - TypeScript
  - MCP
  - Python
  - FastAPI
  - PostgreSQL
  - Docker
  - OpenAI
  - Ollama
metrics:
  - value: "135/135"
    label: "Synthetic workload tasks completed"
  - value: "33"
    label: "Verified writes with zero observed duplicate effects"
  - value: "6"
    label: "Scoped MCP tools"
highlights:
  - label: Product
    value: "Built a service-operations MCP server aligned with a publicly documented ConnectWise PSA API subset, exposing six tools for scoped ticket context, internal notes, and evidence-backed time entries with separate-user approval."
  - label: Verified results
    value: "Validated 62 automated tests, 11 MCP protocol scenarios, and eight browser checks; completed 135 synthetic workload tasks, including 33 verified writes, with zero observed errors or duplicate effects against a stateful PSA simulator."
  - label: Engineering
    value: "Engineered the platform with TypeScript, FastAPI, PostgreSQL, Docker, and optional OpenAI/Ollama assistance; implemented a responsive operator workspace, tenant isolation, audit trails, durable synchronization, and read-back verification with unknown-outcome recovery."
workflow:
  - Scoped ticket context
  - Prepare note or time entry
  - Separate-user approval
  - Execute
  - Read-back verification
  - Reconcile unknown outcome
productionBoundary:
  label: Synthetic local validation
  detail: "Validated against a stateful two-tenant PSA simulator aligned with a publicly documented ConnectWise PSA API subset. Live ConnectWise tenant and cloud deployment validation remain pending."
verification:
  date: "2026-10-08"
  contentCommit: "942eb57554511b7d9c2a69246eaf5fb95cbb9f74"
  evidenceCommit: "942eb57554511b7d9c2a69246eaf5fb95cbb9f74"
  source: "Reviewed repository README and linked evidence inventory at 942eb57."
---

## What I built

Built a service-operations MCP server aligned with a publicly documented ConnectWise PSA API subset, exposing six tools for scoped ticket context, internal notes, and evidence-backed time entries with separate-user approval.

## Verified outcomes

Validated 62 automated tests, 11 MCP protocol scenarios, and eight browser checks; completed 135 synthetic workload tasks, including 33 verified writes, with zero observed errors or duplicate effects against a stateful PSA simulator.

## Architecture and reliability

Engineered the platform with TypeScript, FastAPI, PostgreSQL, Docker, and optional OpenAI/Ollama assistance; implemented a responsive operator workspace, tenant isolation, audit trails, durable synchronization, and read-back verification with unknown-outcome recovery.

The browser and MCP clients share a FastAPI domain service that owns authorization, proposal freshness, approval, dispatch, and verification. PostgreSQL retains operations and synchronization checkpoints. Optional AI selects attributed source evidence; a separate person approves the exact proposed write.

A lost write response is recorded as an unknown outcome. The operator reconciles and verifies the downstream record before attempting another write. A scheduled worker refreshes source data and a local monitor records health and alerts.

## Validation scope

Validated against a stateful two-tenant PSA simulator aligned with a publicly documented ConnectWise PSA API subset. Live ConnectWise tenant and cloud deployment validation remain pending.

## Repository and evidence

- [GitHub repository](https://github.com/williamlo90/connectwise-service-operations-mcp)
- [Engineering case study](https://github.com/williamlo90/connectwise-service-operations-mcp/blob/main/docs/CASE-STUDY.md)
- [Acceptance checklist](https://github.com/williamlo90/connectwise-service-operations-mcp/blob/main/docs/ACCEPTANCE-CHECKLIST.md)
- [Reliability qualification](https://github.com/williamlo90/connectwise-service-operations-mcp/blob/main/docs/PHASE-7-DELIVERY.md)
