import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const StudentSubjects = () => {
  return (
    <DashboardLayout navItems={studentNavItems} userType="Student" friends={mockFriends}>
      <div className="space-y-6 font-[Times_New_Roman]">
        <h2 className="text-3xl font-bold tracking-tight">My Subjects</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Mathematics", "English", "Physics", "Chemistry", "Biology", "Economics"].map((subject) => (
            <Card key={subject} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{subject}</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">In Progress</div>
                <p className="text-xs text-muted-foreground">
                  +20% progress from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSubjects;
