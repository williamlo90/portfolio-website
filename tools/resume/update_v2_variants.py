"""Refresh the two V2 project entries in existing tailored resume DOCX files.

This preserves each variant's section order, links, and paragraph formatting.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from docx import Document


CASE_BULLETS = (
    "Built a case-resolution copilot with versioned SOP retrieval, human-approved actions, and verified downstream outcomes supporting case closure, reopening, and escalation.",
    "Achieved 40/40 policy-correct and correctly completed outcomes on held-out synthetic cases: 19 verified actions and 21 acknowledged escalations; passed 18/18 SOP revision replay checks.",
    "Recorded 83.7% lower raw median decision-workflow time (582s to 95s) in an earlier three-pair developer benchmark; validated container recovery and a separate temporary AWS deployment.",
)

INVOICE_BULLETS = (
    "Built an AI-assisted invoice review system with source-linked extraction, three-way purchase order/receipt matching, duplicate detection, and human-approved ERPNext posting.",
    "Validated whole-invoice values and source provenance on 50/50 synthetic invoices, verified 20/20 eligible ERPNext sandbox postings, and recovered 20/20 restart replays without duplicate posting effects.",
    "Reduced median time to a verified ERPNext draft by 68% (153s to 49s) in a separate six-invoice operator benchmark; validated packaged recovery and an earlier temporary Azure intake deployment.",
)

COMPACT_CASE_BULLETS = (
    "Built a Next.js/FastAPI case copilot with versioned SOPs, human-approved actions, and verified outcomes; achieved 40/40 correct synthetic completions and 18/18 SOP replay checks.",
    "Earlier three-pair benchmark measured 83.7% lower raw median decision-workflow time (582s to 95s); separately validated container recovery and a temporary AWS deployment.",
)

COMPACT_INVOICE_BULLETS = (
    "Built a React/FastAPI invoice review workflow with source-linked OCR, PO/receipt matching, duplicate checks, and human-approved ERPNext posting; validated 50/50 synthetic invoices and 20/20 sandbox postings.",
    "Verified 20/20 restart replays without duplicate posting effects; earlier six-invoice benchmark cut median time to verified ERP draft by 68% (153s to 49s).",
)


def replace_project(document: Document, title: str, bullets: tuple[str, ...]) -> None:
    paragraphs = document.paragraphs
    matches = [i for i, paragraph in enumerate(paragraphs) if paragraph.style.name == "Resume Entry" and paragraph.text.startswith(title + " |")]
    if len(matches) != 1:
        raise ValueError(f"Expected one {title} entry; found {len(matches)}")
    start = matches[0] + 1
    existing = []
    for paragraph in paragraphs[start:]:
        if paragraph.style.name != "Resume Bullet":
            break
        existing.append(paragraph)
    if len(existing) != len(bullets):
        raise ValueError(f"{title}: expected {len(bullets)} bullets, found {len(existing)}")
    for paragraph, replacement in zip(existing, bullets):
        if len(paragraph.runs) != 1:
            raise ValueError(f"{title}: bullet format changed unexpectedly")
        paragraph.runs[0].text = replacement


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    arguments = parser.parse_args()
    document = Document(arguments.source)
    compact = arguments.source.name.endswith("_Software_Engineer_Resume.docx")
    replace_project(document, "Case Resolution Copilot", COMPACT_CASE_BULLETS if compact else CASE_BULLETS)
    replace_project(document, "Invoice Review", COMPACT_INVOICE_BULLETS if compact else INVOICE_BULLETS)
    if "AI_Automation_and_Integration_Engineer" in arguments.source.name:
        service_desk = next(
            paragraph for paragraph in document.paragraphs
            if paragraph.style.name == "Resume Entry"
            and paragraph.text.startswith("AI Service Desk & Ticket Operations Assistant |")
        )
        service_desk.paragraph_format.page_break_before = True
    arguments.output.parent.mkdir(parents=True, exist_ok=True)
    document.save(arguments.output)


if __name__ == "__main__":
    main()
