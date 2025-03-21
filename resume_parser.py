
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

mock_skills = [
    "JavaScript", "Python", "Java", "C++", "React", "Angular", "Vue.js", "Node.js",
    "Express", "Django", "Flask", "TensorFlow", "PyTorch", "SQL", "MongoDB", "AWS",
    "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Git", "React Native", "Swift",
    "Kotlin", "Flutter", "TypeScript", "Go", "Rust", "Ruby", "PHP", "Scala",
    "Project Management", "Market Analysis", "Financial Modeling", "Data Analysis",
    "Strategic Planning", "Team Leadership", "Client Relations", "Public Speaking",
    "Sales", "Marketing", "Content Strategy", "SEO", "Social Media Marketing",
    "Business Development", "Negotiation", "CRM", "Microsoft Excel", "PowerPoint"
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

mock_certifications = [
    "AWS Certified Solutions Architect", "Google Cloud Professional", "Microsoft Azure Certification",
    "Certified Kubernetes Administrator", "TensorFlow Developer Certificate", "CompTIA Security+",
    "Cisco CCNA", "Oracle Certified Java Programmer", "Certified Scrum Master",
    "PMP (Project Management Professional)", "CFA (Chartered Financial Analyst)",
    "SHRM-CP (Society for Human Resource Management)", "Certified Public Accountant (CPA)",
    "Certified Marketing Professional", "Agile Certified Practitioner", "Six Sigma Black Belt"
]
