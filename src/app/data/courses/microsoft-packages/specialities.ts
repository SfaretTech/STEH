import { Speciality } from "../../types";

export const microsoftPackagesSpecialities: Record<string, Speciality[]> = {
  "Introduction / Basic": [
    { id: "office-admin", title: "Office Administrator", desc: "Handling basic institutional document tasks." }
  ],
  "Fundamental": [
    { id: "data-clerk", title: "Data Entry Clerk", desc: "Using Excel rapidly and effectively for logs." }
  ],
  "Master": [
    { id: "data-analyst", title: "Excel Data Analyst", desc: "Creating dashboards and pivot models." },
    { id: "presentation-spec", title: "Presentation Specialist", desc: "Crafting executive-level slide decks." }
  ],
  "Pro / Expert": [
    { id: "automation-expert", title: "Workflow Automation Expert", desc: "Using VBA and Power Platform to automate tasks." }
  ]
};
