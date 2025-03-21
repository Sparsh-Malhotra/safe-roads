import React, { useEffect } from "react";
import { Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function decodePolyline(encoded: string): [number, number][] {
  if (!encoded) return [];
  
  const poly: [number, number][] = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;
    
    shift = 0;
    result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;
    
    poly.push([lat * 1e-5, lng * 1e-5]);
  }
  
  return poly;
}

interface RouteData {
  summary: string;
  distance: string;
  duration: string;
  steps: any[];
  polyline: string;
}

interface RouteDisplayProps {
  routes: RouteData[];
  onRouteSelect: (route: RouteData, index: number) => void;
  selectedRouteIndex: number | null;
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({ 
  routes, 
  onRouteSelect, 
  selectedRouteIndex 
}) => {
  const map = useMap();
  
  useEffect(() => {
    if (routes?.length > 0) {
      // Fit map bounds to all routes
      const bounds = new L.LatLngBounds([]);
      routes.forEach(route => {
        const positions = decodePolyline(route.polyline);
        positions.forEach(pos => bounds.extend(L.latLng(pos[0], pos[1])));
      });
      
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [routes, map]);
  
  if (!routes || routes.length === 0) return null;
  
  return (
    <>
      {routes.map((route, index) => {
        const positions = decodePolyline(route.polyline);
        
        const isSelected = index === selectedRouteIndex;
        
        return (
          <Polyline
            key={`route-${index}`}
            positions={positions}
            pathOptions={{
              color: isSelected ? '#0059A3' : '#6B7280', 
              weight: isSelected ? 5 : 4,
              opacity: isSelected ? 1 : 0.7,
              dashArray: isSelected ? "" : "5, 10",
              lineCap: 'round',
              lineJoin: 'round'
            }}
            eventHandlers={{
              click: () => onRouteSelect(route, index)
            }}
          />
        );
      })}
    </>
  );
};

export default RouteDisplay;