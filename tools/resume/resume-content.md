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

## MCP & Business Automation

### ConnectWise Service Operations MCP | GitHub Repository | Oct 2026

- Built a service-operations MCP server aligned with a publicly documented ConnectWise PSA API subset, exposing six tools for scoped ticket context, internal notes, and evidence-backed time entries with separate-user approval.
- Validated 62 automated tests, 11 MCP protocol scenarios, and eight browser checks; completed 135 synthetic workload tasks, including 33 verified writes, with zero observed errors or duplicate effects against a stateful PSA simulator.
- Engineered the platform with TypeScript, FastAPI, PostgreSQL, Docker, and optional OpenAI/Ollama assistance; implemented a responsive operator workspace, tenant isolation, audit trails, durable synchronization, and read-back verification with unknown-outcome recovery.

### Odoo Business Operations MCP Server | GitHub Repository | Oct 2026

- Built an AI-assisted Odoo operations platform with four reusable business skills and ten scoped MCP tools for customer research, quotation preparation, CRM follow-ups, and write reconciliation, enforcing tenant isolation and independent human approval.
- Validated 124 synthetic workload tasks, including 31 quotation writes with exactly one Odoo order per operation across replay checks; passed 13 browser acceptance checks covering approval separation, cross-company access denial, and recovery after a lost execution response.
- Engineered the platform with TypeScript, Python/FastAPI, PostgreSQL, Odoo, and Docker Compose; delivered a responsive web workspace with source-bound approvals, idempotent execution, verified business receipts, and persistent worker recovery.

### AI Service Desk & Ticket Operations Assistant | GitHub Repository | Oct 2026

- Built an AI-assisted service desk platform that converts Jira tickets into evidence-backed recommendations and versioned action proposals, with human approval for access grants, service recovery, and related-ticket operations.
- Validated AI triage on 16/16 held-out synthetic cases and exercised 48 synthetic HTTP workflows; verified platform behavior through 183 Python tests, 8 MCP tests, and 21 JavaScript checks, with automated regression and secret scanning in GitHub Actions.
- Engineered the platform with Python, PostgreSQL, TypeScript/MCP, OpenAI, Jira Service Management, and Keycloak; implemented tenant isolation, payload-bound approvals, durable operation identities, and target verification to reconcile uncertain outcomes and prevent duplicate effects.

Repository: https://github.com/williamlo90/ai-service-desk-ticket-operations-assistant

## AI Projects

### Case Resolution Copilot | GitHub Repository | Jul-Sep 2026

- Built a case-resolution copilot with versioned SOP retrieval, human-approved actions, and verified downstream outcomes supporting case closure, reopening, and escalation.
- Achieved 40/40 policy-correct and correctly completed outcomes on held-out synthetic cases: 19 verified actions and 21 acknowledged escalations; passed 18/18 SOP revision replay checks.
- Recorded 83.7% lower raw median decision-workflow time (582s to 95s) in an earlier three-pair developer benchmark; validated container recovery and a separate temporary AWS deployment.

### Invoice Review | GitHub Repository | Jul-Aug 2026

- Built an AI-assisted invoice review system with source-linked extraction, three-way purchase order/receipt matching, duplicate detection, and human-approved ERPNext posting.
- Validated whole-invoice values and source provenance on 50/50 synthetic invoices, verified 20/20 eligible ERPNext sandbox postings, and recovered 20/20 restart replays without duplicate posting effects.
- Reduced median time to a verified ERPNext draft by 68% (153s to 49s) in a separate six-invoice operator benchmark; validated packaged recovery and an earlier temporary Azure intake deployment.

## Professional Experience

### PT Dover Chemical

Full-Stack Software Engineer Intern | Jakarta, Indonesia | Jan 2025-Jan 2026

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
- Invoice Review V2 evidence was reviewed at public GitHub main `e8d559b`: 50/50 synthetic whole invoices, 20/20 eligible local ERPNext sandbox postings, and 20/20 restart replays. Its separate earlier six-invoice timing result ends at a verified ERP draft, not a submitted posting.
- Case Resolution Copilot V2 evidence was reviewed at public GitHub main `117a6b7`: 40/40 policy-correct and terminally complete synthetic cases and 18/18 exposed SOP revision decision replays. Its earlier three-pair developer benchmark measures decision-workflow time, not V2 verified completion.
- Both AWS and Azure validations were temporary and preceded the V2 results. Do not imply that the hosted Case Resolution Copilot tour or an Azure deployment runs the V2 workflows.
- Employer code has no Git history; codebase-size metrics are framed separately from individual contribution.
