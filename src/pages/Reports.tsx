import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ISSUE_TYPES } from "@/utils/issues";

const statusColorMap = {
  pending: { color: "#DBA818", bg: "#FFF8EB" },  
  resolved: { color: "#4DBB3E", bg: "#E3F4DC" },
  rejected: { color: "#B4272E", bg: "#FCEAE8" },
  approved: { color: "#0059A3", bg: "#E5F3FF" },
};

const getFormattedDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
}

export default function UserIncidentsPage() {
  const [userIncidents, setUserIncidents] = useState([]);
  
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">My Reported Incidents</h1>
      <div className="w-full">
        {userIncidents.map((incident) => (
          <Card key={incident.id} className="rounded-lg mb-4 shadow-lg gap-3">
            <CardHeader>
              <CardTitle className="text-xl">{ISSUE_TYPES[incident?.issue_type]?.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <img
                src={incident.image_url}
                alt="Issue"
                className="rounded-sm max-w-full h-auto max-h-32 object-cover"
              />
              {incident?.status && (
                <Badge variant="secondary" className="mr-2" style={{ color: statusColorMap[incident?.status].color, backgroundColor: statusColorMap[incident?.status].bg }}>
                  {incident.status}
                </Badge>
              )}
              <div className="flex justify-between text-sm text-gray-500">
                <span>{incident.city}, {incident.state}</span>
                <span>{getFormattedDate(incident.created_at)}</span>
              </div>
              <p className="text-gray-800" style={{ color: "#0F0F10" }}>{incident.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
