import IncidentToggle from "@/components/IncidentToggle";
import Map from "@/components/Map";
import { useState } from "react";

const Home = () => {
  const [showIssues, setShowIssues] = useState(false);

  const toggleIssuesVisibility = () => {
    setShowIssues(prev => !prev);
  };
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Map className="h-full w-full" showIssues={showIssues} />
      <IncidentToggle
        showIssues={showIssues}
        onToggle={toggleIssuesVisibility}
        className="absolute top-20 left-4 z-20"
      />
    </div>
  );
};

export default Home;