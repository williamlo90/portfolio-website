---
schemaVersion: 2
slug: odoo-business-operations-mcp-server
title: Odoo Business Operations MCP Server
descriptor: Browser and MCP workflows with independent approval and Odoo read-back
summary: "Operators prepare quotations and CRM activities in a browser or through bounded MCP tools. A separate person approves the exact proposal, and the resulting Odoo record is read back before success is reported."
publicationState: published
featured: true
featuredOrder: 4
category: mcp-business-automation
status:
  label: Local browser and MCP workflows validated
  detail: "The responsive workspace and MCP path were checked with synthetic local Odoo data. Azure runtime validation is pending."
  tone: verified
timeline: October 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/odoo-business-operations-mcp-server"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/odoo-web-queue.png
  alt: "Actual local Odoo operations workspace showing the synthetic company work queue."
  caption: "Local browser workspace with synthetic company-scoped proposals"
  gallery:
    - image: ../../assets/projects/odoo-web-receipt.png
      alt: "Actual local browser quotation review and verified Odoo draft receipt."
      caption: "Quotation review, separate approval, and Odoo draft receipt in the local lab"
    - image: ../../assets/projects/odoo-web-mobile.png
      alt: "Mobile-width view of the Odoo operations browser workspace."
      caption: "The same browser workflow at a mobile viewport"
intendedUsers:
  - Sales operations specialist
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
  - value: "10"
    label: "Bounded MCP tools backed by one domain service"
  - value: "13"
    label: "Local browser acceptance checks passed"
  - value: "31/31"
    label: "Synthetic quotation writes with one Odoo order across replay checks"
highlights:
  - label: Product
    value: "Built a responsive browser workspace for quotation and CRM preparation, independent review, operator execution, and saved Odoo receipts. The CLI assistant and worker use four reusable skills through ten bounded MCP tools."
  - label: Verified results
    value: "Thirteen browser checks covered separate approval, company isolation, mobile layout, reload and lost-response recovery. A separate Phase 8 local workload completed 124 synthetic tasks, including 31 quotation writes with exactly one Odoo order per operation across replay checks."
  - label: Engineering
    value: "The browser and TypeScript MCP server share a Python/FastAPI domain service for tenant scope, immutable proposals, payload-bound approval, durable operation IDs, idempotency, Odoo read-back, and worker recovery."
workflow:
  - Resolve a company-scoped customer and catalog item
  - Prepare a quotation or CRM activity in the browser or through MCP
  - Review and approve the exact saved proposal as another person
  - Execute as the original operator
  - Inspect the verified Odoo receipt and reconcile uncertain outcomes
productionBoundary:
  label: Synthetic local validation
  detail: "The browser checks and Phase 8 workload used synthetic local records. A draft quotation is not a confirmed sale. The result sets belong to different checkpoints; Azure hosting and customer operations were not validated."
verification:
  date: "2026-10-13"
  contentCommit: "44b03db0f60c15dc389a43e6f9e18765f83ea455"
  evidenceCommit: "44b03db0f60c15dc389a43e6f9e18765f83ea455"
  source: "Reviewed current README, case study, Phase 9A browser acceptance, Phase 8 reliability evidence, and web UI guide at 44b03db."
---

## Problem and solution

Sales operations needs to find the right customer, prepare an accurate quotation or follow-up, and know whether Odoo accepted the result. A model can suggest an action, but source records can change and a lost response can hide a successful write.

I built one governed domain service behind a responsive browser workspace, a TypeScript MCP server, and a persistent worker. Operators can prepare quotations and CRM activities in the browser; the CLI assistant uses four reusable skills through ten allowlisted MCP tools. Both paths apply the same authorization and execution rules.

## Verified outcomes

The browser workspace passed 13 local Chromium acceptance checks covering quotation and CRM flows, separate accounts, reload, lost execution response, company isolation, mobile layout, and logout. Its screenshots show actual application screens using synthetic records.

The earlier Phase 8 workload completed 124 synthetic tasks, including 31 quotation writes. Across replay checks, each write had one application ledger entry and one Odoo order. These are bounded local engineering checks; the browser acceptance and workload counts are separate, overlapping suites.

## Architecture and reliability

The browser calls the FastAPI domain service directly. A TypeScript MCP server connects the CLI assistant to the same service; neither client can approve its own proposal. PostgreSQL and Odoo hold authoritative transaction records, while local orchestration journals and the worker support deduplication and recovery.

A proposal records resolved customer, items, price, source version, and payload hash. A different actor approves that exact payload. The original operator executes with a stable operation identity. Odoo checks freshness within its write boundary; read-back and reconciliation establish the actual result before the UI reports it as verified.

## Validation boundary

All demonstrated customers, orders, and CRM activities are synthetic local records. The browser supports preparation, approval, execution, and receipt inspection; natural-language assistant requests remain in the CLI. A verified draft is not a confirmed sale. Azure deployment is a prepared option, not a validated runtime.

## Repository and evidence

- [GitHub repository](https://github.com/williamlo90/odoo-business-operations-mcp-server)
- [Engineering case study](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/learning-phases/docs/portfolio/CASE_STUDY.md)
- [Browser workspace guide](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/learning-phases/docs/WEB-UI.md)
- [Browser acceptance](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/learning-phases/docs/PHASE-9A.md)
- [MCP tool contract](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/learning-phases/MCP-INTEGRATIONS.md)
- [Phase 8 reliability results](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/learning-phases/docs/PHASE-8.md)
