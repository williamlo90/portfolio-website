---
schemaVersion: 2
slug: ai-document-operations
title: Invoice Review
descriptor: Source-linked invoice review and verified ERP posting
summary: "An AI-assisted accounts-payable workflow that links extracted invoice values to their source, matches purchase orders and receipts, resolves exceptions, and requires human approval before verified ERPNext posting."
publicationState: published
featured: true
featuredOrder: 1
category: ai-applications
status:
  label: V2 synthetic evaluation and local ERP posting verified
  detail: "The V2 technical cohort passed whole-invoice quality, authorized posting, and restart replay checks against a local ERPNext sandbox."
  tone: verified
timeline: July-August 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/ai-document-ops-system"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/ai-document-review.png
  alt: "Invoice Review workspace showing a synthetic invoice beside extracted fields, validation findings, and an approval blocker."
  caption: "Source-linked review workspace with synthetic fixture data"
  gallery:
    - image: ../../assets/projects/ai-document-approved.png
      alt: "Approved invoice decision panel showing the final human decision and retained review context."
      caption: "Human approval decision using a synthetic fixture"
    - image: ../../assets/projects/ai-document-quality.png
      alt: "Invoice Review quality workspace showing evaluation scenarios and validation results."
      caption: "Quality workspace with fixed synthetic evaluation data"
intendedUsers:
  - Finance reviewer
  - Accounts-payable operator
  - Operations administrator
stack:
  - React
  - TypeScript
  - FastAPI
  - OCR.space
  - OpenAI structured extraction
  - ERPNext
  - SQLite
  - PostgreSQL
  - Docker
  - Azure Container Apps
  - Azure Blob Storage
  - Azure Service Bus
metrics:
  - value: "50/50"
    label: "Whole-invoice values and required source provenance correct on frozen synthetic invoices"
  - value: "20/20"
    label: "Eligible ERPNext sandbox postings verified against invoice and ledger"
  - value: "68%"
    label: "Lower median time to a verified ERPNext draft in a separate six-invoice benchmark"
highlights:
  - label: V2 quality
    value: "Whole-invoice values and required source provenance matched on 50/50 frozen synthetic invoices, including controlled PO, receipt, discrepancy, and duplicate scenarios."
  - label: Verified ERP result
    value: "All 20 eligible invoices posted in the local ERPNext sandbox with independent invoice and ledger read-back; 20/20 restart replays returned the same ERP target without duplicate posting effects."
  - label: Separate timing evidence
    value: "An earlier single-operator benchmark cut median elapsed time to a verified ERPNext draft by 68% (153s to 49s) across six paired synthetic invoices. It did not time the extended submitted-posting workflow."
workflow:
  - Upload invoice and retain source evidence
  - Extract proposed values with OCR and structured AI
  - Match purchase order, receipt, and duplicate signals
  - Review exceptions and attest source evidence
  - Approve the ERP draft and separately approve submission
  - Read back the submitted invoice and ledger
  - Reconcile uncertain outcomes without duplicate posting
productionBoundary:
  label: Synthetic local ERP validation
  detail: "V2 used controlled one-line USD synthetic invoices, human-role test identities, and a local ERPNext sandbox. The 68% draft-timing benchmark is a separate six-invoice study; V2 posting and recovery were not revalidated in Azure."
verification:
  date: "2026-10-17"
  contentCommit: "e8d559bc2451239e6370136a2b3f3c7d81eeb25d"
  evidenceCommit: "e8d559bc2451239e6370136a2b3f3c7d81eeb25d"
  source: "Reviewed public GitHub main at e8d559b, V2 Phase 6 quality/posting results, Phase 7 packaged release evidence, and the earlier paired ERPNext draft-timing report."
---

## The problem

Extracting fields from a PDF is only one part of accounts payable. A reviewer must know whether the supplier is mapped correctly, the quantity was received, the price matches the purchase order, and the invoice was already billed. Posting also needs explicit authority and a verifiable ERP result.

## What I built

Built an AI-assisted invoice review workflow that keeps the source PDF, extracted values, purchasing evidence, exception decisions, and ERPNext outcome connected. The reviewer can inspect where a value came from, correct it, and resolve or reject a blocking discrepancy with a recorded reason.

V2 adds three-way purchase-order and receipt matching, duplicate detection, separate approval for ERP draft and submission, and independent invoice and ledger read-back. A missing or ambiguous value remains unknown; model confidence cannot approve a transaction.

## Verified outcomes

On a frozen synthetic technical cohort, original extraction matched **50/50 whole invoices**, including required page and excerpt provenance. All **20/20 eligible invoices** were posted in a local ERPNext sandbox and verified against both the submitted invoice and ledger. The other **30/30 non-payable transactions** received authorized exception dispositions.

Restart replay returned the same ERP target in **20/20 cases**, with no duplicate posting effects in that cohort. Quantity, price, receipt, and duplicate checks were scored separately; the controlled cohort recorded no false holds or unsafe submissions.

The earlier one-operator timing benchmark measured a different endpoint: median elapsed time to a **verified ERPNext draft** fell by **68% (153s to 49s)** across six paired synthetic invoices. It did not measure time saved for V2's full submitted-posting workflow.

## Architecture and authority

React and TypeScript present the source-linked review workspace. FastAPI owns permissions, immutable purchasing evidence, match state, approvals, operation identity, audit history, and recovery. The validated real-provider V2 profile used OCR.space Engine 3 and OpenAI structured extraction; mock providers keep the local demo reproducible without paid credentials.

Application code checks PO and receipt quantities, prices, duplicate candidates, evidence freshness, and allowed state transitions. A human approves the reviewed match, then separately authorizes submission. ERPNext returns a submitted Purchase Invoice and ledger entries that are checked against an independent expected result.

If a submit response is lost, the operation remains unknown until a read-only ERP check establishes the actual target. In the packaged Docker journey, the application survived container recreation and reconciled the existing submitted invoice without a second create or submit. Turning off new writes still permits authorized reconciliation.

## Deployment evidence

The current V2 posting, restart, and restore checks were validated locally against the ERPNext sandbox. The packaged release passed API/worker startup, migration and readiness, browser workflow, PostgreSQL integration, and SQLite/upload restore checks.

An earlier temporary Azure deployment validated Container Apps, private Blob Storage, Service Bus, PostgreSQL, Managed Identity, and Key Vault by processing a synthetic PDF into review with mock providers. It did not validate V2 posting or cloud capacity; the resource group was removed after the run.

## Evidence

- [V2 quality and posting evaluation](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/evidence/invoice-review-v2/PHASE-6.md)
- [Frozen whole-invoice quality aggregate](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/evidence/invoice-review-v2/quality-holdout/report.json)
- [ERP posting and replay aggregate](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/evidence/invoice-review-v2/posting/report.json)
- [Packaged Docker and recovery validation](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/evidence/invoice-review-v2/PHASE-7.md)
- [Separate paired ERPNext draft-timing benchmark](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/erpnext-paired-draft-timing-results.md)
- [Earlier Azure live validation](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/azure-live-validation.md)

## Current boundary

The V2 quality cohort used developer/AI-assisted, one-line USD synthetic invoices with explicit zero tax and controlled PO/receipt scenarios. It is not an estimate of accuracy on arbitrary customer documents or a production deployment. The old six-invoice timing result ends at a verified draft, while the new 50-invoice results cover posting and recovery; they are separate studies with different endpoints.
