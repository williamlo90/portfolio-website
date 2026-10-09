---
schemaVersion: 2
slug: odoo-business-operations-mcp-server
title: Odoo Business Operations MCP Server
descriptor: MCP-led quotations with independent approval and Odoo read-back
summary: "Eleven bounded MCP tools help an AI client research customers and prepare business actions. A separate person approves the exact proposal before MCP execution and Odoo result verification."
publicationState: published
featured: true
featuredOrder: 4
category: mcp-business-automation
status:
  label: Local workflow and reliability validation complete
  detail: "Validated with synthetic local data and a connected MCP-to-approval-to-Odoo draft journey. No Azure deployment was validated."
  tone: verified
timeline: October 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/odoo-business-operations-mcp-server"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/odoo-quotation-s00150.png
  alt: "Actual local Odoo draft quotation S00150 created after the synthetic MCP preparation and independent approval journey."
  caption: "Odoo draft quotation S00150, created and read back in the connected synthetic MCP journey"
  gallery:
    - image: ../../assets/projects/odoo-approval-review.png
      alt: "Actual local approval page showing the exact synthetic quotation proposal before MCP execution."
      caption: "Independent review page; execution stays in the MCP client"
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
  - value: "11"
    label: "Bounded MCP tools"
  - value: "124"
    label: "Synthetic workload tasks completed"
  - value: "31/31"
    label: "Quotation writes with exactly one order across replay checks"
highlights:
  - label: Product
    value: "Built an MCP-first Odoo workflow with eleven scoped tools and four reusable business skills. An AI client can research customers, prepare quotations or CRM actions, and inspect outcomes; approval happens in a separate, limited browser page."
  - label: Verified results
    value: "The current connected journey prepared a synthetic IDR 250,000 quotation through MCP, received independent approval, and created Odoo draft S00150 with matching read-back and a single effect after replay. The earlier Phase 8 workload completed 124 synthetic tasks, including 31/31 single-effect writes."
  - label: Engineering
    value: "Engineered the TypeScript MCP server and Python/FastAPI domain service with tenant-scoped reads, immutable proposals, payload-bound approval, stable idempotency keys, Odoo read-back, and persistent worker recovery."
workflow:
  - Resolve company-scoped customer and catalog through MCP
  - Prepare an immutable quotation proposal
  - Review and approve the exact payload separately
  - Execute the approved action through MCP
  - Verify the draft quotation in Odoo
  - Reconcile replay or uncertain outcomes
productionBoundary:
  label: Synthetic local validation
  detail: "The connected journey uses synthetic local Odoo records and no paid model request. Its draft quotation is not a confirmed sale. The workload figures are bounded local checks, not customer or cloud performance; Azure deployment remains unvalidated."
verification:
  date: "2026-10-09"
  contentCommit: "d346bf7a9dfc7c4d4f48df72a8ac90ad1709d29d"
  evidenceCommit: "d346bf7a9dfc7c4d4f48df72a8ac90ad1709d29d"
  source: "Reviewed default learning-phases branch README, MCP-first journey, case study, and linked Phase 8 evidence at d346bf7."
---

## What I built

Built an MCP-first Odoo operations workflow with eleven bounded tools and four reusable business skills. The client researches customer and catalog records, prepares a source-backed quotation or CRM action, and executes only after a separate person approves the exact proposal. The current browser is the approval surface, not a second sales application.

## Verified outcomes

The current connected journey resolved one synthetic customer and two products, prepared an IDR 250,000 quotation through MCP, received independent browser approval, and created Odoo draft S00150. Read-back matched its approved lines and total. Replaying the same operation returned the original result, with one application-ledger row and one Odoo order.

The earlier Phase 8 workload completed 124 synthetic tasks, including 31 verified draft writes. Each had one ledger entry and one Odoo order across replay checks. These are local engineering checks, not customer productivity measurements.

## Architecture and reliability

Engineered the TypeScript MCP server, Python/FastAPI domain service, Odoo integration, and persistent worker. Eleven allowlisted tools expose scoped business capabilities rather than arbitrary Odoo methods or SQL access.

The MCP client and worker share tenant and authorization rules. A separate approver reviews the resolved customer, items, prices, source version, and payload hash. The Odoo addon checks freshness at write time. A durable operation ID, idempotency key, and downstream read-back establish what actually happened.

The persistent worker uses deduplication, leases, and bounded recovery. Replay checks verify that retries retain one Odoo order per operation. Lost-response recovery reconciles the existing business record.

## Validation scope

The connected MCP/browser/Odoo example uses synthetic local sales records, no paid model request, and creates a draft quotation—not a confirmed sale. The separate 124-task workload is a bounded local engineering check. The current browser is limited to human approval; Azure remains a deployment plan, not a validated runtime.

## Repository and evidence

- [GitHub repository](https://github.com/williamlo90/odoo-business-operations-mcp-server)
- [Connected MCP-to-Odoo journey](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/learning-phases/docs/evidence/mcp-first-journey.md)
- [Engineering case study](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/learning-phases/docs/portfolio/CASE_STUDY.md)
- [MCP tool contract](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/learning-phases/MCP-INTEGRATIONS.md)
- [Phase 8 reliability results](https://github.com/williamlo90/odoo-business-operations-mcp-server/blob/learning-phases/docs/PHASE-8.md)
