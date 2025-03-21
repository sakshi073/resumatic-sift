
# Resumatic - Resume Summarization Tool

A Python Flask application for parsing, analyzing, and comparing resume data.

## Features

- Upload multiple resume files (PDF, DOCX, TXT)
- Extract structured information from resumes
- Search and filter resumes by name, skills, CGPA, etc.
- Export filtered results as CSV or Excel files
- User-friendly web interface

## Installation

1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

1. Run the application:
   ```
   python app.py
   ```
2. Open your browser and go to `http://127.0.0.1:5000`
3. Upload resume files and use the interface to analyze, search, and export data

## Project Structure

- `app.py` - Main Flask application
- `resume_parser.py` - Functions for parsing resume data
- `templates/` - HTML templates
- `static/` - CSS, JavaScript, and other static files
- `uploads/` - Directory for uploaded files (created automatically)
- `exports/` - Directory for exported files (created automatically)

## Notes

This application currently uses mock data for demonstration purposes. In a production environment, you would integrate with actual resume parsing libraries like PyPDF2, pdfminer, or python-docx to extract real data from uploaded files.

## Requirements

See `requirements.txt` for the full list of dependencies.
