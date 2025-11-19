import { Routes, Route, Navigate } from "react-router-dom";
import DashboardTabs from "@/components/navigation/DashboardTabs";
import WellnessResources from "@/pages/patient/WellnessResources";
import PrivacySecurity from "@/pages/patient/PrivacySecurity";
import PatientSettings from "@/pages/patient/PatientSettings";
import Appointments from "@/pages/patient/Appointments";
import Records from "@/pages/patient/Records";
import Messages from "@/pages/patient/Messages";
import PeriodTracker from "@/pages/patient/PeriodTracker";

const PatientPortal = () => {
  const tabs = [
    { name: "Appointments", path: "/dashboard/patient/appointments" },
    { name: "My Records", path: "/dashboard/patient/records" },
    { name: "Messages", path: "/dashboard/patient/messages" },
    { name: "Wellness", path: "/dashboard/patient/wellness" },
    { name: "Period Tracker", path: "/dashboard/patient/period-tracker" },
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
        <Route index element={<Navigate to="/dashboard/patient/appointments" replace />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="records" element={<Records />} />
        <Route path="messages" element={<Messages />} />
        <Route path="wellness" element={<WellnessResources />} />
        <Route path="period-tracker" element={<PeriodTracker />} />
        <Route path="privacy-security" element={<PrivacySecurity />} />
        <Route path="settings" element={<PatientSettings />} />
      </Routes>
    </div>
  );
};

export default PatientPortal;
