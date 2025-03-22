import React from 'react';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RouteData {
  summary: string;
  distance: string;
  duration: string;
  steps: any[];
  polyline: string;
  safetyScore?: number;
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
  
  const safetyScore = route.safetyScore || 0;
  
  let safetyLevel = "Unknown";
  let safetyColor = "bg-gray-500";
  let safetyTextColor = "text-gray-700";
  
  if (safetyScore >= 80) {
    safetyLevel = "Very Safe";
    safetyColor = "bg-green-500";
    safetyTextColor = "text-green-700";
  } else if (safetyScore >= 60) {
    safetyLevel = "Safe";
    safetyColor = "bg-green-400";
    safetyTextColor = "text-green-600";
  } else if (safetyScore >= 40) {
    safetyLevel = "Moderate";
    safetyColor = "bg-yellow-400";
    safetyTextColor = "text-yellow-700";
  } else if (safetyScore >= 20) {
    safetyLevel = "Caution";
    safetyColor = "bg-amber-500";
    safetyTextColor = "text-amber-700";
  } else {
    safetyLevel = "High Risk";
    safetyColor = "bg-red-500";
    safetyTextColor = "text-red-700";
  }
  
  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40 animate-slide-up",
        "border-t border-gray-200",
        className
      )}
    >
      {/* Safety score progress bar */}
      <div className="w-full h-1 bg-gray-200">
        <div 
          className={safetyColor}
          style={{ width: `${safetyScore}%`, height: '100%' }}
        ></div>
      </div>
      
      <div className="px-4 py-3">
        {/* Route header row */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">{route.summary}</h3>
          <button
            onClick={onStartNavigation}
            className={cn(
              "px-4 py-2 rounded-md bg-safety text-safety-foreground press-effect",
              "flex items-center justify-center gap-1 text-sm font-medium"
            )}
          >
            <span>Start</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        {/* Route details row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Distance and duration */}
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              <span>{route.duration}</span>
            </div>
            
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            
            <div className="flex items-center text-sm text-gray-600">
              <span>{route.distance}</span>
            </div>
            
            {/* Safety level indicator */}
            <div className="flex items-center">
              <div className={cn("w-2 h-2 rounded-full mx-2", safetyColor)}></div>
              <span className={cn("text-sm", safetyTextColor)}>{safetyLevel}</span>
            </div>
          </div>
          
        </div>
        
        {/* Warning message for high-risk routes */}
        {safetyScore < 30 && (
          <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded-md text-xs text-red-600 flex items-start">
            <AlertTriangle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 mt-0.5" />
            <p>This route has a high risk rating. Consider alternative routes or drive with extra caution.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;