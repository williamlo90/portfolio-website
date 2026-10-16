---
schemaVersion: 2
slug: ai-support-escalation
title: Case Resolution Copilot
descriptor: Policy-governed support decisions and verified outcomes
summary: "A case-resolution copilot that retrieves applicable SOP versions, prepares evidence-backed Decision Briefs, and keeps consequential actions under human approval through target verification, closure, reopening, or acknowledged escalation."
publicationState: published
featured: true
featuredOrder: 2
category: ai-applications
status:
  label: V2 synthetic evaluation and release checks passed
  detail: "The V2 source passed a 40-case PostgreSQL-backed synthetic evaluation and isolated container/recovery checks. The hosted product tour shows an earlier deployment."
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
  caption: "Decision Brief from the earlier hosted product tour with synthetic data"
  gallery:
    - image: ../../assets/projects/support-live-01-cases-queue.jpg
      alt: "Hosted Case Resolution Copilot queue filtered to synthetic CS-DEMO cases, with priority, risk, ownership, and SLA context."
      caption: "Hosted queue filtered to synthetic demo cases"
    - image: ../../assets/projects/support-live-03-evidence.jpg
      alt: "Hosted evidence tab showing checked business records, policy guidance, source freshness, and remaining information gaps for a synthetic billing case."
      caption: "Evidence and policy guidance in the earlier hosted demo"
    - image: ../../assets/projects/support-live-04-conversation.jpg
      alt: "Hosted conversation tab showing synthetic customer messages, an internal note, and an unsent response draft."
      caption: "Conversation and unsent response draft for a synthetic case"
intendedUsers:
  - Support specialist
  - Supervisor
  - Operations administrator
  - QA or auditor
stack:
  - Next.js
  - React
  - TypeScript
  - FastAPI
  - PostgreSQL
  - pgvector
  - LangGraph
  - Celery
  - OpenAI
  - AWS
metrics:
  - value: "40/40"
    label: "Policy-correct decisions and correct completed outcomes on held-out synthetic cases"
  - value: "18/18"
    label: "Decision replay checks across dated SOP revisions"
  - value: "83.7%"
    label: "Lower raw median decision-workflow time in an earlier three-pair benchmark"
highlights:
  - label: V2 outcome
    value: "Policy-correct decisions and correct terminal outcomes in 40/40 held-out synthetic cases: 19/19 required actions verified against synthetic targets and 21/21 escalations routed and acknowledged."
  - label: SOP consistency
    value: "An exposed replay set passed 18/18 decision checks across six cases, three SOP rule families, and dated policy versions."
  - label: Separate timing evidence
    value: "An earlier developer-operated benchmark recorded 83.7% lower raw median decision-workflow time (582s to 95s) across three matched synthetic pairs. It did not time the V2 verified-completion boundary."
workflow:
  - Open case and gather source evidence
  - Retrieve the applicable versioned SOP
  - Prepare a bounded Decision Brief
  - Obtain human approval for the exact proposed action
  - Execute and verify the downstream target
  - Close, reopen, or route an acknowledged escalation
productionBoundary:
  label: Synthetic V2 source validation
  detail: "V2 outcomes use PostgreSQL-backed APIs, deterministic decisions, and synthetic action targets. The hosted screenshots show an earlier revision; V2 has not been promoted to that host. The 83.7% timing comes from a separate older three-pair developer benchmark."
verification:
  date: "2026-10-17"
  contentCommit: "117a6b70fef7183129116f6bb51d29e71591b111"
  evidenceCommit: "117a6b70fef7183129116f6bb51d29e71591b111"
  source: "Reviewed public GitHub main at 117a6b7, V2 claim ledger and sealed holdout results, dated SOP replay, Phase 6 release checks, and the earlier operator timing report."
---

## The problem

Complex support cases combine customer messages, account records, and policies that may change over time. A plausible AI response is not enough: the team needs to know which SOP applies, what action was authorized, and whether that action actually happened.

## What I built

Built a policy-governed case-resolution workflow that assembles source evidence and the applicable SOP version into a reviewable Decision Brief. Application rules determine eligible actions; a person approves the exact proposal before any consequential side effect.

V2 extends the workflow through verified target read-back, case closure and reopening, and routed escalation with acknowledgement. Changed policy or evidence makes an old approval stale rather than silently carrying its authority forward.

The images on this page show the earlier hosted product tour with synthetic cases. They illustrate the interface, not V2 deployment or evaluation.

## Verified outcomes

The V2 sealed synthetic holdout recorded **40/40 policy-correct decisions and 40/40 correct terminal completions**. It included **19/19 verified target actions** and **21/21 required routed and acknowledged escalations**. The run used PostgreSQL-backed product APIs, deterministic decision rules, and synthetic billing and identity targets. Labels were authored and reviewed by the implementation agent; this is controlled scenario evidence, not general model accuracy or customer results.

A separate exposed SOP replay passed **18/18 decision checks** across six cases, three rule families, and dated versions. It tests policy-change consistency, not another holdout or downstream payment completion.

The earlier developer-operated benchmark recorded **83.7% lower raw median decision-workflow time (582s to 95s)** across three matched synthetic pairs. The manual path did not complete the same full safe workflow in all pairs, and this study did not measure time to V2 verified completion. It is kept separate from the 40-case V2 result.

## Architecture and reliability

Next.js and React provide the role-aware workspace. FastAPI owns tenant scope, permissions, policy lifecycle, approval freshness, action registration, and audit history. PostgreSQL and pgvector retain durable case, retrieval, and operation state. LangGraph coordinates bounded AI narrative; deterministic application controls and authorized people remain responsible for decisions and side effects.

An action is registered before execution with an operation identity. Target read-back checks the approved parameters and observed effect count before closure. An uncertain response stays unresolved until reconciliation; blind retry is blocked.

The V2 release package passed isolated container startup and restart, ten PostgreSQL integration journeys, a seeded restore, known-good image replacement, and persisted unknown-outcome safety checks. These are reproducible demo/recovery checks, not production uptime measurements.

The earlier AWS architecture was live-validated temporarily across ECS/Fargate, RDS, SQS, S3, Lambda, CloudFront, IAM, Secrets Manager, and CloudWatch. V2 was not newly deployed to AWS. The always-on hosted demo remains on Vercel and Neon at an earlier source revision.

## Evidence

- [V2 evaluation results](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/case-resolution-v2/RESULTS.md)
- [V2 claim-to-evidence ledger](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/case-resolution-v2/CLAIM_LEDGER.md)
- [Dated SOP replay results](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/case-resolution-v2/results/sop-replay.json)
- [V2 container and recovery checks](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/case-resolution-v2/PHASE6_RELEASE.md)
- [Earlier operator timing benchmark](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/developer-workflow-benchmark/REPORT.md)
- [Earlier hosted product tour](https://github.com/williamlo90/case-resolution-copilot/blob/main/docs/evidence/live-product-tour/2026-10-12/README.md)

## Current boundary

The V2 results come from synthetic cases and deterministic target adapters. They do not establish customer adoption, real-provider completion rates, or production reliability. The October hosted screenshots predate V2 and cannot be used as proof that V2 is live. The timing benchmark is a separate earlier decision-workflow measure, not a speedup claim for equally successful V2 resolutions.
