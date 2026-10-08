"""Fail-fast structural QA for the final resume DOCX and PDF."""

from __future__ import annotations

import argparse
from pathlib import Path
from zipfile import ZipFile

from pypdf import PdfReader


EXPECTED_HEADINGS = (
    "TECHNICAL SKILLS",
    "SELECTED AI PROJECTS",
    "PROFESSIONAL EXPERIENCE",
    "EDUCATION",
)


def check_docx(path: Path) -> dict[str, object]:
    with ZipFile(path) as archive:
        names = set(archive.namelist())
        document_xml = archive.read("word/document.xml").decode("utf-8")
        rels_xml = archive.read("word/_rels/document.xml.rels").decode("utf-8")

    forbidden_names = [
        name
        for name in names
        if "comments" in name.lower()
        or "vbaproject" in name.lower()
        or "embeddings/" in name.lower()
    ]
    assert not forbidden_names, f"Forbidden DOCX parts: {forbidden_names}"
    for marker in ("<w:tbl", "<w:txbxContent", "<w:ins", "<w:del", "<w:object"):
        assert marker not in document_xml, f"Forbidden DOCX markup: {marker}"

    aligned_bullet_indent = '<w:ind w:left="518" w:hanging="230"/>'
    aligned_bullet_tab = '<w:tab w:pos="518" w:val="left"/>'
    assert document_xml.count(aligned_bullet_indent) >= 6, (
        "Resume bullets are missing the explicit aligned hanging indent"
    )
    assert document_xml.count(aligned_bullet_tab) >= 6, (
        "Resume bullets are missing the matching first-line tab stop"
    )

    expected_links = (
        "mailto:williamlochanniko4@gmail.com",
        "https://www.linkedin.com/in/william-lo-channiko/",
        "https://github.com/williamlo90",
        "https://william-lo-channiko-portfolio.pages.dev/",
        "https://github.com/williamlo90/case-resolution-copilot",
        "https://github.com/williamlo90/ai-document-ops-system",
        "https://github.com/williamlo90/connectwise-service-operations-mcp",
        "https://github.com/williamlo90/odoo-business-operations-mcp-server",
    )
    missing = [link for link in expected_links if link not in rels_xml]
    assert not missing, f"Missing DOCX hyperlinks: {missing}"
    return {"parts": len(names), "hyperlinks": len(expected_links)}


def check_pdf(
    path: Path,
    *,
    expect_certifications: bool = False,
    forbid_certifications: bool = False,
) -> dict[str, object]:
    reader = PdfReader(path)
    assert len(reader.pages) == 2, f"Expected two pages, got {len(reader.pages)}"
    assert reader.get_fields() in (None, {}), "PDF contains form fields"

    text = "\n".join(page.extract_text() for page in reader.pages)
    normalized_text = " ".join(text.replace("-\n", "-").split())
    assert "Expected" not in normalized_text, "Graduation qualifier still appears in PDF"
    positions = [text.index(heading) for heading in EXPECTED_HEADINGS]
    assert positions == sorted(positions), "PDF section extraction order is incorrect"
    for expected in (
        "1 year",
        "AWS/Azure deployment",
        "Cloud & infrastructure:",
        "Azure (Container Apps, Blob Storage, Service Bus, PostgreSQL)",
        "Case Resolution Copilot",
        "Invoice Review",
        "ConnectWise Service Operations MCP",
        "Odoo Business Operations MCP Server",
        "135 synthetic workload tasks",
        "124 synthetic workload tasks",
        "83.7%",
        "582s to 95s",
        "three matched synthetic cases",
        "20/20 regression observations",
        "3/3 OpenAI canary",
        "4/4 PostgreSQL workflow scenarios",
        "workflow reliability",
        "CloudWatch monitoring",
        "AWS deployment",
        "ECS/Fargate",
        "CloudFront",
        "68%",
        "153s to 49s",
        "six paired synthetic invoices",
        "ERPNext",
        "Azure deployment",
        "Service Bus",
        "Jan 2025-Jan 2026",
        "Bachelor's Degree in Informatics (S.Kom.)",
        "Graduated with Distinction",
        "GPA: 3.82/4.00",
    ):
        assert expected in normalized_text, f"Missing PDF text: {expected}"
    for retired_name in (
        "AI Support Escalation Copilot",
        "AI Document Operations System",
        "10+ months",
    ):
        assert retired_name not in normalized_text, f"Retired brand remains: {retired_name}"

    certification_markers = (
        "CERTIFICATIONS",
        "Machine Learning Specialization",
        "Machine Learning A-Z: AI, Python & R",
        "Google Data Analytics Professional Certificate",
        "SQL for Data Science",
        "Data Wrangling, Analysis and A/B Testing with SQL",
    )
    if expect_certifications:
        for marker in certification_markers:
            assert marker in normalized_text, f"Missing certification text: {marker}"
    if forbid_certifications:
        for marker in certification_markers:
            assert marker not in normalized_text, f"Unexpected certification text: {marker}"

    links: list[str] = []
    for annotation_ref in [ref for page in reader.pages for ref in page.get("/Annots", [])]:
        annotation = annotation_ref.get_object()
        action = annotation.get("/A")
        if action and action.get("/URI"):
            links.append(str(action["/URI"]))
    assert len(links) == 8, f"Expected eight PDF links, got {len(links)}: {links}"
    return {"pages": len(reader.pages), "characters": len(text), "links": links}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("docx", type=Path)
    parser.add_argument("pdf", type=Path)
    certification_mode = parser.add_mutually_exclusive_group()
    certification_mode.add_argument("--expect-certifications", action="store_true")
    certification_mode.add_argument("--forbid-certifications", action="store_true")
    arguments = parser.parse_args()
    print(
        {
            "docx": check_docx(arguments.docx),
            "pdf": check_pdf(
                arguments.pdf,
                expect_certifications=arguments.expect_certifications,
                forbid_certifications=arguments.forbid_certifications,
            ),
        }
    )


if __name__ == "__main__":
    main()
