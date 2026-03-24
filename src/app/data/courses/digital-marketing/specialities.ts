import { Speciality } from "../../types";

export const digitalMarketingSpecialities: Record<string, Speciality[]> = {
  "Introduction / Basic": [
    { id: "community-manager", title: "Community Manager", desc: "Engaging audiences on social platforms." }
  ],
  "Fundamental": [
    { id: "social-media", title: "Social Media Strategist", desc: "Crafting end-to-end platform strategies." },
    { id: "content-marketer", title: "Content Marketer", desc: "Driving traffic through inbound content." }
  ],
  "Master": [
    { id: "performance-marketer", title: "Performance Marketer", desc: "Optimizing ROI through paid advertising." },
    { id: "seo-specialist", title: "SEO Specialist", desc: "Technical and on-page search optimization." }
  ]
};
