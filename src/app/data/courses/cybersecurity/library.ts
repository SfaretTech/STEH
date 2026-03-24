import { LibraryResource } from "../../types";

export const cybersecurityLibrary: Record<string, LibraryResource[]> = {
  "Introduction / Basic": [
    { name: "Cyber Threats Overview.pdf", size: "1.5 MB", type: "PDF", iconType: "PDF" },
    { name: "Intro to Kali Linux.pdf", size: "3.2 MB", type: "PDF", iconType: "PDF" }
  ],
  "Fundamental": [
    { name: "Networking Fundamentals.pdf", size: "5.1 MB", type: "PDF", iconType: "PDF" },
    { name: "Nmap Cheatsheet.pdf", size: "0.8 MB", type: "PDF", iconType: "PDF" }
  ],
  "Master": [
    { name: "Advanced PenTesting Guide.zip", size: "18.5 MB", type: "Archive", iconType: "Archive" },
    { name: "Incident Response Playbooks.pdf", size: "4.4 MB", type: "PDF", iconType: "PDF" }
  ]
};
