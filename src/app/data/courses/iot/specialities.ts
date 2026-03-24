import { Speciality } from "../../types";

export const iotSpecialities: Record<string, Speciality[]> = {
  "Introduction / Basic": [
    { id: "hobbyist", title: "IoT Hobbyist", desc: "Building minor electronics & sensor projects." }
  ],
  "Fundamental": [
    { id: "automation", title: "Home Automation", desc: "Connecting smart gadgets into a centralized network." }
  ],
  "Master": [
    { id: "embedded-dev", title: "Embedded Systems Developer", desc: "Writing low-level code for microcontrollers." },
    { id: "iot-architect", title: "IoT System Architect", desc: "Designing end-to-end cloud-connected systems." }
  ],
  "Pro / Expert": [
    { id: "industrial-iot", title: "Industrial IoT Engineer", desc: "Designing heavy-duty factory and tracking automations." }
  ]
};
