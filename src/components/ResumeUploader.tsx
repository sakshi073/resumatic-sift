
import React, { useState } from 'react';
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { Resume } from '@/utils/resume/types';
import { processResumeFiles } from '@/utils/resume/upload';
import FileDropzone from './resume/FileDropzone';
import SelectedFilesDisplay from './resume/SelectedFilesDisplay';
import ProcessButton from './resume/ProcessButton';

interface ResumeUploaderProps {
  onUploadComplete: () => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ 
  onUploadComplete, 
  isProcessing, 
  setIsProcessing 
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { isAuthenticated } = useAuth();

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const clearFiles = () => {
    setSelectedFiles([]);
  };

  const handleUpload = async () => {
    if (!isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to upload resumes."
      });
      return;
    }

    if (selectedFiles.length === 0) {
      toast("No files selected", {
        description: "Please select at least one resume file to upload."
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      await processResumeFiles(selectedFiles, setUploadProgress);
      
      // Reset progress and provide results
      setTimeout(() => {
        setUploadProgress(0);
        clearFiles(); // Clear selected files after successful processing
        onUploadComplete();
        
        toast("Processing complete", {
          description: `Successfully processed resumes.`
        });
        
        setIsProcessing(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error processing resumes:", error);
      setIsProcessing(false);
      setUploadProgress(0);
      
      toast("Processing failed", {
        description: "An error occurred while processing the resumes. Please try again."
      });
    }
  };

  return (
    <div className="w-full animate-fade-up">
      <FileDropzone
        isProcessing={isProcessing}
        isAuthenticated={isAuthenticated}
        onFileSelect={handleFileSelect}
        selectedFiles={selectedFiles}
        onClearFiles={clearFiles}
      />
      
      {selectedFiles.length > 0 && (
        <div className="mt-6 flex flex-col items-center">
          <SelectedFilesDisplay files={selectedFiles} />
          
          <div className="mt-4">
            <ProcessButton
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isProcessing || !isAuthenticated}
              isProcessing={isProcessing}
              progress={uploadProgress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
