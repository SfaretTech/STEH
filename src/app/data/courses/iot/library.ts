import { LibraryResource } from "../../types";

export const iotLibrary: Record<string, LibraryResource[]> = {
  "Introduction / Basic": [
    { name: "Arduino Quick Reference.pdf", size: "2.1 MB", type: "PDF", iconType: "PDF" }
  ],
  "Fundamental": [
    { name: "Electronics Basics.pdf", size: "6.5 MB", type: "PDF", iconType: "PDF" },
    { name: "ESP32 WiFi Examples.zip", size: "1.5 MB", type: "Archive", iconType: "Archive" }
  ],
  "Master": [
    { name: "IoT Cloud Architectures.pdf", size: "12.0 MB", type: "PDF", iconType: "PDF" },
    { name: "Raspberry Pi Lab Handbook.pdf", size: "4.8 MB", type: "PDF", iconType: "PDF" }
  ],
  "Pro / Expert": [
    { name: "IIoT Scalability Patterns.pdf", size: "15.2 MB", type: "PDF", iconType: "PDF" }
  ]
};
