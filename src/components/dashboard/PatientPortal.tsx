import { Routes, Route, Navigate } from "react-router-dom";
import DashboardTabs from "@/components/navigation/DashboardTabs";
import WellnessResources from "@/pages/patient/WellnessResources";
import PrivacySecurity from "@/pages/patient/PrivacySecurity";
import PatientSettings from "@/pages/patient/PatientSettings";

const PatientPortal = () => {
  const tabs = [
    { name: "Wellness Resources", path: "/dashboard/patient/wellness" },
    { name: "Privacy & Security", path: "/dashboard/patient/privacy-security" },
    { name: "Settings", path: "/dashboard/patient/settings" },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          Patient Portal
        </h2>
        <p className="text-muted-foreground">
          Your personal health dashboard
        </p>
      </div>

      <DashboardTabs tabs={tabs} />

      <Routes>
        <Route index element={<Navigate to="/dashboard/patient/wellness" replace />} />
        <Route path="wellness" element={<WellnessResources />} />
        <Route path="privacy-security" element={<PrivacySecurity />} />
        <Route path="settings" element={<PatientSettings />} />
      </Routes>
    </div>
  );
};

export default PatientPortal;
