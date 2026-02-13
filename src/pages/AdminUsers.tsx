import { DashboardLayout } from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/components/admin/Dashboard";
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Database, 
  MessageSquare, 
  Calendar,
  Settings
} from "lucide-react";

const adminNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Payments", icon: DollarSign, href: "/admin/payments" },
  { name: "Questions", icon: MessageSquare, href: "/admin/questions" },
  { name: "Calendars", icon: Calendar, href: "/admin/calendars" },
  { name: "Database", icon: Database, href: "/admin/database" },
];

const AdminUsers = () => {
  return (
    <DashboardLayout 
      navItems={adminNavItems} 
      userType="Admin"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Users Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage students, teachers, and admins here.</p>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
