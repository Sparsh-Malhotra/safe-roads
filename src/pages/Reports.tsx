import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ISSUE_TYPES } from "@/utils/issues";
import { useIncidentsByUser } from "@/services/hooks";
import { Button } from "@/components/ui/button";
import {
  MapPin, 
  CalendarClock, 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router";
import Header from "@/components/Header";

// Status icons and colors mapping
const statusConfig = {
  pending: { 
    color: "#DBA818", 
    bg: "#FFF8EB",
    icon: Clock,
    label: "Pending Review"
  },  
  resolved: { 
    color: "#4DBB3E", 
    bg: "#E3F4DC",
    icon: CheckCircle,
    label: "Resolved"
  },
  rejected: { 
    color: "#B4272E", 
    bg: "#FCEAE8",
    icon: XCircle,
    label: "Rejected"
  },
  approved: { 
    color: "#0059A3", 
    bg: "#E5F3FF",
    icon: AlertCircle,
    label: "Approved"
  },
};

const getFormattedDate = (date: string) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString(undefined, options as any);
}

const IncidentCard = ({ incident }) => {
  const StatusIcon = statusConfig[incident?.status]?.icon || AlertTriangle;
  
  return (
    <Card className="rounded-lg overflow-hidden transition-all hover:shadow-md pt-0 pb-4 gap-4">
      <div className="relative">
        {incident.image_url ? (
          <img
            src={incident.image_url}
            alt={incident?.issue_type}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <AlertTriangle className="text-muted-foreground h-10 w-10 opacity-30" />
          </div>
        )}
        
        {/* Status badge overlay */}
        {incident?.status && (
          <div 
            className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 shadow-sm"
            style={{ 
              color: statusConfig[incident?.status]?.color || "#6B7280", 
              backgroundColor: statusConfig[incident?.status]?.bg || "#F3F4F6" 
            }}
          >
            <StatusIcon className="h-3 w-3" />
            {statusConfig[incident?.status]?.label || incident.status}
          </div>
        )}
        
        {/* Issue type tag */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-1.5 text-white">
          <div className="text-sm font-medium">
            {ISSUE_TYPES[incident?.issue_type]?.label || incident?.issue_type}
          </div>
        </div>
      </div>
      
      <CardContent className="px-4">
        <p className="text-gray-800 text-sm line-clamp-3 mb-2">{incident.description}</p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{incident?.city ? `${incident?.city}, ` : ""}{incident?.state ? `${incident.state}` : ""}</span>
          </div>
          
          <div className="flex items-center gap-1 ml-auto">
            <CalendarClock className="h-3 w-3" />
            <span>{getFormattedDate(incident.created_at)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Reports() {
  const { data: userIncidents, isLoading } = useIncidentsByUser();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-10">
        {/* Page header */}
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold">My Reported Issues</h1>
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="loader mb-4"></div>
            <p className="text-muted-foreground">Loading your reports...</p>
          </div>
        )}
        
        {/* Empty state */}
        {!isLoading && (!userIncidents?.data || userIncidents.data.length === 0) && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-muted/30 p-4 rounded-full mb-4">
              <AlertTriangle className="h-10 w-10 text-muted-foreground" />
            </div>
            
            <h3 className="text-lg font-medium mb-1">No reports yet</h3>
            <p className="text-muted-foreground max-w-md">
              You haven't reported any road issues yet. When you do, they'll appear here.
            </p>
            <Button 
              className="mt-4"
              onClick={() => navigate('/home')}
            >
              Report an issue
            </Button>
          </div>
        )}
        
        {/* Reports grid */}
        {!isLoading && userIncidents?.data && userIncidents.data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userIncidents.data.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}