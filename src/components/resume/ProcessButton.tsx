
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface ProcessButtonProps {
  onClick: () => void;
  disabled: boolean;
  isProcessing: boolean;
  progress: number;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({ 
  onClick, 
  disabled, 
  isProcessing, 
  progress 
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="transition-all duration-300"
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing ({progress}%)
        </>
      ) : (
        'Process Resumes'
      )}
    </Button>
  );
};

export default ProcessButton;
