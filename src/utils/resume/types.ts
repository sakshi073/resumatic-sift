
// Resume data types
export interface Resume {
  id: string;
  fileName: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  cgpa: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
  certifications: string[];
}
