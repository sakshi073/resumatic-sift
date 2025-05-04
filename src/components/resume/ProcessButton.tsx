
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from 'lucide-react';

interface ProcessButtonProps {
  onClick: () => void;
  disabled: boolean;
  isProcessing: boolean;
  progress: number;
  onClear?: () => void;
  showClearButton?: boolean;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({ 
  onClick, 
  disabled, 
  isProcessing, 
  progress,
  onClear,
  showClearButton = false
}) => {
  return (
    <div className="flex gap-2">
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
      
      {showClearButton && onClear && (
        <Button
          variant="outline"
          onClick={onClear}
          disabled={isProcessing}
          className="transition-all duration-300"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default ProcessButton;
