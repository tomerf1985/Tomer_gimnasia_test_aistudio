export interface UserProfile {
  id: string;
  fullName: string;
  dob: string;
  classNames: string; // Comma separated class names
  currentCity: string;
  workplace: string;
  role: string;
  socialLink: string;
  highSchoolPhoto?: string; // base64 string
  currentPhoto?: string; // base64 string
  memory: string;
  teacher: string;
  embarrassingMoment: string;
  song: string;
  galleryPhotos?: string[]; // array of base64 strings
  yearbookDedication?: string;
}

export interface Photo {
  url: string;
  caption: string;
}

export interface Dedication {
  author: string;
  message: string;
}
