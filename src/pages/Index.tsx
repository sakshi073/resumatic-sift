
import React, { useState } from 'react';
import Header from '@/components/Header';
import ResumeUploader from '@/components/ResumeUploader';
import SearchFilter from '@/components/SearchFilter';
import ResumeTable from '@/components/ResumeTable';
import { Resume } from '@/utils/resumeParser';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadComplete = (newResumes: Resume[]) => {
    // Combine new resumes with existing ones, avoiding duplicates by ID
    const existingIds = new Set(resumes.map(r => r.id));
    const uniqueNewResumes = newResumes.filter(r => !existingIds.has(r.id));
    
    const updatedResumes = [...resumes, ...uniqueNewResumes];
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
            
            {resumes.length > 0 && (
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
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
