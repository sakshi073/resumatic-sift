
from flask import Flask, render_template, request, jsonify, send_file
import os
from werkzeug.utils import secure_filename
import uuid
import pandas as pd
import json
from resume_parser import extract_resume_data

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'docx', 'txt'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# In-memory storage for parsed resumes (in a real app, use a database)
resumes_data = []

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'files[]' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    files = request.files.getlist('files[]')
    parsed_resumes = []
    
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            try:
                # Parse resume data
                resume_data = extract_resume_data(file_path, filename)
                parsed_resumes.append(resume_data)
                resumes_data.append(resume_data)
            except Exception as e:
                return jsonify({'error': f'Error parsing file {filename}: {str(e)}'}), 500
    
    return jsonify({'resumes': parsed_resumes})

@app.route('/resumes', methods=['GET'])
def get_resumes():
    return jsonify({'resumes': resumes_data})

@app.route('/search', methods=['POST'])
def search_resumes():
    data = request.get_json()
    search_term = data.get('searchTerm', '').lower()
    skills = data.get('skills', [])
    min_cgpa = data.get('minCGPA', '')
    
    filtered_resumes = resumes_data.copy()
    
    # Filter by search term
    if search_term:
        filtered_resumes = [
            resume for resume in filtered_resumes
            if (search_term in resume['name'].lower() or
                search_term in resume['college'].lower() or
                search_term in resume['email'].lower() or
                search_term in resume['degree'].lower() or
                any(search_term in exp['company'].lower() or search_term in exp['position'].lower() 
                    for exp in resume['experience']) or
                any(search_term in proj['name'].lower() or search_term in proj['description'].lower() 
                    for proj in resume['projects']))
        ]
    
    # Filter by skills (all selected skills must be present)
    if skills:
        filtered_resumes = [
            resume for resume in filtered_resumes
            if all(skill in resume['skills'] for skill in skills)
        ]
    
    # Filter by minimum CGPA
    if min_cgpa:
        try:
            min_cgpa_value = float(min_cgpa)
            filtered_resumes = [
                resume for resume in filtered_resumes
                if float(resume['cgpa']) >= min_cgpa_value
            ]
        except ValueError:
            pass
    
    return jsonify({'resumes': filtered_resumes})

@app.route('/export', methods=['POST'])
def export_resumes():
    data = request.get_json()
    format_type = data.get('format', 'csv')
    resumes_to_export = data.get('resumes', resumes_data)
    
    if not resumes_to_export:
        return jsonify({'error': 'No resumes to export'}), 400
    
    # Convert to DataFrame for easy export
    rows = []
    for resume in resumes_to_export:
        row = {
            'Name': resume['name'],
            'Email': resume['email'],
            'Phone': resume['phone'],
            'College': resume['college'],
            'Degree': resume['degree'],
            'CGPA': resume['cgpa'],
            'Skills': '; '.join(resume['skills']),
            'Experience': '; '.join([f"{exp['position']} at {exp['company']}" for exp in resume['experience']]),
            'Projects': '; '.join([proj['name'] for proj in resume['projects']]),
            'Certifications': '; '.join(resume['certifications'])
        }
        rows.append(row)
    
    df = pd.DataFrame(rows)
    
    # Export to requested format
    if format_type == 'csv':
        export_path = 'exports/resume_data.csv'
        os.makedirs('exports', exist_ok=True)
        df.to_csv(export_path, index=False)
        return send_file(export_path, as_attachment=True, download_name='resume_data.csv')
    else:  # Excel
        export_path = 'exports/resume_data.xlsx'
        os.makedirs('exports', exist_ok=True)
        df.to_excel(export_path, index=False)
        return send_file(export_path, as_attachment=True, download_name='resume_data.xlsx')

if __name__ == '__main__':
    app.run(debug=True)
