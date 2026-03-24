import { CourseContent } from "../../types";
import { iotCurriculum } from "./course";
import { iotSpecialities } from "./specialities";
import { iotLibrary } from "./library";

export const iotData: CourseContent = {
  id: "iot-&-digital-skills",
  name: "IoT & Smart Automation",
  levels: {}
};

Object.keys(iotCurriculum).forEach(level => {
  iotData.levels[level] = {
    modules: iotCurriculum[level] || [],
    specialities: iotSpecialities[level] || [],
    library: iotLibrary[level] || []
  };
});
