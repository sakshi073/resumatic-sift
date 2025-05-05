
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import FileDropzone from '@/components/resume/FileDropzone';
import SelectedFilesDisplay from '@/components/resume/SelectedFilesDisplay';
import ProcessButton from '@/components/resume/ProcessButton';
import { processResumeFiles, clearResumeFiles } from '@/utils/resume';
import { toast } from 'sonner';

interface ResumeUploaderProps {
  onUploadComplete: () => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ 
  onUploadComplete, 
  isProcessing, 
  setIsProcessing 
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Listen for the custom clear event
    const handleClearEvent = () => {
      setSelectedFiles([]);
      setProgress(0);
      // Reset the file input if it exists
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    window.addEventListener('resume-uploader-clear', handleClearEvent);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resume-uploader-clear', handleClearEvent);
    };
  }, []);

  const handleProcessResumes = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one resume file.');
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(0);

      // Process the files and track progress
      await processResumeFiles(selectedFiles, (progressPercent) => {
        setProgress(progressPercent);
      });

      // Clear selected files and notify parent
      setSelectedFiles([]);
      onUploadComplete();
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast.success(`Successfully processed ${selectedFiles.length} resume(s)`);
    } catch (error) {
      console.error('Error processing resumes:', error);
      toast.error('Failed to process resumes. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleClearFiles = async () => {
    try {
      await clearResumeFiles();
      setSelectedFiles([]);
      setProgress(0);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Resume processing data cleared');
    } catch (error) {
      console.error('Error clearing files:', error);
      toast.error('Failed to clear resume data');
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <FileDropzone 
          onFileChange={handleFileChange} 
          disabled={isProcessing}
          fileInputRef={fileInputRef}
        />
        
        <SelectedFilesDisplay files={selectedFiles} />
        
        <ProcessButton 
          onClick={handleProcessResumes}
          disabled={selectedFiles.length === 0 || isProcessing}
          isProcessing={isProcessing}
          progress={progress}
          onClear={handleClearFiles}
          showClearButton={selectedFiles.length > 0 || isProcessing}
        />
      </div>
    </Card>
  );
};

export default ResumeUploader;
