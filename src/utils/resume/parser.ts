
import { Resume } from './types';
import { 
  mockNames, mockColleges, mockTechnicalDegrees, mockTechnicalSkills,
  mockCompanies, mockTechnicalPositions, mockProjectPrefixes, mockProjectTypes,
  mockTechnicalCertifications, getRandomSubset
} from './mockData';

// Mock extraction function - in a real application, this would use PDF parsing libraries
export const extractResumeData = async (file: File): Promise<Resume> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fileName = file.name;
      const fileId = Math.random().toString(36).substring(2, 9);
      
      const mockResume: Resume = {
        id: fileId,
        fileName: fileName,
        name: mockNames[Math.floor(Math.random() * mockNames.length)],
        email: `${fileId}@example.com`,
        phone: `+91 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        college: mockColleges[Math.floor(Math.random() * mockColleges.length)],
        degree: mockTechnicalDegrees[Math.floor(Math.random() * mockTechnicalDegrees.length)],
        cgpa: (Math.random() * 2.5 + 7).toFixed(2),
        skills: getRandomSubset(mockTechnicalSkills, Math.floor(Math.random() * 6 + 5)),
        experience: Array(Math.floor(Math.random() * 3 + 1)).fill(null).map(() => ({
          company: mockCompanies[Math.floor(Math.random() * mockCompanies.length)],
          position: mockTechnicalPositions[Math.floor(Math.random() * mockTechnicalPositions.length)],
          duration: `${Math.floor(Math.random() * 2 + 1)} years`,
          description: "Responsible for key initiatives and projects."
        })),
        projects: Array(Math.floor(Math.random() * 3 + 1)).fill(null).map(() => ({
          name: `${mockProjectPrefixes[Math.floor(Math.random() * mockProjectPrefixes.length)]} ${mockProjectTypes[Math.floor(Math.random() * mockProjectTypes.length)]}`,
          description: "An innovative project solving real-world problems.",
          technologies: getRandomSubset(mockTechnicalSkills, Math.floor(Math.random() * 3 + 2))
        })),
        certifications: getRandomSubset(mockTechnicalCertifications, Math.floor(Math.random() * 3))
      };
      
      resolve(mockResume);
    }, 1000);
  });
};
