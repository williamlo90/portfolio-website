---
schemaVersion: 2
slug: ai-sales-followup-crm-automation
title: AI Sales Follow-up & CRM Automation
descriptor: Source-backed sales follow-ups with separate approval
summary: "Turns customer messages into reviewable CRM activities and follow-up drafts. Separate approval governs each action; the system verifies Odoo updates and reconciles uncertain email outcomes before retrying."
publicationState: published
featured: true
featuredOrder: 6
category: mcp-business-automation
status:
  label: Local V1 and connected sandbox validated
  detail: "A synthetic connected journey reached Odoo and controlled Outlook mailboxes. This is local lab validation, not a customer deployment or production sending service."
  tone: verified
timeline: October 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/ai-sales-followup-crm-automation"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/sales-review-verified.png
  alt: "Sales follow-up review workspace showing a synthetic customer quote, proposed CRM activity, email draft, separate approvals, and a recorded Odoo outcome."
  caption: "Synthetic review fixture showing source, proposal, approvals, and recorded CRM outcome; not the connected Outlook run"
  gallery: []
intendedUsers:
  - Sales operator
  - Independent approver
  - Local system operator
stack:
  - Python
  - FastAPI
  - PostgreSQL
  - TypeScript
  - MCP
  - React
  - n8n
  - OpenAI
  - Microsoft Graph
  - Odoo
metrics:
  - value: "20/20"
    label: "Frozen synthetic cases linked and proposed correctly"
  - value: "1 + 1"
    label: "Odoo activity and controlled follow-up verified in a connected run"
  - value: "360"
    label: "Python tests passed in the current clean source-archive check"
highlights:
  - label: Product
    value: "Built a sales follow-up workflow that links a customer message to a scoped deal, prepares a source-backed CRM change and email draft, and keeps review and separate approval ahead of execution."
  - label: Verified results
    value: "A connected synthetic Outlook-to-Odoo journey produced one verified CRM activity and one allowlisted self-test follow-up. A 20-case frozen synthetic regression correctly linked deals and proposed the right action and recipient in 20/20 cases."
  - label: Engineering
    value: "Engineered a shared FastAPI domain behind the React review workspace, TypeScript MCP tools, and n8n schedules. PostgreSQL records version-bound approvals, operation identities, recovery state, and audit evidence; Odoo and Microsoft Graph results are observed before retry."
workflow:
  - Read an authorized message and match its permitted deal
  - Extract source-backed commitments and prepare a CRM diff and follow-up draft
  - Review the evidence and approve each exact action separately
  - Execute through scoped Odoo and Microsoft Graph connectors
  - Verify the target result and reconcile uncertain outcomes
productionBoundary:
  label: Local synthetic validation
  detail: "The screenshot is a synthetic review fixture. The connected run used sandbox records, lab roles, and a self-test recipient; normal sending is off by default. Results do not establish customer impact, production uptime, or cloud capacity."
verification:
  date: "2026-10-13"
  contentCommit: "5680c23ab5edb7c7212fab1472f08c131daed32c"
  evidenceCommit: "5680c23ab5edb7c7212fab1472f08c131daed32c"
  source: "Reviewed current README, case study, connected-run evidence, current release JSON and browser report at 5680c23."
---

## What I built

Built a local sales workflow for the work after a customer conversation: identify the right deal, capture the commitment, prepare a CRM activity, and draft a follow-up. The operator can compare each proposed change with its source. A different approver authorizes the exact CRM and email payloads separately before execution.

The React workspace, TypeScript MCP server, and n8n schedules call the same Python domain service rather than implementing separate business rules. Four reusable skills cover commitment extraction, CRM preparation, follow-up drafting, and reconciliation.

## Verified outcomes

In a connected synthetic run, one customer message traversed project-owned Outlook OAuth, n8n, OpenAI, PostgreSQL, and the Odoo sandbox. AI identified a missing internal owner; a lab operator supplied it from the source. Separate lab-role approvals led to one Odoo activity confirmed by read-back and one allowlisted self-test follow-up observed in Sent Items and the recipient's Junk folder.

A frozen 20-case synthetic regression returned correct deal linkage and proposal count/recipient in 20/20 cases; 19/19 invoked extractions were correct. A newer clean source-archive check passed 360 Python tests, seven Chromium browser tests, UI and MCP builds, and two MCP reference-client tests. The newer check did not rerun Graph, Odoo, OpenAI, n8n import, or email dispatch; those connected results retain their earlier evidence. These checks support bounded workflow behavior, not a customer productivity or model-generalization claim.

## Architecture and reliability

FastAPI owns tenant scope, source freshness, version-bound approval, idempotency, and the operation ledger. PostgreSQL holds jobs, checkpoints, and audit state. React presents the quote, CRM diff, draft, approval, and recovery state; TypeScript MCP tools expose scoped actions; n8n coordinates intake and due-work schedules.

Execution uses controlled Odoo and Microsoft Graph connectors. Odoo writes are read back. An uncertain Graph outcome is reconciled by observation before any retry, avoiding a blind resend. Local drills exercised missed-schedule catch-up, workflow restart, and unknown-outcome recovery.

## Validation scope

The hero image is a synthetic review fixture, not a screenshot of the connected Outlook run. The connected run used local sandbox records, distinct lab roles, controlled mailboxes, and a self-test recipient. Regular sending defaults off. A Sent Items record or recipient-folder copy does not prove that a customer read an email.

The workflow stops when its local host sleeps or loses power or network. Small lab workloads do not establish production throughput, uptime, cloud deployment, or business ROI.

## Repository and evidence

- [GitHub repository](https://github.com/williamlo90/ai-sales-followup-crm-automation)
- [Engineering case study](https://github.com/williamlo90/ai-sales-followup-crm-automation/blob/main/docs/CASE-STUDY.md)
- [Connected Outlook, Odoo, and email evidence](https://github.com/williamlo90/ai-sales-followup-crm-automation/blob/main/docs/evidence/phase-7-connected-email-ai-odoo.json)
- [Phase 7 completion audit](https://github.com/williamlo90/ai-sales-followup-crm-automation/blob/main/docs/phase-7/COMPLETION-AUDIT.md)
- [Phase 8 local delivery audit](https://github.com/williamlo90/ai-sales-followup-crm-automation/blob/main/docs/phase-8/DELIVERY-AUDIT.md)
- [Current clean source-archive check](https://github.com/williamlo90/ai-sales-followup-crm-automation/blob/main/docs/evidence/current-release-20261013.json)
- [Current browser regression](https://github.com/williamlo90/ai-sales-followup-crm-automation/blob/main/docs/evidence/browser-current-20261013.json)
