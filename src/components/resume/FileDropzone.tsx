
import React, { useRef, DragEvent, useEffect } from 'react';
import { Upload } from 'lucide-react';

interface FileDropzoneProps {
  onFileChange: (files: FileList | null) => void;
  disabled?: boolean;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileChange, disabled = false, fileInputRef }) => {
  const internalRef = useRef<HTMLInputElement>(null);
  
  // Use the provided ref or fallback to internal ref
  const inputRef = fileInputRef || internalRef;
  
  // Listen for the global clear event
  useEffect(() => {
    const handleClearEvent = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };
    
    window.addEventListener('resume-uploader-clear', handleClearEvent);
    return () => window.removeEventListener('resume-uploader-clear', handleClearEvent);
  }, [inputRef]);
  
  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onFileChange(e.target.files);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.preventDefault();
      e.stopPropagation();
      
      const files = e.dataTransfer.files;
      if (files) {
        onFileChange(files);
      }
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                transition-colors hover:border-primary/50 hover:bg-accent/50
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt"
        multiple
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
      
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
        
        <div className="flex flex-col space-y-1 text-center">
          <p className="text-sm font-medium">
            Drop resume files here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, DOCX and TXT formats
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileDropzone;
