import { LibraryResource } from "../../types";

export const webDevelopmentLibrary: Record<string, LibraryResource[]> = {
  "Introduction / Basic": [
    { name: "HTML/CSS Cheat Sheet.pdf", size: "2.5 MB", type: "PDF", iconType: "PDF" },
    { name: "Git Workflow Basics.pdf", size: "1.1 MB", type: "PDF", iconType: "PDF" }
  ],
  "Fundamental": [
    { name: "JavaScript The Right Way.pdf", size: "4.8 MB", type: "PDF", iconType: "PDF" },
    { name: "Frontend Frameworks Guide.zip", size: "15.0 MB", type: "Archive", iconType: "Archive" }
  ],
  "Master": [
    { name: "Fullstack App Architecture.pdf", size: "6.2 MB", type: "PDF", iconType: "PDF" },
    { name: "Backend Security Guidelines.pdf", size: "3.5 MB", type: "PDF", iconType: "PDF" }
  ],
  "Pro / Expert": [
    { name: "System Design Patterns.pdf", size: "12.0 MB", type: "PDF", iconType: "PDF" }
  ]
};
