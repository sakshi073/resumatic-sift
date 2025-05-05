
import { supabase } from '@/integrations/supabase/client';
import { Resume } from './types';
import { Database } from '@/integrations/supabase/types';

type Tables = Database['public']['Tables'];

// Save resume to Supabase
export const saveResumeToSupabase = async (resume: Resume): Promise<string> => {
  try {
    // Get current user ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('resumes')
      .insert({
        name: resume.name,
        email: resume.email,
        phone: resume.phone,
        college: resume.college,
        degree: resume.degree,
        cgpa: parseFloat(resume.cgpa),
        skills: resume.skills,
        experience: resume.experience,
        projects: resume.projects,
        certifications: resume.certifications,
        user_id: user.id
      } as Tables['resumes']['Insert'])
      .select('id')
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from insert');
    return data.id;
  } catch (error) {
    console.error('Error saving resume:', error);
    throw new Error('Failed to save resume to database');
  }
};

// Fetch resumes from Supabase
export const fetchResumesFromSupabase = async (): Promise<Resume[]> => {
  try {
    // Get current user ID to only retrieve their resumes
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No authenticated user found, returning empty resume list');
      return [];
    }
    
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw error;
    
    return (data || []).map((item: any) => ({
      id: item.id,
      fileName: `Resume_${item.name.replace(/\s+/g, '_')}.pdf`,
      name: item.name,
      email: item.email,
      phone: item.phone || '',
      college: item.college || '',
      degree: item.degree || '',
      cgpa: item.cgpa ? item.cgpa.toString() : '',
      skills: item.skills || [],
      experience: item.experience || [],
      projects: item.projects || [],
      certifications: item.certifications || []
    }));
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return [];
  }
};

// Clear all resume processing data
export const clearResumeFiles = async (): Promise<void> => {
  try {
    console.log('Clearing resume uploader state...');
    
    // This function doesn't delete from the database
    // It's meant to be used to clear the local state in the UI
    // We'll publish a custom event that components can listen for
    const clearEvent = new CustomEvent('resume-uploader-clear');
    window.dispatchEvent(clearEvent);
    
    console.log('Resume files cleared from UI');
    return Promise.resolve();
  } catch (error) {
    console.error('Error clearing resume files:', error);
    return Promise.reject(error);
  }
};
