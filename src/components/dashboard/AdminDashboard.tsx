import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import DashboardTabs from "@/components/navigation/DashboardTabs";
import Users from "@/pages/admin/Users";
import Appointments from "@/pages/admin/Appointments";
import Records from "@/pages/admin/Records";
import Reports from "@/pages/admin/Reports";
import SecurityLogs from "@/pages/admin/SecurityLogs";
import Settings from "@/pages/admin/Settings";

const AdminDashboard = () => {
  const tabs = [
    { name: "Users", path: "/dashboard/admin/users" },
    { name: "Appointments", path: "/dashboard/admin/appointments" },
    { name: "Records", path: "/dashboard/admin/records" },
    { name: "Reports", path: "/dashboard/admin/reports" },
    { name: "Security Logs", path: "/dashboard/admin/security-logs" },
    { name: "Settings", path: "/dashboard/admin/settings" },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h2>
        <p className="text-muted-foreground">
          Manage users, appointments, and system security
        </p>
      </div>

      <DashboardTabs tabs={tabs} />

      <Routes>
        <Route index element={<Navigate to="/dashboard/admin/users" replace />} />
        <Route path="users" element={<Users />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="records" element={<Records />} />
        <Route path="reports" element={<Reports />} />
        <Route path="security-logs" element={<SecurityLogs />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
