
import { Resume } from './resumeParser';

export const exportToCSV = (resumes: Resume[]): void => {
  const headers = [
    'Name', 'Email', 'Phone', 'College', 'Degree', 'CGPA', 'Skills', 
    'Experience', 'Projects', 'Certifications'
  ];
  
  const csvRows = [
    headers.join(','),
    ...resumes.map(resume => [
      `"${resume.name}"`,
      `"${resume.email}"`,
      `"${resume.phone}"`,
      `"${resume.college}"`,
      `"${resume.degree}"`,
      `"${resume.cgpa}"`,
      `"${resume.skills.join('; ')}"`,
      `"${resume.experience.map(exp => `${exp.position} at ${exp.company}`).join('; ')}"`,
      `"${resume.projects.map(proj => proj.name).join('; ')}"`,
      `"${resume.certifications.join('; ')}"`
    ].join(','))
  ];
  
  const csvContent = csvRows.join('\n');
  
  // Create a blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'resume_data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (resumes: Resume[]): void => {
  // In a real app, we would use a library like xlsx or exceljs
  // For this demo, we'll just use CSV and change the extension
  const headers = [
    'Name', 'Email', 'Phone', 'College', 'Degree', 'CGPA', 'Skills', 
    'Experience', 'Projects', 'Certifications'
  ];
  
  const csvRows = [
    headers.join(','),
    ...resumes.map(resume => [
      `"${resume.name}"`,
      `"${resume.email}"`,
      `"${resume.phone}"`,
      `"${resume.college}"`,
      `"${resume.degree}"`,
      `"${resume.cgpa}"`,
      `"${resume.skills.join('; ')}"`,
      `"${resume.experience.map(exp => `${exp.position} at ${exp.company}`).join('; ')}"`,
      `"${resume.projects.map(proj => proj.name).join('; ')}"`,
      `"${resume.certifications.join('; ')}"`
    ].join(','))
  ];
  
  const csvContent = csvRows.join('\n');
  
  // Create a blob and download
  const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'resume_data.xlsx');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
