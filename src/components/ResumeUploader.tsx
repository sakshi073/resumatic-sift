
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FilePlus, Loader2 } from 'lucide-react';
import { Resume, extractResumeData, saveResumeToSupabase } from '@/utils/resumeParser';
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';

interface ResumeUploaderProps {
  onUploadComplete: (resumes: Resume[]) => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ 
  onUploadComplete, 
  isProcessing, 
  setIsProcessing 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { isAuthenticated } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      setSelectedFiles(filesArray);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to upload resumes.",
        variant: "destructive"
      });
      return;
    }

    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one resume file to upload.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const totalFiles = selectedFiles.length;
      const parsedResumes: Resume[] = [];
      
      for (let i = 0; i < totalFiles; i++) {
        const file = selectedFiles[i];
        
        // Check file type (in a real app, validate if it's a PDF, DOCX, etc.)
        if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx') && !file.name.endsWith('.txt')) {
          toast({
            title: "Unsupported file format",
            description: `${file.name} is not a supported format. Please upload PDF, DOCX, or TXT files.`,
            variant: "destructive"
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
          toast({
            title: "Failed to save resume",
            description: `Could not save ${file.name} to database.`,
            variant: "destructive"
          });
        }
        
        // Update progress
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
      }
      
      // Reset progress and provide results
      setTimeout(() => {
        setUploadProgress(0);
        setSelectedFiles([]);
        onUploadComplete(parsedResumes);
        
        toast({
          title: "Processing complete",
          description: `Successfully processed ${parsedResumes.length} resume${parsedResumes.length === 1 ? '' : 's'}.`
        });
        
        setIsProcessing(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error processing resumes:", error);
      setIsProcessing(false);
      setUploadProgress(0);
      
      toast({
        title: "Processing failed",
        description: "An error occurred while processing the resumes. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full animate-fade-up">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 flex flex-col items-center justify-center text-center
          ${dragActive ? 'border-primary/70 bg-primary/5' : 'border-border/70 hover:border-primary/50 hover:bg-secondary/50'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        
        <h3 className="text-lg font-medium">Upload Resumes</h3>
        <p className="text-muted-foreground mt-2 mb-4 max-w-md">
          Drag and drop resume files here, or click to browse. Supports PDF, DOCX, and TXT.
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <Button 
            variant="outline" 
            onClick={triggerFileInput}
            disabled={isProcessing || !isAuthenticated}
            className="transition-all duration-300"
          >
            <FilePlus className="mr-2 h-4 w-4" /> Browse Files
          </Button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt"
            multiple
            className="hidden"
            disabled={isProcessing || !isAuthenticated}
          />
          
          <Button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || isProcessing || !isAuthenticated}
            className="transition-all duration-300"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing ({uploadProgress}%)
              </>
            ) : (
              'Process Resumes'
            )}
          </Button>
        </div>
        
        {!isAuthenticated && (
          <p className="text-sm text-amber-500 font-medium mb-4">
            You need to be logged in to upload resumes.
          </p>
        )}
        
        {selectedFiles.length > 0 && (
          <div className="w-full max-w-md">
            <p className="text-sm mb-2 text-muted-foreground">
              {selectedFiles.length} file{selectedFiles.length === 1 ? '' : 's'} selected:
            </p>
            <div className="text-xs text-left max-h-24 overflow-y-auto rounded-md bg-muted p-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="text-muted-foreground">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
