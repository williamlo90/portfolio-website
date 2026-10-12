---
schemaVersion: 2
slug: ai-support-escalation
title: Case Resolution Copilot
descriptor: Policy-governed decision workspace
summary: "A policy-governed AI case-resolution system that converts fragmented evidence and versioned policies into review-ready Decision Briefs, with deterministic risk controls and human approval for consequential actions."
publicationState: published
featured: true
featuredOrder: 2
category: ai-applications
status:
  label: Controlled-pilot readiness gate passed
  detail: "The bounded Gmail draft journey, PostgreSQL persistence, recovery paths, and authenticated readiness checks passed the recorded gate."
  tone: verified
timeline: July 2026-September 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/case-resolution-copilot"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/support-live-02-decision-brief.jpg
  alt: "Hosted Case Resolution Copilot Decision Brief for synthetic case CS-DEMO-001, showing verified facts, a suggested resolution, uncertainty, and human-review guidance."
  caption: "Decision Brief captured from the hosted demo with synthetic case data on October 12, 2026"
  gallery:
    - image: ../../assets/projects/support-live-01-cases-queue.jpg
      alt: "Hosted Case Resolution Copilot queue filtered to synthetic CS-DEMO cases, with priority, risk, ownership, and SLA context."
      caption: "Hosted queue filtered to synthetic demo cases"
    - image: ../../assets/projects/support-live-03-evidence.jpg
      alt: "Hosted evidence tab showing checked business records, policy guidance, source freshness, and remaining information gaps for a synthetic billing case."
      caption: "Evidence and policy guidance in the hosted demo"
    - image: ../../assets/projects/support-live-04-conversation.jpg
      alt: "Hosted conversation tab showing synthetic customer messages, an internal note, and a suggested response draft that has not been emailed."
      caption: "Conversation and unsent response draft for a synthetic case"
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
  - Celery
  - AWS
  - LangChain Core
  - CrewAI (comparison prototype)
  - AutoGen (comparison prototype)
  - OpenAI
  - Gmail
  - Vercel
metrics:
  - value: "83.7%"
    label: Lower raw median case-resolution workflow time (582s to 95s)
  - value: "3/3"
    label: Complete safe workflows, versus 0/3 through the manual path
  - value: "20/20"
    label: Synthetic regression observations passed
highlights:
  - label: Outcome
    value: "Reduced raw median workflow time by 83.7% (582s to 95s) in a developer-operated benchmark across three matched synthetic cases."
  - label: Benchmark
    value: "Three matched synthetic cases were completed in a developer-operated manual-versus-Copilot benchmark."
  - label: Engineering evidence
    value: "20/20 regression observations, a 3/3 OpenAI canary, and 4/4 PostgreSQL workflow scenarios; live-validated a reproducible AWS architecture."
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
  detail: "The benchmark used three matched synthetic cases and one developer operator. The October 12 hosted screenshots show a read-only product tour, not workflow acceptance. Controlled-action and Gmail-draft acceptance were recorded separately. AWS validation was temporary; the always-on demo remains on Vercel and Neon."
verification:
  date: "2026-10-12"
  contentCommit: "dab033c5fb5a69257af76ce41f0553d7fddc665c"
  evidenceCommit: "dab033c5fb5a69257af76ce41f0553d7fddc665c"
  source: "Reviewed public GitHub main at dab033c, the October 12 live product tour captured from hosted source 80408ed, Evaluation V1, the developer workflow benchmark, and final September 25 AWS live validation."
---

## The problem

Complex support escalations are rarely blocked by a lack of prose. They are
blocked by fragmented facts, unclear policy authority, risky side effects, and
uncertain outcomes after an external system times out.

This product is therefore not a general chatbot. It is a governed decision
workspace for cases that need investigation, policy evidence, human authority,
and a recoverable action trail.

## What I built

Built a policy-governed AI case-resolution system that converts fragmented evidence and versioned policies into review-ready Decision Briefs, with deterministic risk controls and human approval for consequential actions.

The role-aware workspace supports Specialists, Supervisors, Administrators, and
Auditors across case queues, review workspaces, controlled actions, policies,
quality reporting, connections, and team administration.

The gallery shows a read-only capture from the invite-only hosted demo on
October 12, 2026. It follows synthetic case `CS-DEMO-001` through the queue,
Decision Brief, evidence, and conversation. No case edit, approval, external
action, or outgoing message was performed for those screenshots.

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

**Reduced raw median workflow time by 83.7% (582s to 95s)** in a developer-operated benchmark across three matched synthetic cases; validated critical behavior through **20/20 regression observations**, a **3/3 OpenAI canary**, and **4/4 PostgreSQL workflow scenarios**.

The workflow benchmark completed the full safe workflow in 3/3 Copilot cases,
compared with 0/3 through the manual path.

The developer-operated benchmark used three matched synthetic cases. Because
the manual runs did not complete the same full safe-workflow boundary, the raw
timing difference is descriptive and is not presented as a
correctness-controlled speedup.

Evaluation V1 covered 10 synthetic cases with two regression repeats. The
OpenAI canary covered three cases with two provider calls, including a correct
provider skip when policy was missing. Four persisted PostgreSQL scenarios
validated conflict blocking, immutable approval snapshots, exactly-once
controlled execution, and unknown-outcome reconciliation.

Public evaluation keeps 86 CFPB, Financial Ombudsman Service, and UCI records
separate from three synthetic production-engine controls. These records test the
evaluation pipeline; they are not presented as complete customer cases or one
aggregate product-accuracy score.

## Production and engineering evidence

Engineered the platform with FastAPI, PostgreSQL/pgvector, LangGraph, Celery, and Next.js; strengthened workflow reliability through idempotent actions, audit trails, and worker recovery. Live-validated a reproducible AWS deployment with CloudWatch monitoring across ECS/Fargate, RDS, SQS, S3, Lambda, CloudFront, IAM, and Secrets Manager.

My end-to-end ownership covered architecture, implementation, evaluation,
deployment validation, and recovery. Celery and SQS support asynchronous
processing, while LangGraph coordinates LLM API integration and inference
orchestration within application-enforced controls.

The controlled-pilot readiness gate covered a real, bounded Gmail journey that
created an approved persisted draft without automatically sending it, plus
PostgreSQL 18.6 and pgvector persistence on a disposable Neon database.

Supporting checks included 73 backend unit and contract checks, 3 PostgreSQL
integration checks, 4 provider-fault scenarios, and 35 frontend recovery checks.
Warm authenticated primary content was ready in 375 ms against a 2,500 ms gate.
That browser timing is a readiness measurement, not an exact Core Web Vitals LCP
measurement.

I also validated a temporary AWS deployment of the API and background worker.
The connected run covered ECS/Fargate service health, a successful database
migration to RDS PostgreSQL with pgvector, S3-to-Lambda-to-SQS-to-Celery
processing, worker replacement after interruption, and verified resource
teardown. This was a bounded infrastructure test; the always-on demo remains on
Vercel and Neon.

## How this was verified

- [October 12 live product tour](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/live-product-tour/2026-10-12/README.md)
- [Case Resolution Evaluation V1](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/case-resolution-evaluation-v1/README.md)
- [Developer workflow benchmark](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/developer-workflow-benchmark/REPORT.md)
- [Earlier hosted controlled-action acceptance](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/hosted-e2e-acceptance/2026-08-05/README.md)
- [Operational readiness evidence](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/phase8-operational-readiness/2026-08-25/README.md)
- [Orchestrator framework validation](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/framework-validation.md)
- [AWS live validation](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/aws-live-validation/README.md)

## Failure handling

Consequential actions are registered before execution and protected by
idempotency. A successful provider response produces a receipt that can be
traced back to the reviewed snapshot.

If a timeout means the side effect may have occurred, the system records an
unknown outcome and blocks blind retry. Recovery uses a read-only status check
or a human-confirmed resolution before the workflow can continue. This prevents
"retry" from becoming a duplicate refund, credit, or account change.

## Current boundary

The October 12 product tour shows the hosted interface at source revision
`80408ed`; it is visual evidence, not an end-to-end acceptance test or proof of
all later revisions. The earlier hosted acceptance separately records
Specialist submission, Supervisor approval, controlled execution, duplicate
blocking, and Auditor inspection on the predecessor deployment.

The evidence covers synthetic cases, one developer operator, a disposable Neon
database, and one bounded hosted Gmail draft journey. It supports a
controlled-pilot readiness claim, not production-user adoption, customer impact,
automatic email sending, production accuracy, or general enterprise readiness.
