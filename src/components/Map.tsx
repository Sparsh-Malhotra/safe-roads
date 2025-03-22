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
import { useIncidents, useRoutes } from "@/services/hooks";
import Incidents from "./Incidents";
import RouteFinder from "./RouteFinder";
import RouteDisplay from "./RouteDisplay";
import NavigationBar from "./NavigationBar";

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
    const [isSearchingRoutes, setIsSearchingRoutes] = useState(false);

    const { data: incidents } = useIncidents(
        userLocation?.[0],
        userLocation?.[1]
    );

    const routesMutation = useRoutes();

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
        
        const origin = `${selectedRoute.legs[0].start_location.lat},${selectedRoute.legs[0].start_location.lng}`;
        const destination = `${selectedRoute.legs[0].end_location.lat},${selectedRoute.legs[0].end_location.lng}`;
        
        const allWaypoints = [];
        for (let i = 0; i < selectedRoute.legs[0].steps.length - 1; i++) {
            const step = selectedRoute.legs[0].steps[i];
            allWaypoints.push(`${step.end_location.lat},${step.end_location.lng}`);
        }
        
        const strategicWaypoints = [];
        
        if (allWaypoints.length > 0) {
            // One near the source (about 20% into the route)
            const sourceIndex = Math.floor(allWaypoints.length * 0.2);
            if (sourceIndex < allWaypoints.length) {
                strategicWaypoints.push(allWaypoints[sourceIndex]);
            }
            
            // One in the middle (about 50% into the route)
            const middleIndex = Math.floor(allWaypoints.length * 0.5);
            if (middleIndex < allWaypoints.length && middleIndex !== sourceIndex) {
                strategicWaypoints.push(allWaypoints[middleIndex]);
            }
            
            // One near the destination (about 80% into the route)
            const destIndex = Math.floor(allWaypoints.length * 0.8);
            if (destIndex < allWaypoints.length && destIndex !== middleIndex) {
                strategicWaypoints.push(allWaypoints[destIndex]);
            }
        }
        
        const waypointsString = strategicWaypoints.join('|');
        
        // Build Google Maps URL
        let mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
        
        if (waypointsString) {
            mapsUrl += `&waypoints=${waypointsString}`;
        }
        
        mapsUrl += '&travelmode=driving';
        
        // Open Google Maps in a new tab
        window.open(mapsUrl, '_blank');
        
        toast.success("Opening Google Maps navigation");
    };

    const handleFindRoute = async (startPoint, endPoint) => {
        if (!startPoint || !endPoint) {
            toast.error("Please select both start and end points");
            return;
        }
        
        setIsSearchingRoutes(true);
        
        try {
            const routesData = await routesMutation.mutateAsync({
                startLat: startPoint[0],
                startLng: startPoint[1],
                endLat: endPoint[0],
                endLng: endPoint[1]
            });
            
            if (routesData && routesData.length > 0) {
                setRoutes(routesData);
                setSelectedRouteIndex(0);
                setShowNavigationBar(true);
                toast.success("Routes found! Select the best route for you.");
            } else {
                //
            }
        } catch (error) {
            console.error("Error fetching routes:", error);
        } finally {
            setIsSearchingRoutes(false);
        }
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

            {isSearchingRoutes && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-40">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
                        <span className="loader mb-4"></span>
                        <span className="text-gray-700 font-medium">
                            Searching for the best routes...
                        </span>
                        <p className="text-sm text-gray-500 max-w-xs text-center mt-2">
                            We're finding the safest and most efficient routes
                            for your journey
                        </p>
                    </div>
                </div>
            )}

            <RouteFinder onPointsSelected={handleFindRoute} className="" />

            {userLocation && (
                <MapContainer
                    // @ts-expect-error todo
                    zoomControl={false}
                    attributionControl={false}
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