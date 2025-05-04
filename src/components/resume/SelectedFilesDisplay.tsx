
import React from 'react';

interface SelectedFilesDisplayProps {
  files: File[];
}

const SelectedFilesDisplay: React.FC<SelectedFilesDisplayProps> = ({ files }) => {
  if (files.length === 0) {
    return null;
  }
  
  return (
    <div className="w-full max-w-md">
      <p className="text-sm mb-2 text-muted-foreground">
        {files.length} file{files.length === 1 ? '' : 's'} selected:
      </p>
      <div className="text-xs text-left max-h-24 overflow-y-auto rounded-md bg-muted p-2">
        {files.map((file, index) => (
          <div key={index} className="text-muted-foreground">
            {file.name} ({Math.round(file.size / 1024)} KB)
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedFilesDisplay;
