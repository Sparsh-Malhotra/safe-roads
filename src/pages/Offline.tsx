import React from 'react';
import { MapIcon, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Offline = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-background/30 to-background p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-card glass-morphism">
        <div className="flex flex-col items-center space-y-6 mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mb-2">
            <WifiOff className="h-8 w-8 text-yellow-500" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">You're Offline</h1>
          <p className="text-sm text-muted-foreground text-center">
            It looks like you've lost your internet connection. Some features may not be available until you're back online.
          </p>
          
          <div className="bg-secondary/50 rounded-lg p-4 w-full">
            <div className="flex items-center space-x-2 mb-2">
              <MapIcon className="h-5 w-5 text-primary" />
              <h3 className="font-medium">What you can do:</h3>
            </div>
            <ul className="text-sm text-muted-foreground list-disc pl-10 space-y-1">
              <li>View previously loaded maps</li>
              <li>Create reports (they'll be submitted when you're back online)</li>
              <li>View your previous reports</li>
            </ul>
          </div>
          
          <Button onClick={handleRetry} className="w-full bg-safety text-safety-foreground">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Offline;