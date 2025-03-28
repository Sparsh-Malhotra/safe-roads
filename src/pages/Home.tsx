import IncidentToggle from "@/components/IncidentToggle";
import Map from "@/components/Map";
import Header from "@/components/Header";
import ReportButton from "@/components/ReportButton";
import { useEffect, useState } from "react";
import IssueReportModal from "@/components/IssueReportModal";
import { fetchCoins } from "@/services";

const Home = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showIssues, setShowIssues] = useState(false);

  const toggleIssuesVisibility = () => {
    setShowIssues(prev => !prev);
  };

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Map className="h-full w-full" showIssues={showIssues} />
      <Header />
      <IssueReportModal
        isOpen={isReportModalOpen}
        onClose={handleCloseReportModal}
      />
      <ReportButton onClick={handleReportClick} />
      <IncidentToggle
        showIssues={showIssues}
        onToggle={toggleIssuesVisibility}
        className="absolute top-20 left-4 z-20"
      />
    </div>
  );
};

export default Home;