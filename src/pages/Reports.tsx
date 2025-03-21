import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ISSUE_TYPES } from "@/utils/issues";
import { useIncidentsByUser } from "@/services/hooks";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

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
  const { data: userIncidents } = useIncidentsByUser();

  const navigate = useNavigate();
  
  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft style={{ height: "20px", width: "20px" }} />
        </Button>
        <h1 className="text-3xl font-bold text-center mb-6">My Reported Incidents</h1>
      </div>
      <div className="w-full">
        {userIncidents?.data?.map((incident: any) => (
          <Card key={incident.id} className="rounded-lg mb-4 shadow-lg gap-3">
            <CardHeader>
              <CardTitle className="text-xl">
                {ISSUE_TYPES[incident?.issue_type]?.label || incident?.issue_type}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <img
                src={incident.image_url}
                alt="Issue"
                height={150}
                width={250}
                className="rounded-sm object-cover"
              />
              {incident?.status && (
                <Badge variant="secondary" className="mr-2" style={{ color: statusColorMap[incident?.status].color, backgroundColor: statusColorMap[incident?.status].bg }}>
                  {incident.status.toUpperCase()}
                </Badge>
              )}
              <div className="flex justify-between text-sm text-gray-500">
                <span>{incident?.city && `${incident.city},`} {incident?.state && incident.state}</span>
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
