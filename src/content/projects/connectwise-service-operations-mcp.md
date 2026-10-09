---
schemaVersion: 2
slug: connectwise-service-operations-mcp
title: ConnectWise Service Operations MCP Server
descriptor: Scoped service-ticket tools, separate approval, verified writes
summary: "Six MCP tools let an operator read scoped ticket evidence, prepare an internal note or documented time, and verify the resulting record. A separate person approves the exact proposal before execution."
publicationState: published
featured: true
featuredOrder: 5
category: mcp-business-automation
status:
  label: Local workflow and reliability validation complete
  detail: "Validated against a stateful two-tenant synthetic PSA simulator mapped to a published ConnectWise API subset. No live ConnectWise tenant or cloud deployment was tested."
  tone: verified
timeline: October 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/connectwise-service-operations-mcp"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/connectwise-mcp-proposal.png
  alt: "Formatted capture of an internal-note proposal returned through the TypeScript MCP reference client against a synthetic PSA simulator."
  caption: "Recorded MCP proposal from the synthetic PSA lab; formatted evidence view, not a ConnectWise screen"
  gallery:
    - image: ../../assets/projects/connectwise-review-approval.png
      alt: "Separate approver reviewing the scoped ticket evidence and exact internal-note payload in the small browser review page."
      caption: "Separate-user review of the exact proposal before execution through MCP"
    - image: ../../assets/projects/connectwise-mcp-verified.png
      alt: "Formatted MCP receipt showing that the synthetic PSA record matched the approved note after execution."
      caption: "Recorded MCP read-back of the verified synthetic PSA write"
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
  - value: "6"
    label: "Scoped MCP tools"
  - value: "135/135"
    label: "Synthetic workload tasks completed"
  - value: "33"
    label: "Verified writes with zero observed duplicate effects"
highlights:
  - label: Product
    value: "Built a six-tool TypeScript MCP server for scoped service-ticket context, internal-note proposals, documented time, approved execution, and result verification. The browser is limited to separate-user review and outcome inspection."
  - label: Verified results
    value: "Passed 63 backend/evaluator tests, 11 real-protocol MCP scenarios, and 12 browser/MCP checks. A declared local workload completed 135/135 synthetic tasks, including 33 verified writes, with zero observed errors or duplicate effects."
  - label: Engineering
    value: "The TypeScript MCP server and small review page share a FastAPI domain service with PostgreSQL operation state, tenant isolation, exact-payload approval, audit trails, read-back verification, and recovery when a write response is lost."
workflow:
  - Read a scoped ticket through MCP
  - Prepare an internal note or documented time through MCP
  - Review and approve the exact payload separately
  - Execute the approved operation through MCP
  - Verify the downstream PSA record
  - Reconcile an unknown outcome without reposting
productionBoundary:
  label: Synthetic local validation
  detail: "The recorded MCP responses and human-review page use a synthetic PSA simulator, not a live ConnectWise tenant. The workload is finite and local; cloud deployment was not validated."
verification:
  date: "2026-10-09"
  contentCommit: "2c293af24481ca3e05901e328816374b6cd8b809"
  evidenceCommit: "2c293af24481ca3e05901e328816374b6cd8b809"
  source: "Reviewed current README, MCP walkthrough, portfolio copy, and linked regression/workload evidence at 2c293af."
---

## What I built

Built a six-tool TypeScript MCP server for service-ticket operations. The operator uses MCP to read scoped ticket evidence, prepare an internal note or documented time, execute after separate approval, and verify the downstream result. The browser is intentionally a small review and outcome-inspection surface, not an operator workspace.

## Verified outcomes

Passed 63 backend/evaluator tests, 11 real-protocol MCP scenarios, and 12 browser/MCP checks. A declared local workload completed 135/135 synthetic tasks, including 33 verified writes, with zero observed errors or duplicate effects against the stateful simulator.

The connected walkthrough records a scoped ticket read, an internal-note proposal, a distinct approver's review, MCP execution, and a matching read-back. A lost-response case remains `unknown` until the existing operation is verified; it does not repost the note.

## Architecture and reliability

Engineered the TypeScript MCP server and small review page around a shared Python/FastAPI domain service. It owns tenant scope, authorization, proposal freshness, separate-user approval, dispatch, and verification; PostgreSQL retains audit, operation, and synchronization state.

Optional OpenAI/Ollama assistance selects attributed source evidence; it cannot approve or execute. A read-only worker synchronizes ticket source data. The approval is bound to the reviewed payload and fresh source state before the original operator executes through MCP.

A lost write response is recorded as an unknown outcome. The operator reconciles and verifies the downstream record before attempting another write. A scheduled worker refreshes source data and a local monitor records health and alerts.

## Validation scope

The showcase images format actual reference-client MCP responses against an isolated two-tenant synthetic PSA simulator. They do not depict a ConnectWise screen or a live tenant. The 135-task run is a finite local workload, not customer productivity or cloud-capacity evidence. Live ConnectWise tenant and Azure validation remain outside this scope.

## Repository and evidence

- [GitHub repository](https://github.com/williamlo90/connectwise-service-operations-mcp)
- [Engineering case study](https://github.com/williamlo90/connectwise-service-operations-mcp/blob/main/docs/CASE-STUDY.md)
- [Recorded MCP-to-PSA walkthrough](https://github.com/williamlo90/connectwise-service-operations-mcp/blob/main/docs/MCP-WALKTHROUGH.md)
- [Six-tool MCP contract](https://github.com/williamlo90/connectwise-service-operations-mcp/blob/main/docs/MCP-TOOL-MAP.md)
- [Acceptance checklist](https://github.com/williamlo90/connectwise-service-operations-mcp/blob/main/docs/ACCEPTANCE-CHECKLIST.md)
- [Reliability qualification](https://github.com/williamlo90/connectwise-service-operations-mcp/blob/main/docs/PHASE-7-DELIVERY.md)
