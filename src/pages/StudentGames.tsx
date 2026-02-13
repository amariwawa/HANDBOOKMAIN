import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Gamepad2, 
  MessageSquare,
  Sparkles,
  Trophy
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

const StudentGames = () => {
  return (
    <DashboardLayout navItems={studentNavItems} userType="Student" friends={mockFriends}>
      <div className="space-y-6 font-[Times_New_Roman]">
        <h2 className="text-3xl font-bold tracking-tight">Educational Games</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["Math Blast", "Word Wizard", "Science Lab", "History Quest"].map((game, i) => (
            <Card key={game} className="overflow-hidden group cursor-pointer">
              <div className="h-40 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Gamepad2 className="w-12 h-12 text-primary" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{game}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Challenge yourself and earn points while learning!
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  <Trophy className="w-4 h-4 mr-2" />
                  Top Score: {1000 * (i + 1)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentGames;
