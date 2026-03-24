import { CourseContent } from "../types";
import { webDevelopmentData } from "./web-development";
import { cybersecurityData } from "./cybersecurity";
import { digitalDesignData } from "./digital-design";
import { digitalMarketingData } from "./digital-marketing";
import { iotData } from "./iot";
import { microsoftPackagesData } from "./microsoft-packages";

export const allCourses: CourseContent[] = [
  webDevelopmentData,
  cybersecurityData,
  digitalDesignData,
  digitalMarketingData,
  iotData,
  microsoftPackagesData
];

export const getCourseContent = (courseSelector: string): CourseContent | null => {
  if (!courseSelector) return null;
  const normalized = courseSelector.toLowerCase().trim();
  
  return allCourses.find(c => 
    c.id.toLowerCase() === normalized || 
    c.name.toLowerCase() === normalized ||
    normalized.includes(c.id.toLowerCase()) ||
    normalized.includes(c.name.toLowerCase()) || 
    (normalized.includes('cyber') && c.id.includes('cyber')) ||
    (normalized.includes('web') && c.id.includes('web')) ||
    (normalized.includes('design') && c.id.includes('design')) ||
    (normalized.includes('graphic') && c.id.includes('design')) ||
    (normalized.includes('market') && c.id.includes('market')) ||
    (normalized.includes('iot') && c.id.includes('iot')) ||
    (normalized.includes('microsoft') && c.id.includes('microsoft'))
  ) || null;
};
