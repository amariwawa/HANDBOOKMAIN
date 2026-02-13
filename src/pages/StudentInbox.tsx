import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Gamepad2, 
  MessageSquare,
  Sparkles,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const StudentInbox = () => {
  return (
    <DashboardLayout navItems={studentNavItems} userType="Student" friends={mockFriends}>
      <div className="h-[calc(100vh-100px)] flex flex-col font-[Times_New_Roman]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Inbox</h2>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8" />
          </div>
        </div>
        
        <div className="flex-1 bg-card rounded-xl border overflow-hidden flex">
          {/* Message List */}
          <div className="w-1/3 border-r bg-muted/30">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border-b hover:bg-muted cursor-pointer transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Teacher Name</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Please review the assignment details for next week's project...
                </p>
              </div>
            ))}
          </div>
          
          {/* Message Content */}
          <div className="flex-1 p-6 flex items-center justify-center text-muted-foreground">
            Select a message to read
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentInbox;
