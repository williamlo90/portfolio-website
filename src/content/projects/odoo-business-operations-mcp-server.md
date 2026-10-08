---
schemaVersion: 2
slug: odoo-business-operations-mcp-server
title: Odoo Business Operations MCP Server
descriptor: Business operations with independent approval
summary: "An AI-assisted Odoo operations platform with four reusable business skills and ten scoped MCP tools for customer research, quotation preparation, CRM follow-ups, and write reconciliation."
publicationState: published
featured: true
featuredOrder: 4
category: mcp-business-automation
status:
  label: Local workflow and reliability validation complete
  detail: "Validated with synthetic local data against Odoo. Workload evidence comes from Phase 8 and browser acceptance from Phase 9A. Azure deployment remains pending."
  tone: verified
timeline: October 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/odoo-business-operations-mcp-server"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/odoo-workspace.png
  alt: "Odoo Business Operations MCP Server operator workspace showing synthetic business records."
  caption: Working application with synthetic data
  gallery:
    - image: ../../assets/projects/odoo-receipt.png
      alt: Odoo quotation review with approval and verified business receipt using synthetic data.
      caption: Independent approval and verified Odoo receipt
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
  - Odoo
  - Docker Compose
metrics:
  - value: "124"
    label: "Synthetic workload tasks completed"
  - value: "31/31"
    label: "Quotation writes with exactly one order across replay checks"
  - value: "13"
    label: "Browser acceptance checks passed"
highlights:
  - label: Product
    value: "Built an AI-assisted Odoo operations platform with four reusable business skills and ten scoped MCP tools for customer research, quotation preparation, CRM follow-ups, and write reconciliation, enforcing tenant isolation and independent human approval."
  - label: Verified results
    value: "Validated 124 synthetic workload tasks, including 31 quotation writes with exactly one Odoo order per operation across replay checks; passed 13 browser acceptance checks covering approval separation, cross-company access denial, and recovery after a lost execution response."
  - label: Engineering
    value: "Engineered the platform with TypeScript, Python/FastAPI, PostgreSQL, Odoo, and Docker Compose; delivered a responsive web workspace with source-bound approvals, idempotent execution, verified business receipts, and persistent worker recovery."
workflow:
  - Resolve customer and products
  - Prepare immutable proposal
  - Independent approval
  - Idempotent execution
  - Verify Odoo receipt
  - Reconcile uncertain writes
productionBoundary:
  label: Synthetic local validation
  detail: "Validated with synthetic local data against Odoo. Workload evidence comes from Phase 8 and browser acceptance from Phase 9A. Azure deployment remains pending."
verification:
  date: "2026-10-08"
  contentCommit: "135eafd3e0162e71dfc1793c2141a0b3de4f115d"
  evidenceCommit: "135eafd3e0162e71dfc1793c2141a0b3de4f115d"
  source: "Reviewed repository README and linked evidence inventory at 135eafd."
---

## What I built

Built an AI-assisted Odoo operations platform with four reusable business skills and ten scoped MCP tools for customer research, quotation preparation, CRM follow-ups, and write reconciliation, enforcing tenant isolation and independent human approval.

## Verified outcomes

Validated 124 synthetic workload tasks, including 31 quotation writes with exactly one Odoo order per operation across replay checks; passed 13 browser acceptance checks covering approval separation, cross-company access denial, and recovery after a lost execution response.

## Architecture and reliability

Engineered the platform with TypeScript, Python/FastAPI, PostgreSQL, Odoo, and Docker Compose; delivered a responsive web workspace with source-bound approvals, idempotent execution, verified business receipts, and persistent worker recovery.

The browser, MCP client, and persistent worker share the same domain authorization and execution rules. Odoo remains the source of business records. Approval binds the reviewer to an exact proposal and its source state; an operation ledger and downstream read-back provide evidence of completion.

The persistent worker uses deduplication, leases, and bounded recovery. Replay checks verify that retries retain one Odoo order per operation. Lost-response recovery reconciles the existing business record.

## Validation scope

Validated with synthetic local data against Odoo. Workload evidence comes from Phase 8 and browser acceptance from Phase 9A. Azure deployment remains pending.

## Repository and evidence

- [GitHub repository](https://github.com/williamlo90/odoo-business-operations-mcp-server)
- [Engineering case study](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/main/docs/portfolio/CASE_STUDY.md)
- [Reliability results](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/main/docs/PHASE-8.md)
- [Browser acceptance](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/main/docs/PHASE-9A.md)
