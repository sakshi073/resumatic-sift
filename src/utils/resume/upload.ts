
import { Resume } from './types';
import { extractResumeData } from './parser';
import { saveResumeToSupabase } from './storage';
import { toast } from "sonner";

export async function processResumeFiles(
  files: File[],
  onProgressUpdate: (progress: number) => void
): Promise<Resume[]> {
  const totalFiles = files.length;
  const parsedResumes: Resume[] = [];
  
  for (let i = 0; i < totalFiles; i++) {
    const file = files[i];
    
    // Check file type
    if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx') && !file.name.endsWith('.txt')) {
      toast("Unsupported file format", {
        description: `${file.name} is not a supported format. Please upload PDF, DOCX, or TXT files.`
      });
      continue;
    }
    
    // Process the file and extract resume data
    const resumeData = await extractResumeData(file);
    
    // Save to Supabase
    try {
      const resumeId = await saveResumeToSupabase(resumeData);
      // Update the ID to the one from the database
      resumeData.id = resumeId;
      parsedResumes.push(resumeData);
    } catch (error) {
      console.error('Error saving resume:', error);
      toast("Failed to save resume", {
        description: `Could not save ${file.name} to database.`
      });
    }
    
    // Update progress
    onProgressUpdate(Math.round(((i + 1) / totalFiles) * 100));
  }
  
  return parsedResumes;
}
