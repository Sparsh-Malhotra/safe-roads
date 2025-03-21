import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { MapPinIcon, NavigationIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const RouteFinder = ({ onPointsSelected, className }) => {
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [endPoint, setEndPoint] = useState<[number, number] | null>(null);
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleStartPlaceSelected = (place) => {
    if (place.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setStartPoint([lat, lng]);
      setStartAddress(place.formatted_address || '');
    }
  };

  const handleEndPlaceSelected = (place) => {
    if (place.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setEndPoint([lat, lng]);
      setEndAddress(place.formatted_address || '');
    }
  };

  const handleFindRoute = () => {
    if (startPoint && endPoint) {
      onPointsSelected(startPoint, endPoint);
      toast.info('Finding the safest route for you...');
    } else {
      toast.error('Please select both start and end locations');
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={cn(
        "fixed top-20 right-4 z-30 bg-white rounded-lg shadow-lg transition-all duration-300 overflow-hidden glass-morphism",
        expanded ? "w-80" : "w-12",
        className
      )}
    >
      {expanded ? (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-primary">Find Safe Route</h3>
            <button 
              onClick={toggleExpanded}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Collapse route finder"
            >
              <NavigationIcon className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Start Location</label>
              <div className="relative">
                <MapPinIcon className="absolute left-2 top-2.5 h-4 w-4 text-safety" />
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
                  onPlaceSelected={handleStartPlaceSelected}
                  defaultValue={startAddress}
                  style={{
                    width: '100%',
                    padding: '8px 8px 8px 30px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    fontSize: '14px'
                  }}
                  options={{
                    types: ['geocode'],
                    fields: ['formatted_address', 'geometry']
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Destination</label>
              <div className="relative">
                <MapPinIcon className="absolute left-2 top-2.5 h-4 w-4 text-red-500" />
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
                  onPlaceSelected={handleEndPlaceSelected}
                  defaultValue={endAddress}
                  style={{
                    width: '100%',
                    padding: '8px 8px 8px 30px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    fontSize: '14px'
                  }}
                  options={{
                    types: ['geocode'],
                    fields: ['formatted_address', 'geometry']
                  }}
                />
              </div>
            </div>
            
            <button
              onClick={handleFindRoute}
              disabled={!startPoint || !endPoint}
              className={cn(
                "w-full py-2 rounded-md text-white bg-safety hover:bg-safety/90 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2"
              )}
            >
              <NavigationIcon className="h-4 w-4" />
              Find Safe Route
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleExpanded}
          className="h-12 w-12 flex items-center justify-center"
          aria-label="Expand route finder"
        >
          <NavigationIcon className="h-5 w-5 text-safety" />
        </button>
      )}
    </div>
  );
};

export default RouteFinder;