import { CourseContent } from "../../types";
import { digitalMarketingCurriculum } from "./course";
import { digitalMarketingSpecialities } from "./specialities";
import { digitalMarketingLibrary } from "./library";

export const digitalMarketingData: CourseContent = {
  id: "digital-marketing",
  name: "Digital Marketing & Strategy",
  levels: {}
};

Object.keys(digitalMarketingCurriculum).forEach(level => {
  digitalMarketingData.levels[level] = {
    modules: digitalMarketingCurriculum[level] || [],
    specialities: digitalMarketingSpecialities[level] || [],
    library: digitalMarketingLibrary[level] || []
  };
});
