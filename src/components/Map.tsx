import { getCurrentLocation } from "@/utils/location";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { toast } from "sonner";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useIncidents } from "@/services/hooks";
import Incidents from "./Incidents";
import RouteFinder from "./RouteFinder";
import RouteDisplay from "./RouteDisplay";
import NavigationBar from "./NavigationBar";
import { ROUTES } from "@/mock-data";


delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

let globalMapRef: L.Map | null = null;

const Map = ({ className, showIssues = false }) => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);
    const [showNavigationBar, setShowNavigationBar] = useState(false);

    const { data: incidents } = useIncidents(
        userLocation?.[0],
        userLocation?.[1]
    );

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

    const handleRouteSelection = (route, index) => {
        setSelectedRouteIndex(index);
        setShowNavigationBar(true);
    };

    const handleStartNavigation = () => {
        if (selectedRouteIndex === null || !routes[selectedRouteIndex]) {
            toast.error("No route selected");
            return;
        }
        
        const selectedRoute = routes[selectedRouteIndex];
        
        if (selectedRoute.steps && selectedRoute.steps.length > 0) {
            const firstStep = selectedRoute.steps[0];
            const lastStep = selectedRoute.steps[selectedRoute.steps.length - 1];
            
            const origin = `${firstStep.startLocation.lat},${firstStep.startLocation.lng}`;
            const destination = `${lastStep.endLocation.lat},${lastStep.endLocation.lng}`;
            
            const allWaypoints = [];

            for (let i = 0; i < selectedRoute.steps.length - 1; i++) {
                const step = selectedRoute.steps[i];
                allWaypoints.push(`${step.endLocation.lat},${step.endLocation.lng}`);
            }
            
            let waypoints = allWaypoints;
            if (allWaypoints.length > 10) {
                const waypointCount = 10;
                waypoints = [];
                
                for (let i = 0; i < waypointCount; i++) {
                    const index = Math.floor((i * allWaypoints.length) / waypointCount);
                    waypoints.push(allWaypoints[index]);
                }
            }
            
            const waypointsString = waypoints.join('|');
            
            let mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
            
            if (waypointsString) {
                mapsUrl += `&waypoints=${waypointsString}`;
            }
            
            mapsUrl += '&travelmode=driving';
            
            window.open(mapsUrl, '_blank');
            
            toast.success("Opening Google Maps navigation");
        } else {
            toast.error("Could not create navigation route");
        }
    };

    const handleFindRoute = (startPoint, endPoint) => {        
        setRoutes(ROUTES);
        setSelectedRouteIndex(0);
        setShowNavigationBar(true);
        
        
        toast.success("Routes found! Select the best route for you.");
    };

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
            
            <RouteFinder onPointsSelected={handleFindRoute} className="" />
            
            {userLocation && (
                <MapContainer
                    // @ts-expect-error todo
                    center={userLocation}
                    zoom={15}
                    className="h-full w-full z-10"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <SetViewOnLocation coords={userLocation} />
                    <Marker position={userLocation} />

                    {routes.length > 0 && (
                        <RouteDisplay 
                            routes={routes} 
                            onRouteSelect={handleRouteSelection}
                            selectedRouteIndex={selectedRouteIndex}
                        />
                    )}

                    {incidents && incidents.data && (
                        <Incidents
                            reports={incidents.data}
                            visible={showIssues}
                        />
                    )}
                </MapContainer>
            )}
            
            {showNavigationBar && selectedRouteIndex !== null && (
                <NavigationBar 
                    route={routes[selectedRouteIndex]} 
                    onStartNavigation={handleStartNavigation}
                />
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