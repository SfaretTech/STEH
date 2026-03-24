import { CourseContent } from "../../types";
import { digitalDesignCurriculum } from "./course";
import { digitalDesignSpecialities } from "./specialities";
import { digitalDesignLibrary } from "./library";

export const digitalDesignData: CourseContent = {
  id: "digital-design",
  name: "Digital Design & Branding",
  levels: {}
};

Object.keys(digitalDesignCurriculum).forEach(level => {
  digitalDesignData.levels[level] = {
    modules: digitalDesignCurriculum[level] || [],
    specialities: digitalDesignSpecialities[level] || [],
    library: digitalDesignLibrary[level] || []
  };
});
