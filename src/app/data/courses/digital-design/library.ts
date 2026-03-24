import { LibraryResource } from "../../types";

export const digitalDesignLibrary: Record<string, LibraryResource[]> = {
  "Introduction / Basic": [
    { name: "Color Theory Guide.pdf", size: "3.5 MB", type: "PDF", iconType: "PDF" },
    { name: "Figma Quickstart.pdf", size: "5.2 MB", type: "PDF", iconType: "PDF" }
  ],
  "Fundamental": [
    { name: "UI Patterns Directory.pdf", size: "8.1 MB", type: "PDF", iconType: "PDF" },
    { name: "Photoshop Action Pack.zip", size: "12.8 MB", type: "Archive", iconType: "Archive" }
  ],
  "Master": [
    { name: "UX Research Methodologies.pdf", size: "6.5 MB", type: "PDF", iconType: "PDF" },
    { name: "Design System Templates.zip", size: "24.4 MB", type: "Archive", iconType: "Archive" }
  ]
};
