import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet.awesome-markers";

const Incidents = ({ reports, visible }) => {
    if (!visible || !reports.length) return null;

    const createIssueIcon = () => {
        return L.AwesomeMarkers.icon({
            icon: "exclamation-triangle",
            prefix: "fa",
            markerColor: "red",
            iconColor: "white",
        });
    };

    return (
        <>
            {reports.map((report) => (
                <Marker
                    key={report.id}
                    position={[report.location_lat, report.location_lng]}
                    // @ts-expect-error todo
                    icon={createIssueIcon()}
                >
                    <Popup>
                        <div className="p-1">
                            <h3 className="font-medium text-sm">
                                {report.issue_type.charAt(0).toUpperCase() +
                                    report.issue_type.slice(1)}{" "}
                                Issue
                            </h3>
                            <p className="text-xs text-gray-600">
                                {report.location_text}
                            </p>
                            <p className="text-xs mt-1">{report.description}</p>
                            {report.image_url && (
                                <img
                                    src={report.image_url}
                                    alt="Issue"
                                    className="mt-2 rounded-sm max-w-full h-auto max-h-32 object-cover"
                                />
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default Incidents;
