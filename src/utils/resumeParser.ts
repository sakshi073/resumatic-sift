
// Resume parsing utility functions

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

// Mock extraction function - in a real application, this would use PDF parsing libraries
export const extractResumeData = async (file: File): Promise<Resume> => {
  // This is a mock implementation - in a real app, we'd use PDF.js or a similar library
  // to extract text and then use regex or ML to parse structured data
  
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Generate random data for demonstration
      const fileName = file.name;
      const fileId = Math.random().toString(36).substring(2, 9);
      
      // Determine if this is a technical or business resume based on filename
      const isTechnical = fileName.toLowerCase().includes('tech') || 
                          fileName.toLowerCase().includes('dev') ||
                          fileName.toLowerCase().includes('eng');
      
      const mockResume: Resume = {
        id: fileId,
        fileName: fileName,
        name: mockNames[Math.floor(Math.random() * mockNames.length)],
        email: `${fileId}@example.com`,
        phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        college: mockColleges[Math.floor(Math.random() * mockColleges.length)],
        degree: isTechnical ? 
                mockTechnicalDegrees[Math.floor(Math.random() * mockTechnicalDegrees.length)] : 
                mockBusinessDegrees[Math.floor(Math.random() * mockBusinessDegrees.length)],
        cgpa: (Math.random() * 1 + 3).toFixed(2),
        skills: isTechnical ? 
                getRandomSubset(mockTechnicalSkills, Math.floor(Math.random() * 6 + 5)) : 
                getRandomSubset(mockBusinessSkills, Math.floor(Math.random() * 6 + 5)),
        experience: Array(Math.floor(Math.random() * 3 + 1)).fill(null).map(() => ({
          company: mockCompanies[Math.floor(Math.random() * mockCompanies.length)],
          position: isTechnical ? 
                    mockTechnicalPositions[Math.floor(Math.random() * mockTechnicalPositions.length)] :
                    mockBusinessPositions[Math.floor(Math.random() * mockBusinessPositions.length)],
          duration: `${Math.floor(Math.random() * 2 + 1)} years`,
          description: "Responsible for key initiatives and projects."
        })),
        projects: Array(Math.floor(Math.random() * 3 + 1)).fill(null).map(() => ({
          name: `${mockProjectPrefixes[Math.floor(Math.random() * mockProjectPrefixes.length)]} ${mockProjectTypes[Math.floor(Math.random() * mockProjectTypes.length)]}`,
          description: "An innovative project solving real-world problems.",
          technologies: isTechnical ? 
                        getRandomSubset(mockTechnicalSkills, Math.floor(Math.random() * 3 + 2)) :
                        getRandomSubset(mockBusinessSkills, Math.floor(Math.random() * 3 + 2))
        })),
        certifications: getRandomSubset(
          isTechnical ? mockTechnicalCertifications : mockBusinessCertifications, 
          Math.floor(Math.random() * 3)
        )
      };
      
      resolve(mockResume);
    }, 1000); // Simulate a delay to show loading state
  });
};

// Helper function to get random subset of array
const getRandomSubset = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Mock data for generating resumes
const mockNames = [
  "Alex Johnson", "Taylor Smith", "Jordan Williams", "Casey Brown", "Morgan Davis",
  "Riley Wilson", "Parker Moore", "Quinn Anderson", "Blake Thomas", "Jordan Miller"
];

const mockColleges = [
  "Stanford University", "MIT", "Harvard University", "UC Berkeley", "Princeton University",
  "Yale University", "Carnegie Mellon University", "Columbia University", "Cornell University", "University of Michigan"
];

const mockTechnicalDegrees = [
  "B.S. Computer Science", "M.S. Computer Engineering", "B.S. Software Engineering",
  "Ph.D. Computer Science", "B.S. Data Science", "M.S. Machine Learning"
];

const mockBusinessDegrees = [
  "MBA", "B.S. Business Administration", "M.S. Finance", "B.A. Economics",
  "M.S. Marketing", "B.S. Accounting"
];

// Expanded technical skills list
const mockTechnicalSkills = [
  // Programming Languages
  "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "PHP", "Go", "Swift", "Kotlin", 
  "TypeScript", "Rust", "R", "Scala", "Perl", "Haskell", "Matlab", "Shell Scripting",
  
  // Web Technologies
  "HTML", "CSS", "SASS/SCSS", "Bootstrap", "Tailwind CSS", "React", "Angular", "Vue.js", 
  "jQuery", "Node.js", "Express", "Django", "Flask", "Spring Boot", "ASP.NET", 
  "Ruby on Rails", "Laravel", "WordPress", "Redux", "GraphQL", "REST API", "WebSockets",
  
  // Mobile Development
  "React Native", "Flutter", "Xamarin", "Android Development", "iOS Development", 
  "Kotlin Multiplatform", "Swift UI", "Jetpack Compose",
  
  // Database Technologies
  "SQL", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle Database", "Redis", 
  "Microsoft SQL Server", "Cassandra", "DynamoDB", "ElasticSearch", "Firebase",
  
  // Cloud & DevOps
  "AWS", "Microsoft Azure", "Google Cloud Platform (GCP)", "IBM Cloud", "Oracle Cloud",
  "Heroku", "DigitalOcean", "Docker", "Kubernetes", "Terraform", "Jenkins", "Travis CI", 
  "GitLab CI/CD", "GitHub Actions", "Ansible", "Chef", "Puppet", "Prometheus", "Grafana",
  
  // Data Science & AI
  "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Keras",
  "Jupyter Notebooks", "Hadoop", "Spark", "NLTK", "Computer Vision", "NLP",
  "Machine Learning", "Deep Learning", "Data Mining", "Reinforcement Learning",
  
  // Dev Tools
  "Git", "GitHub", "GitLab", "Bitbucket", "JIRA", "Confluence", "VS Code", "IntelliJ IDEA",
  "CI/CD", "Unit Testing", "Postman", "Microservices", "RESTful APIs"
];

const mockBusinessSkills = [
  "Project Management", "Market Analysis", "Financial Modeling", "Data Analysis",
  "Strategic Planning", "Team Leadership", "Client Relations", "Public Speaking",
  "Sales", "Marketing", "Content Strategy", "SEO", "Social Media Marketing",
  "Business Development", "Negotiation", "CRM", "Microsoft Excel", "PowerPoint",
  "Tableau", "Power BI", "Agile", "Scrum", "Six Sigma", "Product Management",
  "Customer Experience", "Brand Management", "Market Research", "Supply Chain Management"
];

const mockCompanies = [
  "Google", "Microsoft", "Apple", "Amazon", "Meta", "IBM", "Oracle", "Salesforce",
  "Adobe", "Tesla", "Netflix", "Airbnb", "Uber", "Lyft", "Twitter", "Snapchat",
  "LinkedIn", "Spotify", "Dropbox", "Square", "Intel", "AMD", "NVIDIA", "Cisco"
];

const mockTechnicalPositions = [
  "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "Site Reliability Engineer",
  "Cloud Engineer", "Mobile Developer", "Game Developer", "Embedded Systems Engineer"
];

const mockBusinessPositions = [
  "Product Manager", "Project Manager", "Business Analyst", "Marketing Manager",
  "Financial Analyst", "Data Analyst", "Sales Representative", "Account Executive",
  "Customer Success Manager", "Human Resources Specialist", "Operations Manager"
];

const mockProjectPrefixes = [
  "Advanced", "Intelligent", "Smart", "Dynamic", "Automated", "Interactive",
  "Responsive", "Real-time", "Scalable", "Distributed", "Cloud-based", "AI-powered"
];

const mockProjectTypes = [
  "Dashboard", "Analytics Platform", "E-commerce Application", "Social Network",
  "Recommendation System", "Content Management System", "Mobile Application",
  "Web Application", "Data Visualization Tool", "API Gateway", "Microservice",
  "Chat Application", "Game", "Learning Management System"
];

// Expanded technical certifications list
const mockTechnicalCertifications = [
  // Cloud Certifications
  "AWS Certified Solutions Architect", "AWS Certified Developer", "AWS Certified DevOps Engineer",
  "Google Cloud Professional Cloud Architect", "Google Cloud Professional Data Engineer",
  "Microsoft Azure Certification", "Microsoft Certified: Azure Solutions Architect",
  "Microsoft Certified: Azure Developer", "Microsoft Certified: Azure Administrator",
  
  // DevOps & Infrastructure
  "Certified Kubernetes Administrator", "Docker Certified Associate", 
  "HashiCorp Certified: Terraform Associate", "Red Hat Certified Engineer",
  
  // Programming & Development
  "Oracle Certified Java Programmer", "Microsoft Certified: .NET Developer",
  "Certified Python Developer", "JavaScript Certified Developer",
  
  // Data & AI
  "TensorFlow Developer Certificate", "Microsoft Certified: Azure AI Engineer",
  "IBM Data Science Professional Certificate", "Google Professional Machine Learning Engineer",
  
  // Security
  "CompTIA Security+", "Certified Information Systems Security Professional (CISSP)",
  "Certified Ethical Hacker (CEH)", "Cisco CCNA Security"
];

const mockBusinessCertifications = [
  "PMP (Project Management Professional)", "CFA (Chartered Financial Analyst)",
  "SHRM-CP (Society for Human Resource Management)", "Certified Public Accountant (CPA)",
  "Certified Marketing Professional", "Agile Certified Practitioner", "Six Sigma Black Belt",
  "Certified Business Analysis Professional (CBAP)", "Certified Scrum Master",
  "ITIL Foundation Certification", "Certified Supply Chain Professional"
];

