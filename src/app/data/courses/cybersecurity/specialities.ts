import { Speciality } from "../../types";

export const cybersecuritySpecialities: Record<string, Speciality[]> = {
  "Introduction / Basic": [
    { id: "cyber-awareness", title: "Security Awareness", desc: "Foundational personal and corporate security." }
  ],
  "Fundamental": [
    { id: "soc-analyst", title: "SOC Analyst", desc: "Monitoring and analyzing security operations." },
    { id: "network-defender", title: "Network Defender", desc: "Securing infrastructure from external attacks." }
  ],
  "Master": [
    { id: "penetration-tester", title: "Penetration Tester", desc: "Offensive security and probing vulnerabilities." },
    { id: "cloud-security", title: "Cloud Security Specialist", desc: "Protecting AWS/Azure/GCP environments." }
  ]
};
