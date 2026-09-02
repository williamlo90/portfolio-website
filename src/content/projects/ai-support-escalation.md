---
schemaVersion: 2
slug: ai-support-escalation
title: Case Resolution Copilot
descriptor: Policy-governed decision workspace
summary: "An authenticated workspace for assembling case evidence, applying versioned policy, preparing a reviewable resolution, recording human approval, and reconciling uncertain action outcomes."
publicationState: published
featured: true
featuredOrder: 2
status:
  label: Controlled-pilot readiness gate passed
  detail: "The bounded Gmail draft journey, PostgreSQL persistence, recovery paths, and authenticated readiness checks passed the recorded gate."
  tone: verified
timeline: July 2026-Present
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/case-resolution-copilot"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/support-decision-brief.png
  alt: "Support escalation Decision Brief showing verified facts, missing information, a suggested resolution, uncertainty, and required human review."
  caption: "Decision Brief for a synthetic support case"
  gallery:
    - image: ../../assets/projects/support-cases.png
      alt: "Case Resolution Copilot queue showing priorities, status, owner, and service-level context."
      caption: "Role-aware case queue with synthetic cases"
    - image: ../../assets/projects/support-evidence.png
      alt: "Support case evidence view showing normalized business evidence and its sources."
      caption: "Evidence workspace for a synthetic case"
    - image: ../../assets/projects/support-action-receipt.png
      alt: "Completed controlled action showing the persisted connected-system receipt and external reference for a synthetic case."
      caption: "Connected-system receipt from the deterministic hosted acceptance"
intendedUsers:
  - Support specialist
  - Supervisor
  - Operations administrator
  - QA or auditor
stack:
  - Next.js 16
  - React 19
  - TypeScript
  - FastAPI
  - PostgreSQL
  - pgvector
  - Neon
  - Clerk
  - LangGraph
  - LangChain Core
  - CrewAI (comparison prototype)
  - AutoGen (comparison prototype)
  - OpenAI
  - Gmail
  - Vercel
metrics:
  - value: "~84%"
    label: Lower raw median case-resolution workflow time (582s to 95s)
  - value: "3/3"
    label: Complete safe workflows, versus 0/3 through the manual path
  - value: "375 ms"
    label: Warm authenticated primary-content readiness against a 2,500 ms gate
highlights:
  - label: Outcome
    value: "Reduced median case-resolution workflow time by ~84% (582s to 95s) while completing the full safe workflow in 3/3 test cases."
  - label: Benchmark
    value: "Three matched synthetic cases were completed in a developer-operated manual-versus-Copilot benchmark."
  - label: Engineering evidence
    value: "Real Gmail draft integration, PostgreSQL and pgvector persistence, provider-failure handling, frontend recovery paths, and authenticated readiness checks."
workflow:
  - Case intake
  - Evidence investigation
  - Versioned policy retrieval
  - Bounded Decision Brief
  - Human review
  - Controlled action
  - Receipt and reconciliation
productionBoundary:
  label: Controlled-pilot evidence
  detail: "The benchmark used matched synthetic cases and one developer operator. The Gmail journey was bounded to approved draft creation with no automatic send; no production-user or customer-impact claim is made."
verification:
  date: "2026-08-25"
  contentCommit: "317c25b"
  evidenceCommit: "317c25b"
  source: "Current portfolio content was reviewed against public GitHub main at 317c25b, including the developer workflow benchmark, Phase 8 operational-readiness evidence, and orchestrator framework validation."
---

## The problem

Complex support escalations are rarely blocked by a lack of prose. They are
blocked by fragmented facts, unclear policy authority, risky side effects, and
uncertain outcomes after an external system times out.

This product is therefore not a general chatbot. It is a governed decision
workspace for cases that need investigation, policy evidence, human authority,
and a recoverable action trail.

## What I built

The role-aware workspace supports Specialists, Supervisors, Administrators, and
Auditors across case queues, review workspaces, controlled actions, policies,
quality reporting, connections, and team administration.

The core journey is:

1. Ingest or open a case and gather the relevant business evidence.
2. Retrieve only policy versions that are applicable and currently valid.
3. Build a Decision Brief that separates verified facts, missing information,
   risk, uncertainty, and the proposed response.
4. Bind human review to an immutable snapshot of the exact evidence, policy,
   and recommendation that was reviewed.
5. Register a controlled action with idempotency and receipt tracking.
6. Reconcile an unknown outcome before another side effect is allowed.

The frontend and FastAPI backend are organized as a modular monolith. Domain
services, PostgreSQL persistence, and role-aware UI commands stay separated by
business boundary without introducing a distributed runtime the product does
not need.

## Architecture and authority

The implementation uses Next.js, React, TypeScript, Clerk, FastAPI,
PostgreSQL/pgvector on Neon, LangGraph, OpenAI, and Vercel. PostgreSQL, rather
than the model or graph runtime, is the durable source of truth for business
state.

The production workflow runs on LangGraph. LangChain Core supports bounded
prompt and schema formatting, while CrewAI and AutoGen remain isolated
comparison prototypes validated on one synthetic case; they are not runtime
dependencies of the application.

OpenAI is deliberately bounded to narrative work. It may improve the rationale,
uncertainty explanation, response subject, and response body derived from a
deterministic control record. It cannot change verified facts, risks, actions,
financial impact, tenant scope, permissions, or the approval requirement.

The backend owns role checks, organization scope, policy lifecycle, stale-review
detection, idempotency, redaction, audit events, and recovery. If case evidence
or policy changes after submission, the review becomes stale instead of
silently retaining old authority.

## Verified outcomes

**Reduced median case-resolution workflow time by ~84% (582s to 95s)** while
completing the full safe workflow in **3/3 test cases**, compared with 0/3
through the manual path.

The developer-operated benchmark used three matched synthetic cases. Because
the manual runs did not complete the same full safe-workflow boundary, the raw
timing difference is descriptive and is not presented as a
correctness-controlled speedup.

Three targeted safety tests passed, and every Copilot outcome was re-read from
the disposable Neon validation database rather than accepted from interface
state alone.

Public evaluation keeps 86 CFPB, Financial Ombudsman Service, and UCI records
separate from three synthetic production-engine controls. These records test the
evaluation pipeline; they are not presented as complete customer cases or one
aggregate product-accuracy score.

## Production and engineering evidence

The controlled-pilot readiness gate covered a real, bounded Gmail journey that
created an approved persisted draft without automatically sending it, plus
PostgreSQL 18.6 and pgvector persistence on a disposable Neon database.

Supporting checks included 73 backend unit and contract checks, 3 PostgreSQL
integration checks, 4 provider-fault scenarios, and 35 frontend recovery checks.
Warm authenticated primary content was ready in 375 ms against a 2,500 ms gate.
That browser timing is a readiness measurement, not an exact Core Web Vitals LCP
measurement.

## How this was verified

- [Developer workflow benchmark](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/developer-workflow-benchmark/REPORT.md)
- [Operational readiness evidence](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/phase8-operational-readiness/2026-08-25/README.md)
- [Orchestrator framework validation](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/framework-validation.md)

## Failure handling

Consequential actions are registered before execution and protected by
idempotency. A successful provider response produces a receipt that can be
traced back to the reviewed snapshot.

If a timeout means the side effect may have occurred, the system records an
unknown outcome and blocks blind retry. Recovery uses a read-only status check
or a human-confirmed resolution before the workflow can continue. This prevents
"retry" from becoming a duplicate refund, credit, or account change.

## Current boundary

Historical hosted evidence records the predecessor frontend and backend running
in Singapore with Clerk identity and a Neon database, including Specialist
submission, Supervisor approval, one controlled action, duplicate blocking, and
Auditor read-only inspection. It is not current-deployment proof.

The evidence covers synthetic cases, one developer operator, a disposable Neon
database, and one bounded hosted Gmail draft journey. It supports a
controlled-pilot readiness claim, not production-user adoption, customer impact,
automatic email sending, production accuracy, or general enterprise readiness.
