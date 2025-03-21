
import React, { useState, useEffect } from 'react';
import { MapPinIcon, XIcon, AlertTriangleIcon, LocateIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrentLocation, getAddressFromCoordinates } from '@/utils/location';
import { Button } from './ui/button';
import ImageUpload from './ImageUpload';
import IssueSuccess from './IssueSuccess';

interface IssueReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const IssueReportModal: React.FC<IssueReportModalProps> = ({ 
  isOpen, 
  onClose, 
  className 
}) => {
  const [step, setStep] = useState<'form' | 'location-picker' | 'success'>('form');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [location, setLocation] = useState<{lat: number; lng: number} | null>(null);
  const [locationText, setLocationText] = useState('Fetching your location...');
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState('hazard');
  const [, setImageFile] = useState<File | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (useCurrentLocation) {
        fetchUserLocation();
      }
    } else {
      document.body.style.overflow = 'auto';
      // Reset the form when closed
      setStep('form');
      setDescription('');
      setIssueType('hazard');
      setImageFile(null);
      setUseCurrentLocation(true);
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, useCurrentLocation]);
  
  const fetchUserLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
      
      // Get address from coordinates
      const address = await getAddressFromCoordinates(latitude, longitude);
      setLocationText(address);
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationText("Unable to get your location");
    } finally {
      setIsLoadingLocation(false);
    }
  };
 
  const handleClose = () => {
      onClose();
  };
  
  // Don't render anything if not open
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
        onClick={handleClose}
      />
      
      {/* Modal container */}
      <div className={cn(
        "relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] shadow-modal animate-slide-up",
        "overflow-hidden flex flex-col",
        className
      )}>
        {/* Modal header */}
        <div className="px-6 pt-6 pb-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangleIcon className="h-5 w-5 text-safety" />
            <h2 className="text-lg font-semibold tracking-tight">
              {step === 'location-picker' ? 'Select Location' : 'Report Safety Issue'}
            </h2>
          </div>
          
          <button 
            onClick={handleClose}
            className="rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        {/* Modal content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'form' ? (
            <form onSubmit={()=>{}} className="space-y-6">
              {/* Location display */}
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {useCurrentLocation ? 'Current Location' : 'Custom Location'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isLoadingLocation ? (
                          <span className="flex items-center space-x-2">
                            <span className="inline-block h-2 w-2 bg-primary/60 rounded-full animate-pulse"></span>
                            <span>Locating...</span>
                          </span>
                        ) : locationText}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={()=>{}}
                  >
                     <>
                        <LocateIcon className="h-4 w-4 mr-1" />
                        Use Current
                      </>
                  </Button>
                </div>
                
              </div>
              
              {/* Issue type selection */}
              <div className="space-y-2">
                <label htmlFor="issueType" className="block text-sm font-medium">
                  Issue Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hazard', label: 'Hazard' },
                    { id: 'lighting', label: 'Poor Lighting' },
                    { id: 'road', label: 'Road Issue' },
                    { id: 'traffic', label: 'Traffic' },
                    { id: 'other', label: 'Other' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setIssueType(type.id)}
                      className={cn(
                        "py-2 px-3 rounded-md text-sm font-medium transition-colors",
                        "border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                        issueType === type.id
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-transparent border-border hover:bg-muted"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Description input */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue..."
                  className="w-full rounded-md border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] resize-none"
                  required
                />
              </div>
              
              {/* Image upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Add Photo (Optional)
                </label>
                <ImageUpload
                  onImageSelected={(file) => setImageFile(file)}
                  onImageRemoved={() => setImageFile(null)}
                />
              </div>
            </form>
          ) : (
            <IssueSuccess onClose={handleClose} />
          )}
        </div>
        
        {/* Modal footer (only show for form step) */}
        {step === 'form' && (
          <div className="px-6 py-4 border-t">
            <button
              type="button"
              disabled={!description.trim() || !location}
              className={cn(
                "w-full px-4 py-2 rounded-md font-medium transition-colors press-effect",
                "bg-safety text-safety-foreground hover:bg-safety-hover",
                "focus:outline-none focus:ring-2 focus:ring-safety focus:ring-offset-1",
                "disabled:opacity-50 disabled:pointer-events-none"
              )}
            >
               Submit Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueReportModal;
