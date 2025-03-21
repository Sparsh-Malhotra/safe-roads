
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import { CrosshairIcon } from 'lucide-react';
import { Button } from './ui/button';
import 'leaflet/dist/leaflet.css';

// Fix the default icon issue with Leaflet in React
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Set default icon paths for Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface LocationPickerProps {
  initialLocation?: { lat: number; lng: number };
  onLocationSelected: (location: { lat: number; lng: number }) => void;
  onCancel: () => void;
}

// Component to handle map click events
function MapClickHandler({ onMapClick }: { onMapClick: (position: LatLng) => void }) {
  const map = useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  
  return null;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ 
  initialLocation, 
  onLocationSelected, 
  onCancel 
}) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    initialLocation || null
  );
  
  const handleMapClick = (latlng: LatLng) => {
    setSelectedLocation({ lat: latlng.lat, lng: latlng.lng });
  };
  
  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelected(selectedLocation);
    }
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 relative">
        {/* Map container */}
        <MapContainer
          center={initialLocation || [37.7749, -122.4194]} // Default to SF if no initial location
          zoom={15}
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {/* Marker for selected location */}
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
          )}
          
          {/* Handler for map clicks */}
          <MapClickHandler onMapClick={handleMapClick} />
        </MapContainer>
        
        {/* Centered crosshair */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-[400]">
          <CrosshairIcon className="h-8 w-8 text-primary opacity-50" />
        </div>
        
        {/* Instructions overlay */}
        <div className="absolute top-4 left-0 right-0 z-[400] flex justify-center">
          <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full shadow text-sm">
            Click on the map to select a location
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <Button 
          variant="outline"
          className="flex-1" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1"
          onClick={handleConfirm}
          disabled={!selectedLocation}
        >
          Confirm Location
        </Button>
      </div>
    </div>
  );
};

export default LocationPicker;
