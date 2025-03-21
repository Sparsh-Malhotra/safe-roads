import { getCurrentLocation } from "@/utils/location";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useIncidents } from "@/services/hooks";
import Incidents from "./Incidents";

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

let globalMapRef: L.Map | null = null;

const Map = ({ className, showIssues = true }) => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(
        null
    );
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  const {
    data: incidents,
    isLoading,
    isError,
    error
  } = useIncidents();

    useEffect(() => {
        const loadMap = async () => {
            try {
                // Get user location
                const position = await getCurrentLocation();
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            } catch (error) {
                console.error("Failed to get location:", error);
                setUserLocation([37.7749, -122.4194]); // San Francisco
            } finally {
                setIsMapLoaded(true);
            }
        };

        loadMap();
    }, []);

    return (
        <div className={`relative ${className}`}>
            {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-20">
                    <div className="flex flex-col items-center space-y-4">
                        <span className="loader"></span>
                        <span className="text-sm text-muted-foreground animate-pulse-light">
                            Loading map...
                        </span>
                    </div>
                </div>
            )}
            {userLocation && (
                <MapContainer
                    center={userLocation}
                    zoom={15}
                    className="h-full w-full z-10"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <SetViewOnLocation coords={userLocation} />
                    <Marker position={userLocation} />

                    {incidents && incidents.data &&  (
                        <Incidents
                            reports={incidents.data}
                            visible={showIssues}
                        />
                    )}
                </MapContainer>
            )}
        </div>
    );
};

const SetViewOnLocation = ({ coords }: { coords: [number, number] | null }) => {
    const map = useMap();

    // Set the global map reference
    useEffect(() => {
        globalMapRef = map;

        if (coords) {
            map.setView(coords, 15);
        }

        return () => {
            // Clear the global map reference when unmounting
            if (globalMapRef === map) {
                globalMapRef = null;
            }
        };
    }, [coords, map]);

    return null;
};

export default Map;
