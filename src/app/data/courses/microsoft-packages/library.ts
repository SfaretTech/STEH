import { LibraryResource } from "../../types";

export const microsoftPackagesLibrary: Record<string, LibraryResource[]> = {
  "Introduction / Basic": [
    { name: "Office 365 Shortcuts.pdf", size: "0.5 MB", type: "PDF", iconType: "PDF" }
  ],
  "Fundamental": [
    { name: "Excel Formula Cheat Sheet.pdf", size: "1.8 MB", type: "PDF", iconType: "PDF" },
    { name: "Word Formatting Guide.pdf", size: "2.1 MB", type: "PDF", iconType: "PDF" }
  ],
  "Master": [
    { name: "Advanced Pivot Tables.pdf", size: "4.5 MB", type: "PDF", iconType: "PDF" },
    { name: "Macro Templates.zip", size: "3.2 MB", type: "Archive", iconType: "Archive" }
  ],
  "Pro / Expert": [
    { name: "VBA Programming Guide.pdf", size: "8.0 MB", type: "PDF", iconType: "PDF" }
  ]
};
