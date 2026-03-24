import { Speciality } from "../../types";

export const webDevelopmentSpecialities: Record<string, Speciality[]> = {
  "Introduction / Basic": [
    { id: "frontend-ui", title: "Frontend UI/UX", desc: "Design-centric web layout creation." }
  ],
  "Fundamental": [
    { id: "frontend-dev", title: "Frontend Developer", desc: "Building interactive client-side applications." },
    { id: "backend-dev", title: "Backend API Developer", desc: "Building server-side logic and database schemas." }
  ],
  "Master": [
    { id: "fullstack-dev", title: "Fullstack Engineering", desc: "End-to-end web system architecture." },
    { id: "devops-web", title: "Web DevOps", desc: "Deployment pipelines and cloud hosting." }
  ],
  "Pro / Expert": [
    { id: "enterprise-arch", title: "Enterprise Web Architecture", desc: "Designing large-scale systems." }
  ]
};
