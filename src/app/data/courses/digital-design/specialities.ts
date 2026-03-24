import { Speciality } from "../../types";

export const digitalDesignSpecialities: Record<string, Speciality[]> = {
  "Introduction / Basic": [
    { id: "visual-design", title: "Visual Designer", desc: "Creating banners, logos, and visual assets." }
  ],
  "Fundamental": [
    { id: "ui-designer", title: "UI Designer", desc: "Creating interfaces for web and mobile." },
    { id: "brand-identity", title: "Brand Identity", desc: "Crafting comprehensive corporate brand kits." }
  ],
  "Master": [
    { id: "ux-researcher", title: "UX Researcher", desc: "User testing and behavioral analysis." },
    { id: "product-designer", title: "Product Designer", desc: "End-to-end user experience and interface strategy." }
  ]
};
