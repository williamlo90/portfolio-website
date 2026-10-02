---
schemaVersion: 1
featured: true
featuredOrder: 1
role: Full-Stack Software Engineer
organization: PT Dover Chemical
employmentType: Full-time
location: Jakarta, Indonesia
workMode: On-site
yearsLabel: "2025-2026"
durationLabel: 1 year
periodLabel: Two full-time terms
summary: "Built internal sales-operations software for PT Dover Chemical across the CRM Dover Chemical Android app and a Customer Management System, covering offline synchronization, approval workflows, master-data management, imports, and analytics."
engagements:
  - label: "Jan-Aug 2025"
    title: CRM Dover Chemical - Android App
    bullets:
      - "Partnered with IT supervisors and sales users to build an offline-first Draft Sales Order workflow for field operations, using local persistence, background synchronization, caching, retries, and attachment handling across 38 API operations and 15 Room entities/DAOs."
    technologies:
      - Kotlin
      - Room
      - Retrofit
      - WorkManager
  - label: "Aug 2025-Jan 2026"
    title: Customer Management System - Web
    bullets:
      - "Built a Customer Management System around a 6,656-record customer master dataset, translating sales and administrative processes into validated imports, reporting, audit trails, and role-based approval, rejection, and reopen workflows across 15 data domains."
    technologies:
      - PHP
      - CodeIgniter
      - MariaDB
      - Bootstrap
      - jQuery
      - Chart.js
      - PHPExcel
sourceBoundary:
  sourceFiles:
    - "BAB_I (11).pdf"
    - "BAB_I (10).pdf"
    - "00000068779_2511_2_1_Form02.pdf"
  note: "The January 2025 internship start is owner-confirmed and precedes the campus-document timeline. Later boundaries normalize obvious year typos in the report bodies against the 2025 report covers, the formal second-term position form, William's prior CV, and repository timestamps. Chapter I supports project context, technology choices, work setting, and the reported 6,656-record scale; source-code audit supports the implementation counts below. Outcome metrics remain pending owner confirmation."
codeAudit:
  date: "2026-07-28"
  ownershipBasis: "The owner confirms he built both systems. The supplied code locations do not contain Git history, so the implementation counts are source-audited while authorship is owner-confirmed."
  android:
    build: "assembleDebug passed locally"
    screens: 8
    httpOperations: 38
    staticRoutes: 32
    roomEntities: 15
    roomDaos: 15
    daoOperations: 82
    domainTests: "No domain-specific automated tests found; two test methods are templates."
  web:
    modules: 4
    controllers: 20
    services: 17
    applicationViews: 27
    publicControllerActions: 90
    customerDomains: 15
    approvalEntityTypes: 10
    schemaTables: 34
    syntaxValidation: "92 application PHP files passed php -l"
    behavioralTests: "No PHPUnit or other behavioral test suite found."
---
