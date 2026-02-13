import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BrainCircuit, 
  CheckSquare, 
  Sparkles,
  Search
} from "lucide-react";

const teacherNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/teacher-suite" },
  { name: "My Students", icon: Users, href: "/teacher-suite/students" },
  { name: "Group Chat", icon: MessageSquare, href: "/teacher-suite/chat" },
  { name: "AI Note Gen", icon: Sparkles, href: "/teacher-suite/notes" },
  { name: "Exam Creator", icon: CheckSquare, href: "/teacher-suite/exams" },
  { name: "Research", icon: BrainCircuit, href: "/teacher-suite/research" },
];

const mockTeacherFriends = [
  { name: "Principal Okoro", status: "Principal", avatar: "https://i.pravatar.cc/150?u=okoro" },
  { name: "Mrs. Adebayo", status: "Science Lead", avatar: "https://i.pravatar.cc/150?u=adebayo" },
  { name: "Mr. Ibrahim", status: "Math Dept", avatar: "https://i.pravatar.cc/150?u=ibrahim" },
];

const TeacherResearch = () => {
  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Research Assistant</h2>
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search academic resources, papers, and teaching materials..." className="pl-10 py-6 text-lg" />
        </div>
        
        <div className="text-center text-muted-foreground py-12">
          <BrainCircuit className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>Enter a topic to start researching</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherResearch;
