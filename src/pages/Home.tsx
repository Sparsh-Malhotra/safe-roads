import Map from "@/components/Map";
import Header from "@/components/Header";
import ReportButton from "@/components/ReportButton";
import { useState } from "react";
import IssueReportModal from "@/components/IssueReportModal";

const Home = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Map className="h-full w-full" />
      <Header/>
      <IssueReportModal
        isOpen={isReportModalOpen}
        onClose={handleCloseReportModal}
      />
      <ReportButton onClick={handleReportClick} />
    </div>
  );
};

export default Home;