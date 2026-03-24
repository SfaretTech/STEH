import { CourseContent } from "../../types";
import { microsoftPackagesCurriculum } from "./course";
import { microsoftPackagesSpecialities } from "./specialities";
import { microsoftPackagesLibrary } from "./library";

export const microsoftPackagesData: CourseContent = {
  id: "microsoft-packages",
  name: "Productivity Suite",
  levels: {}
};

Object.keys(microsoftPackagesCurriculum).forEach(level => {
  microsoftPackagesData.levels[level] = {
    modules: microsoftPackagesCurriculum[level] || [],
    specialities: microsoftPackagesSpecialities[level] || [],
    library: microsoftPackagesLibrary[level] || []
  };
});
