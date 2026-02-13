import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BrainCircuit, 
  CheckSquare, 
  Sparkles
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

const TeacherChat = () => {
  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="h-[calc(100vh-100px)] flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Group Chat</h2>
        <div className="flex-1 bg-card rounded-xl border flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select a group to start chatting</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherChat;
