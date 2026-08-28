---
schemaVersion: 1
featured: true
featuredOrder: 1
role: Full-Stack Software Engineer Intern
organization: PT Dover Chemical
employmentType: Internship
location: Jakarta, Indonesia
workMode: On-site
yearsLabel: "2025-2026"
durationLabel: 1 year
periodLabel: Two full-time internship terms
summary: "Built internal sales-operations software for PT Dover Chemical across the CRM Dover Chemical Android app and a Customer Management System, covering offline synchronization, approval workflows, master-data management, imports, and analytics."
engagements:
  - label: "Jan-Aug 2025"
    title: CRM Dover Chemical - Android App
    bullets:
      - "Implemented Draft Sales Order workflows in Kotlin for the CRM Dover Chemical Android app, comprising 8 screen classes and 38 HTTP API operations for authentication, reference data, transactions, status workflows, and file attachments."
      - "Implemented offline persistence with 15 Room entities, 15 DAOs, and 82 data-access functions, plus a WorkManager sync workflow covering server-ID assignment, item submission, attachment upload, retry handling, and local cleanup."
    technologies:
      - Kotlin
      - Room
      - Retrofit
      - WorkManager
  - label: "Aug 2025-Jan 2026"
    title: Customer Management System - Web
    bullets:
      - "Built a Customer Management System in PHP and CodeIgniter comprising 4 application modules, 20 controllers, 17 services, and 27 application views for a customer master dataset reported at 6,656 records."
      - "Implemented 90 public controller actions supporting CRUD, server-side search, filtering, sorting, pagination, file attachments, and internal JSON/AJAX workflows across 15 customer-data domains."
      - "Developed role-gated approval workflows for 10 entity types with transactional updates, audit logs, reopen and reject paths, validated Excel imports, and a sales-activity dashboard with two charts."
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
