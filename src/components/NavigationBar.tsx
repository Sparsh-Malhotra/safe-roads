import React from 'react';
import { Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RouteData {
  summary: string;
  distance: string;
  duration: string;
  steps: any[];
  polyline: string;
}

interface NavigationBarProps {
  route: RouteData | null;
  onStartNavigation: () => void;
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  route, 
  onStartNavigation,
  className 
}) => {
  if (!route) return null;
  
  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40 animate-slide-up",
        "border-t border-gray-200 px-4 py-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-sm">{route.summary}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <span>{route.distance}</span>
            <div className="w-1 h-1 rounded-full bg-muted-foreground mx-2"></div>
            <span>{route.duration}</span>
          </div>
        </div>
        
        <button
          onClick={onStartNavigation}
          className={cn(
            "px-4 py-2 rounded-md bg-safety text-safety-foreground press-effect",
            "flex items-center justify-center gap-2 text-sm font-medium"
          )}
        >
          <Navigation className="h-4 w-4" />
          Start Navigation
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;