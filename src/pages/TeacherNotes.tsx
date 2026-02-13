import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BrainCircuit, 
  CheckSquare, 
  Sparkles,
  Wand2
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

const TeacherNotes = () => {
  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">AI Note Generator</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="bg-card p-6 rounded-xl border">
              <h3 className="font-semibold mb-4">Input Topic</h3>
              <Textarea 
                placeholder="Enter topic or paste curriculum content..." 
                className="min-h-[200px] mb-4"
              />
              <Button className="w-full">
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Notes
              </Button>
            </div>
          </div>
          <div className="bg-muted/30 rounded-xl border p-6 flex items-center justify-center text-muted-foreground">
            Generated content will appear here...
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherNotes;
