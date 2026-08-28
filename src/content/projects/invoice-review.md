---
schemaVersion: 2
slug: ai-document-operations
title: Invoice Review
descriptor: AI-powered invoice review & approval system
summary: "A human-controlled accounts-payable workflow that keeps the source PDF, AI-proposed fields, deterministic validation, reviewer corrections, and approval-gated export in one inspectable system."
publicationState: published
featured: true
featuredOrder: 1
status:
  label: ERPNext workflow benchmark complete
  detail: "The approval-gated workflow was benchmarked against direct manual entry in a local ERPNext sandbox using synthetic invoices."
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
  caption: "Review workspace with synthetic fixture data"
  gallery:
    - image: ../../assets/projects/ai-document-approved.png
      alt: "Approved invoice decision panel showing the final human decision and retained review context."
      caption: "Approval decision using a synthetic fixture"
    - image: ../../assets/projects/ai-document-quality.png
      alt: "Invoice Review quality workspace showing evaluation scenarios and validation results."
      caption: "Quality workspace with a fixed synthetic evaluation"
intendedUsers:
  - Finance reviewer
  - Accounts-payable operator
  - Operations administrator
stack:
  - React 19
  - TypeScript
  - Vite
  - FastAPI
  - SQLite
  - PDF.js
  - Mistral OCR
  - OpenAI structured extraction
  - ERPNext
metrics:
  - value: "68%"
    label: Lower median invoice-to-ERP draft time (153s to 49s)
  - value: "10/10"
    label: Expected assisted-workflow results, versus 9/10 through direct entry
  - value: "98.75%"
    label: Exact field match on a sealed 10-invoice synthetic holdout (79/80)
highlights:
  - label: Outcome
    value: "Cut median invoice-to-ERP draft time by 68% (153s to 49s) while achieving the expected result in 10/10 test cases."
  - label: Benchmark
    value: "Six paired synthetic invoices were completed by one operator through the assisted workflow and through direct manual entry into ERPNext."
  - label: Engineering evidence
    value: "Approval-gated ERPNext draft delivery includes mapping, idempotency, permission checks, reconciliation, and retry handling."
workflow:
  - Upload invoice
  - OCR and field proposal
  - Deterministic validation
  - Human review and correction
  - Approval or rejection
  - Idempotent export
productionBoundary:
  label: Local ERPNext sandbox benchmark
  detail: "One operator used synthetic invoices in a local ERPNext sandbox. The evidence does not establish production-user adoption, customer impact, or multi-user time savings."
verification:
  date: "2026-08-23"
  contentCommit: "edbae31"
  evidenceCommit: "c8f55da"
  source: "Current portfolio content was reviewed against public GitHub main at edbae31. The paired ERPNext timing benchmark and combined outcome record were added at c8f55da."
---

## The problem

Invoice review becomes fragile when the PDF, extracted values, validation reasons,
and approval decision are split across tools. A reviewer needs to see what the
system read, where a value came from, why a record is blocked, and what action is
still allowed.

I constrained the product to one complete invoice journey. That made it possible
to design the failure states, reviewer authority, and export boundary in depth
instead of presenting a broad but shallow “document AI” demo.

## What I built

The product provides six operational surfaces: Inbox, Invoices, Review,
Exports, Quality, and Operations. The main workspace places the source PDF next
to proposed fields, validation findings, correction history, and the reviewer
decision.

- Uploaders can submit invoices and respond to correction requests.
- Finance reviewers can compare the PDF with extracted values, correct fields,
  reject a record, or approve it when blockers are cleared.
- Administrators can inspect evaluation results, failed jobs, retries,
  integrations, and audit events.

Every correction retains the original proposal, before-and-after values, actor,
reason, and timestamp. Export is available only after approval and uses an
idempotency key to prevent duplicate delivery.

## Architecture and decision boundary

The React and TypeScript frontend uses TanStack Query and PDF.js. A FastAPI
modular monolith owns authentication, workspace rules, state transitions,
validation, audit events, and export eligibility. SQLite and private local file
storage keep the demo reproducible; a background worker uses atomic job claims
and lease fencing for asynchronous processing.

The extraction layer is provider-based. Mock providers make the entire workflow
available without paid credentials. A tested provider configuration sends the
document through Mistral OCR and OpenAI structured extraction.

The authority split is explicit:

1. AI proposes invoice fields and source information.
2. Application code checks required fields, totals, line items, duplicates,
   roles, and allowed state transitions.
3. A human reviewer approves, rejects, or requests correction.

Model confidence alone can never approve an invoice, and the API enforces the
same blocker rules as the interface.

## Verified outcomes

**Cut median invoice-to-ERP draft time by 68% (153s to 49s)** while achieving
the expected result in **10/10 test cases**, compared with 9/10 through direct
manual entry into ERPNext.

The timing benchmark covered six paired, draft-eligible synthetic invoices
completed by one operator in a local ERPNext sandbox. Four blocker observations
from an earlier run remain in the combined 10-case outcome record but were not
included in the paired timing median.

The provider-backed extraction workflow also completed all ten invoices in a
sealed, licensed-synthetic holdout. It matched 79 of 80 labeled fields (98.75%)
and matched every expected validation code and approval blocker. The remaining
miss was one unsupported due date, so this is not presented as perfect
extraction or production accuracy.

A separate clean provider diagnostic processed 20 deterministic synthetic
invoices and matched all 160 labeled fields. That set had already been used
during development, so it remains supporting diagnostic evidence rather than
the headline quality result.

The recorded clean release reports at least 91.21% backend line coverage.

## Production and engineering evidence

The workflow delivers approved Purchase Invoice drafts to a real local ERPNext
sandbox. The integration covers field mapping, permission checks, idempotency,
delivery receipts, reconciliation, and deliberate retries so an uncertain
delivery does not silently create a duplicate draft.

This is controlled integration evidence, not a production deployment claim.

## How this was verified

- [External evaluation summary](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/external-invoice-evaluation-v2.md)
- [Paired ERPNext timing benchmark](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/erpnext-paired-draft-timing-results.md)
- [Sealed holdout JSON](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/evidence/external-invoice-v2-holdout-final.json)
- [Recorded release JSON](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/evidence/release-verification.json)
- [Evaluation and failure log](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/evaluation-experiment-log.md)
- [Retained failed diagnostic](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/evidence/current-provider-diagnostic.failed-20260728T080824Z.json)
- [Captioned demo video](https://github.com/williamlo90/ai-document-ops-system/blob/main/docs/assets/demo/invoice-review-demo.mp4)

The holdout uses licensed synthetic data. The release artifact records an older
clean evidence commit than the current reviewed GitHub source; the frontmatter
keeps those two identities separate.

## Failure handling

One diagnostic initially stopped on a localized amount such as `1.250,00`.
The failed artifact was retained, deterministic number normalization was added,
and a regression test covered the case before the clean diagnostic was rerun.

The same approach appears in the runtime design: a failed external delivery
does not rewrite an approved decision. The system retains the approved state and
the delivery attempt so an operator can investigate or retry it deliberately.

## Current boundary

This is a one-operator benchmark for one invoice schema using synthetic invoices
and a local ERPNext sandbox. It establishes the measured result for that test
boundary, not production-user adoption, customer impact, security certification,
or multi-user time savings.

Moving beyond that boundary requires finance-user usability testing, legally
usable real invoices, managed identity and tenancy, durable object storage, a
managed database and backup plan, and live malware scanning.
