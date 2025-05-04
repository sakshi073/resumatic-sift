
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { FilePlus, Upload } from 'lucide-react';

interface FileDropzoneProps {
  isProcessing: boolean;
  isAuthenticated: boolean;
  onFileSelect: (files: File[]) => void;
  selectedFiles: File[];
  onClearFiles: () => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  isProcessing,
  isAuthenticated,
  onFileSelect,
  selectedFiles,
  onClearFiles
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFileSelect(filesArray);
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
      onFileSelect(filesArray);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
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
        
        {selectedFiles.length > 0 && !isProcessing && (
          <Button 
            variant="ghost" 
            onClick={onClearFiles}
            className="transition-all duration-300"
          >
            Clear Files
          </Button>
        )}
      </div>
      
      {!isAuthenticated && (
        <p className="text-sm text-amber-500 font-medium mb-4">
          You need to be logged in to upload resumes.
        </p>
      )}
    </div>
  );
};

export default FileDropzone;
