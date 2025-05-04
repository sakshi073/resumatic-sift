
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ResumeUploader from '@/components/ResumeUploader';
import SearchFilter from '@/components/SearchFilter';
import ResumeTable from '@/components/ResumeTable';
import { Resume } from '@/utils/resume/types';
import { fetchResumesFromSupabase } from '@/utils/resume/storage';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Index = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Fetch resumes from Supabase when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      loadResumes();
    } else {
      setIsLoading(false);
      setResumes([]);
      setFilteredResumes([]);
    }
  }, [isAuthenticated]);

  const loadResumes = async () => {
    try {
      setIsLoading(true);
      const fetchedResumes = await fetchResumesFromSupabase();
      setResumes(fetchedResumes);
      setFilteredResumes(fetchedResumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error('Failed to load resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadComplete = async () => {
    // After upload completes, reload all resumes from the database
    // This ensures we have the latest data and clears the upload history
    await loadResumes();
    toast.success('Resumes processed successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <Header />
        <main className="py-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <section className="bg-card rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">
                Resume Summarization
              </h2>
              <p className="text-muted-foreground mb-6">
                Upload your files for instant summarization and analysis.
              </p>
              <ResumeUploader 
                onUploadComplete={handleUploadComplete}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </section>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 w-64 bg-muted rounded-md mb-4" />
                  <div className="h-52 w-full max-w-3xl bg-card rounded-md" />
                </div>
              </div>
            ) : resumes.length > 0 ? (
              <section className="bg-card rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    Resume Results
                    <span className="ml-2 text-sm text-muted-foreground font-medium">
                      {filteredResumes.length} of {resumes.length} resume{resumes.length === 1 ? '' : 's'}
                    </span>
                  </h2>
                </div>
                <SearchFilter 
                  resumes={resumes}
                  setFilteredResumes={setFilteredResumes}
                />
                <ResumeTable resumes={filteredResumes} />
              </section>
            ) : isAuthenticated ? (
              <section className="text-center py-12 bg-card rounded-lg shadow">
                <h3 className="text-xl font-semibold">
                  No resumes found
                </h3>
                <p className="text-muted-foreground mt-2">
                  Upload some resumes to get started
                </p>
              </section>
            ) : (
              <section className="text-center py-12 bg-card rounded-lg shadow">
                <h3 className="text-xl font-semibold">
                  Please log in to view and manage resumes
                </h3>
              </section>
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
