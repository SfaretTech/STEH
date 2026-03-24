import { CourseContent } from "../../types";
import { cybersecurityCurriculum } from "./course";
import { cybersecuritySpecialities } from "./specialities";
import { cybersecurityLibrary } from "./library";

export const cybersecurityData: CourseContent = {
  id: "cybersecurity-&-ethical-hacking",
  name: "Cybersecurity & Ethical Hacking",
  levels: {}
};

Object.keys(cybersecurityCurriculum).forEach(level => {
  cybersecurityData.levels[level] = {
    modules: cybersecurityCurriculum[level] || [],
    specialities: cybersecuritySpecialities[level] || [],
    library: cybersecurityLibrary[level] || []
  };
});
