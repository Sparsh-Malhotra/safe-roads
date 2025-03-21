
import React from 'react';
import { AlertTriangleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportButtonProps {
  onClick: () => void;
  className?: string;
}

const ReportButton: React.FC<ReportButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-10 flex items-center justify-center",
        "h-16 w-16 rounded-full bg-safety text-safety-foreground shadow-button",
        "hover:bg-safety-hover transition-all duration-300 press-effect",
        "focus:outline-none focus:ring-2 focus:ring-safety focus:ring-offset-2",
        className
      )}
      aria-label="Report Issue"
    >
      <AlertTriangleIcon className="h-6 w-6" />
      <span className="sr-only">Report Issue</span>
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 h-1/2 w-1/2 bg-white/10 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
        />
      </div>
    </button>
  );
};

export default ReportButton;
