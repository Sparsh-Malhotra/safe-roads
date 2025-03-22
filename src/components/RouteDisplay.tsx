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
  safetyScore?: number;
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
      
      map.fitBounds(bounds, { padding: [50, 50] });
    }
    
    // Increase the click tolerance for the entire map
    if (map) {
      map.options.clickTolerance = 15; // Default is 3
    }
  }, [routes, map]);
  
  if (!routes || routes.length === 0) return null;
  
  return (
    <>
      {routes.map((route, index) => {
        const positions = decodePolyline(route.polyline);
        
        const isSelected = index === selectedRouteIndex;
        
        // Calculate safety level and color
        const safetyScore = route.safetyScore || 0;
        let safetyColor = '#6B7280'; // default gray
        
        if (safetyScore >= 80) {
          safetyColor = '#10B981'; // green
        } else if (safetyScore >= 60) {
          safetyColor = '#34D399'; // light green
        } else if (safetyScore >= 40) {
          safetyColor = '#FBBF24'; // yellow
        } else if (safetyScore >= 20) {
          safetyColor = '#F59E0B'; // amber
        } else {
          safetyColor = '#EF4444'; // red
        }
        
        return (
          <React.Fragment key={`route-${index}`}>
            {/* Invisible wider buffer for easier clicking */}
            <Polyline
              positions={positions}
              pathOptions={{
                color: 'transparent',
                weight: 20, // Much wider than the visible line
                opacity: 0,
                interactive: true
              }}
              eventHandlers={{
                click: () => onRouteSelect(route, index),
                mouseover: (e) => {
                  // Add cursor styling on hover
                  if (!isSelected) {
                    const el = e.target.getElement();
                    if (el) el.style.cursor = 'pointer';
                  }
                }
              }}
            >
            </Polyline>
            
            {/* Visible route line */}
            <Polyline
              positions={positions}
              pathOptions={{
                color: isSelected ? '#0059A3' : safetyColor,
                weight: isSelected ? 5 : 4,
                opacity: isSelected ? 1 : 0.75,
                dashArray: isSelected ? "" : "5, 10",
                lineCap: 'round',
                lineJoin: 'round',
                interactive: false // The invisible buffer handles clicks
              }}
            />
            
            {/* Add markers for route labels at each end of the route */}
            
          </React.Fragment>
        );
      })}
    </>
  );
};

export default RouteDisplay;