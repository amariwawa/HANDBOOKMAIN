import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIChatbot } from "@/components/AIChatbot"; // Reusing the chatbot component or creating a specific one
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Gamepad2, 
  MessageSquare,
  Sparkles
} from "lucide-react";

const studentNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/student-suite" },
  { name: "My Subjects", icon: BookOpen, href: "/student-suite/subjects" },
  { name: "Class AI", icon: Sparkles, href: "/student-suite/class" },
  { name: "Past Questions", icon: FileText, href: "/student-suite/past-questions" },
  { name: "Games", icon: Gamepad2, href: "/student-suite/games" },
  { name: "Inbox", icon: MessageSquare, href: "/student-suite/inbox" },
];

const mockFriends = [
  { name: "Bagas Mahpie", status: "Friend", avatar: "https://i.pravatar.cc/150?u=bagas" },
  { name: "Sir Dandy", status: "Old Friend", avatar: "https://i.pravatar.cc/150?u=dandy" },
  { name: "Jhon Tosan", status: "Friend", avatar: "https://i.pravatar.cc/150?u=jhon" },
];

const ClassAI = () => {
  return (
    <DashboardLayout navItems={studentNavItems} userType="Student" friends={mockFriends}>
      <div className="h-full flex flex-col font-[Times_New_Roman]">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Class AI Tutor</h2>
        <div className="flex-1 bg-card rounded-xl border p-6 flex flex-col items-center justify-center text-center">
          <Sparkles className="w-16 h-16 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your Personal AI Assistant</h3>
          <p className="text-muted-foreground max-w-md mb-8">
            Ask questions about your homework, generate study notes, or get explanations for complex topics.
          </p>
          <AIChatbot /> 
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClassAI;
