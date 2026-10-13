---
schemaVersion: 2
slug: private-offline-document-intelligence
title: Private Offline Document Intelligence
descriptor: Local, cited document answers and approved Odoo checklists
summary: "A local workspace helps MSP teams search client contracts and SOPs, answer with page-level sources, and prepare service checklists for separate review before saving them to Odoo."
publicationState: published
featured: true
featuredOrder: 3
category: ai-applications
status:
  label: Offline local lab handoff validated
  detail: "A synthetic single-host lab exercised OCR, local inference, tenant isolation, human review, Odoo read-back, and MCP stdio. The host was not physically air-gapped."
  tone: verified
timeline: October 2026
role: Product and full-stack engineering
repository:
  url: "https://github.com/williamlo90/private-offline-document-intelligence"
  label: View public repository
  public: true
media:
  hero: ../../assets/projects/offline-document-cited.png
  alt: "Synthetic UI replay of a cited answer beside its source document page."
  caption: "Synthetic UI replay of the validated workspace, not a live-model capture"
  gallery:
    - image: ../../assets/projects/offline-document-conflict.png
      alt: "Synthetic document review showing conflicting source evidence."
      caption: "Conflicting source evidence is surfaced for human review"
    - image: ../../assets/projects/offline-document-review.png
      alt: "Connected synthetic lab screenshot of the reviewed checklist and Odoo outcome."
      caption: "Connected synthetic lab review with an Odoo result"
intendedUsers:
  - MSP technician
  - Service manager
  - Independent reviewer
stack:
  - Python
  - FastAPI
  - PostgreSQL
  - pgvector
  - React
  - TypeScript
  - MCP
  - Local OCR
  - Ollama
  - Odoo
metrics:
  - value: "13/13"
    label: "Synthetic answer and abstain/review regression cases passed"
  - value: "5.056s"
    label: "First sourced answer on fresh local volumes"
  - value: "0"
    label: "Published service ports in the rechecked Compose profile"
highlights:
  - label: Product
    value: "Built a client-scoped document workspace that retrieves page-level evidence from contracts and SOPs, answers with citations, and visibly abstains or requests review when evidence is missing or conflicting."
  - label: Verified results
    value: "A fresh four-service synthetic lab completed scanned-PDF OCR, cited answers, tenant denial, browser review, approved Odoo save/read-back, and MCP stdio. A 13-case synthetic regression passed all answerable and abstain/review cases."
  - label: Engineering
    value: "FastAPI and PostgreSQL/pgvector coordinate local OCR, embeddings, Ollama inference, version-aware retrieval, approval, an operation ledger, and Odoo read-back. The runtime has no hosted-model fallback."
workflow:
  - Upload or find a client-scoped local document
  - OCR and index its page, version, and effective-date evidence
  - Answer with citations or flag missing and conflicting material
  - Review and approve a sourced service checklist separately
  - Save the approved Odoo activity and verify it by read-back
productionBoundary:
  label: Synthetic single-host offline lab
  detail: "Services used an internal Docker network and temporary loopback bridge; the host was not physically air-gapped. The results do not establish customer accuracy, long-running uptime, or IT change execution. The updated no-port source profile needs a newly validated release bundle."
verification:
  date: "2026-10-13"
  contentCommit: "466585c322c30badb529a7ce45ba0cda9b13bd1b"
  evidenceCommit: "466585c322c30badb529a7ce45ba0cda9b13bd1b"
  source: "Reviewed public README, case study, Phase 7 quality and Phase 8 delivery records, and no-port recheck at 466585c."
---

## Problem and solution

An MSP technician may need to reconcile a client contract, an exception, and a current runbook before answering a service question. A fluent answer without the right client boundary or document version can be wrong.

I built a local document workspace that keeps OCR, retrieval, model inference, review, and Odoo checklist delivery within a controlled workflow. The assistant cites source pages, shows missing or conflicting evidence, and waits for separate human approval before saving a checklist.

## Verified outcomes

A fresh synthetic local deployment exercised scanned-PDF OCR, cited answers, missing-evidence abstention, conflict review, cross-client denial, Chromium review, Odoo save/read-back, and MCP stdio search and answer. The first sourced answer on fresh volumes took 5.056 seconds without manually restarting the API. After a full stop and restart, a sourced answer took 17.768 seconds and the document and Odoo receipt remained.

A 13-case synthetic regression passed seven answerable and six abstain/review cases, with 14/14 expected fields and citations. That set was used to improve relevance, so it is regression evidence rather than an untouched holdout. A short separate workload completed 20 searches and seven answers with no HTTP errors; answer p95 was 30.180 seconds.

## Architecture and reliability

FastAPI and PostgreSQL/pgvector enforce client scope and retain source provenance. Local OCR and embeddings prepare the index; Ollama provides local inference with no hosted fallback. A React workspace and TypeScript MCP server use the same domain controls. Approval binds to the reviewed checklist, while an operation ledger and Odoo read-back establish the saved result.

The four application services ran on an internal Docker network. The current Compose source declares no published service ports; a temporary bridge permits loopback-only browser and MCP access. App and Odoo database backups restored into disposable clones in the lab. Odoo filestore restore was outside that check.

## Validation boundary

The screenshots and all records use synthetic data. The cited-answer image is a UI replay, not a live-model capture; the Odoo review image comes from the connected lab. Saving a checklist does not perform an IT change. The host was not physically air-gapped, and the revised no-port Compose profile has not yet been repackaged and fresh-install validated as a new release.

## Repository and evidence

- [GitHub repository](https://github.com/williamlo90/private-offline-document-intelligence)
- [Engineering case study](https://github.com/williamlo90/private-offline-document-intelligence/blob/main/docs/CASE-STUDY.md)
- [Phase 8 local lab handoff](https://github.com/williamlo90/private-offline-document-intelligence/blob/main/docs/PHASE-8-DELIVERY.md)
- [Phase 7 quality and load evidence](https://github.com/williamlo90/private-offline-document-intelligence/blob/main/docs/PHASE-7-PORTFOLIO.md)
- [Current no-port recheck](https://github.com/williamlo90/private-offline-document-intelligence/blob/main/docs/evidence/phase8-no-port-recheck.json)
