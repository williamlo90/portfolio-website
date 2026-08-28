"""Export a DOCX to a tagged PDF through the installed Microsoft Word."""

from __future__ import annotations

import argparse
from pathlib import Path

import win32com.client


def export_docx(source: Path, output: Path) -> None:
    source = source.resolve()
    output = output.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    word = win32com.client.DispatchEx("Word.Application")
    word.Visible = False
    word.DisplayAlerts = 0
    try:
        document = word.Documents.Open(str(source), ReadOnly=True)
        try:
            document.ExportAsFixedFormat(
                OutputFileName=str(output),
                ExportFormat=17,
                OpenAfterExport=False,
                OptimizeFor=0,
                Range=0,
                Item=0,
                IncludeDocProps=True,
                KeepIRM=True,
                CreateBookmarks=1,
                DocStructureTags=True,
                BitmapMissingFonts=True,
                UseISO19005_1=False,
            )
        finally:
            document.Close(False)
    finally:
        word.Quit()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    arguments = parser.parse_args()
    export_docx(arguments.source, arguments.output)


if __name__ == "__main__":
    main()
