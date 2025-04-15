
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ResumeUploader from '@/components/ResumeUploader';
import SearchFilter from '@/components/SearchFilter';
import ResumeTable from '@/components/ResumeTable';
import { Resume, fetchResumesFromSupabase } from '@/utils/resumeParser';
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

  const handleUploadComplete = (newResumes: Resume[]) => {
    // Combine new resumes with existing ones
    const updatedResumes = [...resumes, ...newResumes];
    setResumes(updatedResumes);
    setFilteredResumes(updatedResumes);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <main className="py-8 px-8">
          <div className="max-w-5xl mx-auto space-y-10">
            <section>
              <h2 className="text-3xl font-semibold mb-6 animate-fade-in">Resume Summarization</h2>
              <ResumeUploader 
                onUploadComplete={handleUploadComplete}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </section>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 w-64 bg-muted rounded-md mb-4"></div>
                  <div className="h-48 w-full max-w-3xl bg-muted rounded-md"></div>
                </div>
              </div>
            ) : resumes.length > 0 ? (
              <section className="space-y-6">
                <div className="flex items-center justify-between animate-fade-in">
                  <h2 className="text-2xl font-semibold">
                    Resume Results
                    <span className="ml-2 text-sm text-muted-foreground">
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
              <section className="text-center py-12">
                <h3 className="text-xl font-medium text-muted-foreground">
                  No resumes found
                </h3>
                <p className="text-muted-foreground mt-2">
                  Upload some resumes to get started
                </p>
              </section>
            ) : (
              <section className="text-center py-12">
                <h3 className="text-xl font-medium text-muted-foreground">
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
