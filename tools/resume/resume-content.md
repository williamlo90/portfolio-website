# William Lo Channiko

APPLIED AI ENGINEER

Jakarta, Indonesia | +62 813 4852 0623 | williamlochanniko4@gmail.com  
linkedin.com/in/william-lo-channiko | github.com/williamlo90 | william-lo-channiko-portfolio.pages.dev

## Professional Summary

Applied AI engineer with 1 year of full-time software engineering experience. Builds AI assistants, custom MCP servers, and reusable business skills for sales, service operations, and administration. Combines Python/API development, OpenAI and Ollama integration, access controls, testing, monitoring, and AWS/Azure deployment validation.

## Technical Skills

- AI & MCP: Custom MCP servers, reusable business skills, OpenAI API, LangGraph, RAG, embeddings, structured outputs, Mistral OCR
- Local AI: Ollama setup and local inference integration; Docker Compose environments; provider evaluation
- Software & integrations: Python, TypeScript, SQL, FastAPI, React, Next.js; REST APIs, PostgreSQL/pgvector, Odoo, ERPNext, automation scripts
- Security & reliability: RBAC, tenant isolation, human approval, audit trails, idempotency, recovery; Pytest, Vitest, Playwright, CloudWatch monitoring
- Cloud & infrastructure: AWS (ECS/Fargate, RDS, SQS, S3, Lambda); Azure (Container Apps, Blob Storage, Service Bus, PostgreSQL); Docker, CI/CD

## AI Projects

### ConnectWise Service Operations MCP | GitHub Repository | Oct 2026

- Built a service-operations MCP server aligned with a publicly documented ConnectWise PSA API subset, exposing six tools for scoped ticket context, internal notes, and evidence-backed time entries with separate-user approval.
- Validated 62 automated tests, 11 MCP protocol scenarios, and eight browser checks; completed 135 synthetic workload tasks, including 33 verified writes, with zero observed errors or duplicate effects against a stateful PSA simulator.
- Engineered the platform with TypeScript, FastAPI, PostgreSQL, Docker, and optional OpenAI/Ollama assistance; implemented a responsive operator workspace, tenant isolation, audit trails, durable synchronization, and read-back verification with unknown-outcome recovery.

### Odoo Business Operations MCP Server | GitHub Repository | Oct 2026

- Built an AI-assisted Odoo operations platform with four reusable business skills and ten scoped MCP tools for customer research, quotation preparation, CRM follow-ups, and write reconciliation, enforcing tenant isolation and independent human approval.
- Validated 124 synthetic workload tasks, including 31 quotation writes with exactly one Odoo order per operation across replay checks; passed 13 browser acceptance checks covering approval separation, cross-company access denial, and recovery after a lost execution response.
- Engineered the platform with TypeScript, Python/FastAPI, PostgreSQL, Odoo, and Docker Compose; delivered a responsive web workspace with source-bound approvals, idempotent execution, verified business receipts, and persistent worker recovery.

### Case Resolution Copilot | GitHub Repository | Jul-Sep 2026

- Built a policy-governed AI case-resolution system that converts fragmented evidence and versioned policies into review-ready Decision Briefs, with deterministic risk controls and human approval for consequential actions.
- Reduced raw median workflow time by 83.7% (582s to 95s) in a developer-operated benchmark across three matched synthetic cases; validated critical behavior through 20/20 regression observations, a 3/3 OpenAI canary, and 4/4 PostgreSQL workflow scenarios.
- Engineered the platform with FastAPI, PostgreSQL/pgvector, LangGraph, Celery, and Next.js; strengthened workflow reliability through idempotent actions, audit trails, and worker recovery. Live-validated a reproducible AWS deployment with CloudWatch monitoring across ECS/Fargate, RDS, SQS, S3, Lambda, CloudFront, IAM, and Secrets Manager.

### Invoice Review | GitHub Repository | Jul-Aug 2026

- Built an AI invoice-to-ERP workflow that turns unstructured documents into validated, review-ready invoice data, combining OCR extraction, deterministic validation, and human approval before ERPNext export.
- Reduced median invoice-to-ERP draft time by 68% (153s to 49s) across six paired synthetic invoices; achieved the expected outcome in 10/10 test cases, compared with 9/10 through manual ERPNext entry.
- Integrated React, FastAPI, Mistral OCR, OpenAI, and ERPNext; validated an end-to-end Azure deployment using Container Apps, private Blob Storage, Service Bus, and PostgreSQL, processing a synthetic invoice from upload through the review queue.

## Professional Experience

### PT Dover Chemical

Software Engineer (Mobile and Full-Stack) | Jakarta, Indonesia | Jan 2025-Jan 2026

- Owned end-to-end development of an offline-first Draft Sales Order application, from requirements gathering with IT supervisors and sales users through implementation, integration, and testing; built local persistence, background synchronization, caching, retries, and attachment handling across 38 API operations and 15 Room entities/DAOs.
- Independently designed and built a Customer Management System end to end around a 6,656-record customer master dataset, translating sales and administrative requirements into validated imports, reporting, audit trails, and role-based approval, rejection, and reopen workflows across 15 data domains.

## Education

Multimedia Nusantara University, Tangerang, Indonesia | 2022-2026

Bachelor's Degree in Informatics (S.Kom.) | Graduated with Distinction | GPA: 3.82/4.00

Thesis: Fine-tuned two IndoBERT classifiers on 1,822 Indonesian social-media opinions; achieved test macro-F1 of 0.981 for sentiment and 0.870 for aspect classification, with inter-annotator Cohen's kappa of 0.954 and 0.900 on a 200-opinion reliability sample.

Honors: Academic Achievement Scholarship, 2024

## Optional Certifications Variant

- DeepLearning.AI, Machine Learning Specialization | Apr 2025
- Udemy, Machine Learning A-Z: AI, Python & R | Mar 2025
- Google Data Analytics Professional Certificate | Mar 2025
- University of California, SQL for Data Science | Nov 2024
- University of California, Data Wrangling, Analysis and A/B Testing with SQL | Nov 2024

## Evidence notes (not for final resume)

- GPA 3.82/4.00 is user-confirmed and supersedes prior CV values.
- Degree completion is user-confirmed; education dates are shown as `2022-2026` without an `Expected` qualifier.
- Graduation with Distinction is user-confirmed.
- Certification names and dates are taken from William's prior CV; the two University of California credential IDs remain documented there but are omitted from the one-page resume for readability.
- The January 2025 internship start is owner-confirmed and precedes the campus-document timeline; the public dated period is `Jan 2025-Jan 2026` across two full-time terms.
- The combined internship title is a functional normalization of `Fullstack Mobile App Developer Intern` and `Full Stack Software Engineer`.
- Phone number is verified in William's prior CV and official internship acceptance form.
- Invoice Review uses a one-operator synthetic benchmark and a real local ERPNext sandbox; it is not presented as a customer deployment or multi-user study.
- Case Resolution Copilot uses matched synthetic cases and a developer-operated benchmark. Its readiness evidence includes a bounded hosted Gmail draft journey and disposable Neon PostgreSQL persistence, not production-user adoption.
- Invoice Review cloud validation was reviewed against public GitHub main at `b156e03`; its paired ERPNext benchmark was added at `c8f55da`. Case Resolution Copilot Evaluation V1 and AWS validation were reviewed at `47605cb`.
- Employer code has no Git history; codebase-size metrics are framed separately from individual contribution.
