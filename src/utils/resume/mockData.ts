
// Mock data for generating resumes

export const mockNames = [
  "Gaurish Mundada", "Ritesh Savale", "Sakshi Changedia", 
  "Sapna Bagal", "Jash Sureja", "Jay Hire", "Sarvesh Pabitwar", 
  "Vaibhav Anarase", "Akshay Gahilod"
];

export const mockColleges = [
  "Shrimati Kashibai Navale College of Engineering",
  "NBN Sinhgad College of Engineering",
  "Sinhgad College of Engineering",
  "PCCOE",
  "PICT",
  "DY Patil College of Engineering",
  "Sinhgad Institute of Technology",
  "College of Engineering Pune"
];

export const mockTechnicalDegrees = [
  "B.S. Computer Science", "M.S. Computer Engineering", "B.S. Software Engineering",
  "Ph.D. Computer Science", "B.S. Data Science", "M.S. Machine Learning"
];

export const mockTechnicalSkills = [
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

export const mockCompanies = [
  "Google", "Microsoft", "Apple", "Amazon", "Meta", "IBM", "Oracle", "Salesforce",
  "Adobe", "Tesla", "Netflix", "Airbnb", "Uber", "Lyft", "Twitter", "Snapchat",
  "LinkedIn", "Spotify", "Dropbox", "Square", "Intel", "AMD", "NVIDIA", "Cisco"
];

export const mockTechnicalPositions = [
  "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "Site Reliability Engineer",
  "Cloud Engineer", "Mobile Developer", "Game Developer", "Embedded Systems Engineer"
];

export const mockProjectPrefixes = [
  "Advanced", "Intelligent", "Smart", "Dynamic", "Automated", "Interactive",
  "Responsive", "Real-time", "Scalable", "Distributed", "Cloud-based", "AI-powered"
];

export const mockProjectTypes = [
  "Dashboard", "Analytics Platform", "E-commerce Application", "Social Network",
  "Recommendation System", "Content Management System", "Mobile Application",
  "Web Application", "Data Visualization Tool", "API Gateway", "Microservice",
  "Chat Application", "Game", "Learning Management System"
];

export const mockTechnicalCertifications = [
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

// Helper function to get random subset of array
export const getRandomSubset = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
