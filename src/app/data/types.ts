export interface LibraryResource {
  name: string;
  size: string;
  type: string;
  iconType?: 'PDF' | 'Archive' | 'Video' | 'Link';
}

export interface Speciality {
  id: string;
  title: string;
  desc: string;
}

export interface LevelContent {
  modules: string[];
  specialities: Speciality[];
  library: LibraryResource[];
}

export interface CourseContent {
  id: string; // The course identifier matching the user's course selection (slugified)
  name: string; // Human readable name
  levels: Record<string, LevelContent>;
}
