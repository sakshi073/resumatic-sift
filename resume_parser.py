
import os
import uuid
import random
from datetime import datetime

# In a real application, you would use libraries like:
# - PyPDF2 or pdfminer for PDF parsing
# - python-docx for DOCX parsing
# - NLTK or spaCy for NLP to extract entities
# - Regular expressions for pattern matching

# This is a mock implementation that simulates parsing resumes
def extract_resume_data(file_path, filename):
    """
    Extract structured data from a resume file.
    
    In a real implementation, this would use libraries to parse the actual content.
    For this demo, we return mock data based on the file type.
    """
    file_extension = os.path.splitext(filename)[1].lower()
    
    # Generate a unique ID for the resume
    resume_id = str(uuid.uuid4())
    
    # In a real implementation, you would read and parse the file content
    # Here, we'll generate mock data for demonstration
    mock_resume = {
        'id': resume_id,
        'fileName': filename,
        'name': random.choice(mock_names),
        'email': f"{resume_id[:8]}@example.com",
        'phone': f"+1 {random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}",
        'college': random.choice(mock_colleges),
        'degree': random.choice(mock_degrees),
        'cgpa': format(random.uniform(3.0, 4.0), '.2f'),
        'skills': random.sample(mock_skills, random.randint(5, 10)),
        'experience': [
            {
                'company': random.choice(mock_companies),
                'position': random.choice(mock_positions),
                'duration': f"{random.randint(1, 3)} years",
                'description': "Responsible for key initiatives and projects."
            } for _ in range(random.randint(1, 3))
        ],
        'projects': [
            {
                'name': f"{random.choice(mock_project_prefixes)} {random.choice(mock_project_types)}",
                'description': "An innovative project solving real-world problems.",
                'technologies': random.sample(mock_skills, random.randint(2, 5))
            } for _ in range(random.randint(1, 3))
        ],
        'certifications': random.sample(mock_certifications, random.randint(0, 3))
    }
    
    return mock_resume

# Mock data for generating resumes
mock_names = [
    "Alex Johnson", "Taylor Smith", "Jordan Williams", "Casey Brown", "Morgan Davis",
    "Riley Wilson", "Parker Moore", "Quinn Anderson", "Blake Thomas", "Jordan Miller"
]

mock_colleges = [
    "Stanford University", "MIT", "Harvard University", "UC Berkeley", "Princeton University",
    "Yale University", "Carnegie Mellon University", "Columbia University", "Cornell University", "University of Michigan"
]

mock_degrees = [
    "B.S. Computer Science", "M.S. Computer Engineering", "B.S. Software Engineering",
    "Ph.D. Computer Science", "B.S. Data Science", "M.S. Machine Learning",
    "MBA", "B.S. Business Administration", "M.S. Finance", "B.A. Economics"
]

# Only keeping technical skills, removing all other categories
mock_skills = [
    # Programming Languages
    "Python", "Java", "JavaScript", "C++", "C#", "Ruby", "PHP", "Go", "Swift", "Kotlin", 
    "TypeScript", "Rust", "R", "Scala", "Perl", "Haskell", "Matlab", "Shell Scripting",
    
    # Web Development
    "HTML", "CSS", "SASS/SCSS", "Bootstrap", "Tailwind CSS", "React", "Angular", "Vue.js", 
    "jQuery", "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET", 
    "Ruby on Rails", "Laravel", "WordPress", "Redux", "GraphQL", "REST API", "WebSockets",
    
    # Mobile Development
    "React Native", "Flutter", "Xamarin", "Android Development", "iOS Development", 
    "Kotlin Multiplatform", "Swift UI", "Jetpack Compose",
    
    # Database Technologies
    "SQL", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle Database", "Redis", 
    "Microsoft SQL Server", "Cassandra", "DynamoDB", "ElasticSearch", "Firebase",
    
    # Cloud Platforms & DevOps
    "AWS", "Microsoft Azure", "Google Cloud Platform (GCP)", "IBM Cloud", "Oracle Cloud",
    "Heroku", "DigitalOcean", "Docker", "Kubernetes", "Terraform", "Jenkins", "Travis CI", 
    "GitLab CI/CD", "GitHub Actions", "Ansible", "Chef", "Puppet", "Prometheus", "Grafana",
    
    # Data Science & AI
    "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Keras",
    "Jupyter Notebooks", "Hadoop", "Spark", "NLTK", "Computer Vision", "NLP",
    "Machine Learning", "Deep Learning", "Data Mining", "Reinforcement Learning",
    
    # Software Development Tools
    "Git", "GitHub", "GitLab", "Bitbucket", "JIRA", "Confluence", "Trello", "Slack",
    "VS Code", "IntelliJ IDEA", "Eclipse", "Postman", "Figma", "Adobe XD", "Sketch",
    
    # Other Technical Skills
    "Microservices", "RESTful APIs", "SOAP", "Agile Methodology", "Scrum", "Test-Driven Development",
    "Continuous Integration", "Continuous Deployment", "Unit Testing", "Load Testing",
    "Blockchain", "Cybersecurity", "Network Security", "Ethical Hacking", "Linux"
]

mock_companies = [
    "Google", "Microsoft", "Apple", "Amazon", "Meta", "IBM", "Oracle", "Salesforce",
    "Adobe", "Tesla", "Netflix", "Airbnb", "Uber", "Lyft", "Twitter", "Snapchat",
    "LinkedIn", "Spotify", "Dropbox", "Square", "Intel", "AMD", "NVIDIA", "Cisco"
]

mock_positions = [
    "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "Site Reliability Engineer",
    "Cloud Engineer", "Mobile Developer", "Game Developer", "Embedded Systems Engineer",
    "Product Manager", "Project Manager", "Business Analyst", "Marketing Manager",
    "Financial Analyst", "Data Analyst", "Sales Representative", "Account Executive"
]

mock_project_prefixes = [
    "Advanced", "Intelligent", "Smart", "Dynamic", "Automated", "Interactive",
    "Responsive", "Real-time", "Scalable", "Distributed", "Cloud-based", "AI-powered"
]

mock_project_types = [
    "Dashboard", "Analytics Platform", "E-commerce Application", "Social Network",
    "Recommendation System", "Content Management System", "Mobile Application",
    "Web Application", "Data Visualization Tool", "API Gateway", "Microservice",
    "Chat Application", "Game", "Learning Management System"
]

# Updated certifications list to keep only technical certifications
mock_certifications = [
    # Cloud & DevOps Certifications
    "AWS Certified Solutions Architect", "AWS Certified Developer", "AWS Certified DevOps Engineer",
    "Microsoft Certified: Azure Solutions Architect", "Microsoft Certified: Azure Developer",
    "Google Cloud Professional Cloud Architect", "Google Cloud Professional Data Engineer",
    "Kubernetes Certified Administrator (CKA)", "Certified Kubernetes Application Developer (CKAD)",
    "Docker Certified Associate", "HashiCorp Certified: Terraform Associate",
    
    # Programming & Development Certifications
    "Oracle Certified Java Programmer", "Microsoft Certified: .NET Developer",
    "Certified Python Developer", "JavaScript Certified Developer", "React Developer Certification",
    "Angular Certified Developer", "Node.js Certification", "Full Stack Web Developer Certification",
    
    # Data Science & AI Certifications
    "TensorFlow Developer Certificate", "Microsoft Certified: Azure AI Engineer",
    "IBM Data Science Professional Certificate", "Google Professional Machine Learning Engineer",
    "Deep Learning Specialization", "Applied Data Science with Python Certification",
    
    # Security Certifications
    "CompTIA Security+", "Certified Information Systems Security Professional (CISSP)",
    "Certified Ethical Hacker (CEH)", "Offensive Security Certified Professional (OSCP)",
    "Certified Information Security Manager (CISM)", "Cisco CCNA Security"
]
