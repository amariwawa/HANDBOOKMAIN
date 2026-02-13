import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const TeacherStudents = () => {
  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">My Students</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=student${i}`} />
                  <AvatarFallback>S{i}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Student Name {i}</CardTitle>
                  <p className="text-xs text-muted-foreground">Class SS2</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="font-medium text-green-600">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Grade</span>
                  <span className="font-medium">A</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudents;
