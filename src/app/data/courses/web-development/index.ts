import { CourseContent } from "../../types";
import { webDevelopmentCurriculum } from "./course";
import { webDevelopmentSpecialities } from "./specialities";
import { webDevelopmentLibrary } from "./library";

export const webDevelopmentData: CourseContent = {
  id: "web-development",
  name: "Web Development",
  levels: {}
};

// Dynamically assemble the levels based on the split files
Object.keys(webDevelopmentCurriculum).forEach(level => {
  webDevelopmentData.levels[level] = {
    modules: webDevelopmentCurriculum[level] || [],
    specialities: webDevelopmentSpecialities[level] || [],
    library: webDevelopmentLibrary[level] || []
  };
});
