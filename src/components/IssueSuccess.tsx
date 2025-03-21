
import React from 'react';
import { CheckCircleIcon, MapPinIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IssueSuccessProps {
  onClose: () => void;
  className?: string;
}

const IssueSuccess: React.FC<IssueSuccessProps> = ({ onClose, className }) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-6 space-y-4",
      className
    )}>
      <div className="rounded-full bg-green-100 p-3">
        <CheckCircleIcon className="h-10 w-10 text-green-600" />
      </div>
      
      <h3 className="text-xl font-semibold tracking-tight">Report Submitted</h3>
      
      <p className="text-muted-foreground text-sm max-w-xs">
        Thank you for helping make our roads safer. Your report has been submitted successfully and will be reviewed by our team.
      </p>
      
      <div className="bg-secondary/50 rounded-lg p-4 w-full text-left">
        <div className="flex items-start space-x-2">
          <MapPinIcon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium">What happens next?</p>
            <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
              <li>Your report will be reviewed by safety officials</li>
              <li>It will be used to improve route recommendations</li>
              <li>Local authorities may take action based on your report</li>
            </ul>
          </div>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="mt-2 w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors press-effect"
      >
        Done
      </button>
    </div>
  );
};

export default IssueSuccess;
