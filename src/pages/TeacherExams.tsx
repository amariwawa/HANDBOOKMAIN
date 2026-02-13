import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BrainCircuit, 
  CheckSquare, 
  Sparkles,
  Plus
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

const TeacherExams = () => {
  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Exam Creator</h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Exam
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["Mid-Term Mathematics", "Physics Mock", "Biology CA"].map((exam) => (
            <div key={exam} className="bg-card p-6 rounded-xl border hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">{exam}</h3>
              <p className="text-sm text-muted-foreground mb-4">Last edited: 2 days ago</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button size="sm" className="flex-1">Publish</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherExams;
