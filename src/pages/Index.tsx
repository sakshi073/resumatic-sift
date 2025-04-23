
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ResumeUploader from '@/components/ResumeUploader';
import SearchFilter from '@/components/SearchFilter';
import ResumeTable from '@/components/ResumeTable';
import { Resume, fetchResumesFromSupabase } from '@/utils/resumeParser';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Sparkle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#18142c] via-[#262247] to-[#8B5CF610] dark:from-[#1A1F2C] dark:via-[#403E4380] dark:to-[#160B2E] transition-colors duration-700 relative overflow-x-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-40 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#9b87f580] via-[#8B5CF650] to-[#403E4380] blur-[160px] animate-spin-slow" />
        <div className="absolute w-96 h-96 bottom-0 left-1/4 rounded-full bg-gradient-to-tr from-[#F97316]/20 to-[#1EAEDB]/30 blur-[100px] animate-pulse-slow" />
        <div className="absolute w-80 h-80 -bottom-36 right-8 rounded-full bg-[#D946EF44] blur-[80px] animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <Header />
        <main className="py-10 md:py-14 px-4 sm:px-8 animate-fade-in">
          <div className="max-w-5xl mx-auto space-y-12">
            <section className="relative glassmorphism rounded-xl shadow-xl border border-white/20 px-6 md:px-12 pt-10 pb-10 animate-scale-in overflow-hidden">
              {/* Animated Sparkle Icon accent */}
              <span className="absolute right-8 top-4 text-transparent bg-gradient-to-br from-[#F97316] via-primary to-[#D946EF] bg-clip-text">
                <Sparkle className="w-10 h-10 animate-pulse-slow drop-shadow-glow" />
              </span>
              <h2 className="text-4xl text-gradient-primary font-extrabold mb-4 tracking-tight animate-fade-in">
                Resume Summarization
              </h2>
              <p className="text-lg text-muted-foreground mb-8 animate-fade-up">
                Upload your files for instant summarization and analysis.<br className="hidden md:block" />
                <span className="inline-flex items-center gap-2 font-medium text-primary/80">
                  <Sparkle className="w-5 h-5 animate-pulse inline drop-shadow-glow" /> Futuristic PDF Parsing Powered by AI
                </span>
              </p>
              <ResumeUploader 
                onUploadComplete={handleUploadComplete}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </section>
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 w-64 bg-gradient-to-r from-primary/10 to-muted rounded-xl mb-4" />
                  <div className="h-52 w-full max-w-3xl glassmorphism rounded-xl" />
                </div>
              </div>
            ) : resumes.length > 0 ? (
              <section className="space-y-8 animate-fade-in glassmorphism rounded-xl border border-white/10 shadow-lg px-4 py-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gradient tracking-tight flex items-center gap-2">
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
              <section className="text-center py-20 glassmorphism rounded-xl animate-fade-up border border-white/10">
                <h3 className="text-2xl font-bold text-gradient-primary animate-fade-in">
                  No resumes found
                </h3>
                <p className="text-muted-foreground mt-3 animate-fade-up">
                  Upload some resumes to get started
                </p>
              </section>
            ) : (
              <section className="text-center py-20 glassmorphism rounded-xl animate-fade-up border border-white/10">
                <h3 className="text-2xl font-bold text-gradient-primary">
                  Please log in to view and manage resumes
                </h3>
              </section>
            )}
          </div>
        </main>
      </div>
      <Toaster />
      <style>
        {`
          .glassmorphism {
            background: rgba(36, 33, 57, 0.82);
            backdrop-filter: blur(24px) saturate(170%);
            -webkit-backdrop-filter: blur(24px) saturate(170%);
            border-radius: 1.25rem;
            border: 1px solid rgba(255,255,255,0.12);
          }
          .text-gradient {
            background: linear-gradient(90deg, #8B5CF6 20%, #F97316 80%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
          .text-gradient-primary {
            background: linear-gradient(90deg, #9b87f5 20%, #8B5CF6 50%, #D946EF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
          .drop-shadow-glow {
            filter: drop-shadow(0 0 12px #D946EF88) drop-shadow(0 0 16px #8B5CF655);
          }
          .animate-spin-slow {
            animation: spin 30s linear infinite;
          }
          .animate-pulse-slow {
            animation: pulse 2.3s cubic-bezier(0.4,0,0.6,1) infinite;
          }
          @keyframes spin {
            0% {transform: rotate(0deg);}
            100% {transform: rotate(360deg);}
          }
          @keyframes pulse {
            0%, 100% { opacity: 1 }
            50% { opacity: 0.5 }
          }
        `}
      </style>
    </div>
  );
};

export default Index;
