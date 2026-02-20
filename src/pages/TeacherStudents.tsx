import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BrainCircuit, 
  CheckSquare, 
  Sparkles,
  Search,
  Plus,
  UserPlus,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Mail,
  Phone,
  BookOpen,
  Trophy,
  Clock,
  X,
  Check,
  Filter,
  Download
} from "lucide-react";
import { toast } from "sonner";

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

const students = [
  { id: 1, name: "Chiamaka Okonkwo", class: "SS3 Science", avatar: "https://i.pravatar.cc/150?u=chiamaka", attendance: 95, grade: "A", avgScore: 85, trend: "up", subjects: 6, lastActive: "2 hours ago" },
  { id: 2, name: "Emeka Adeyemi", class: "SS3 Science", avatar: "https://i.pravatar.cc/150?u=emeka", attendance: 88, grade: "B+", avgScore: 78, trend: "up", subjects: 6, lastActive: "1 hour ago" },
  { id: 3, name: "Fatima Bello", class: "SS3 Science", avatar: "https://i.pravatar.cc/150?u=fatima", attendance: 92, grade: "A-", avgScore: 82, trend: "up", subjects: 6, lastActive: "30 mins ago" },
  { id: 4, name: "David Kalu", class: "SS2 Science", avatar: "https://i.pravatar.cc/150?u=david", attendance: 75, grade: "C+", avgScore: 65, trend: "down", subjects: 5, lastActive: "3 hours ago" },
  { id: 5, name: "Amina Ibrahim", class: "SS3 Science", avatar: "https://i.pravatar.cc/150?u=amina", attendance: 98, grade: "A", avgScore: 90, trend: "up", subjects: 6, lastActive: "Online" },
  { id: 6, name: "Oluwaseun Ojo", class: "SS2 Science", avatar: "https://i.pravatar.cc/150?u=seun", attendance: 82, grade: "B", avgScore: 72, trend: "down", subjects: 5, lastActive: "5 hours ago" },
];

const pendingRequests = [
  { id: 1, name: "Blessing Nwachukwu", class: "SS3 Arts", avatar: "https://i.pravatar.cc/150?u=blessing" },
  { id: 2, name: "Yusuf Mohammed", class: "SS2 Science", avatar: "https://i.pravatar.cc/150?u=yusuf" },
];

const TeacherStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState<typeof students[0] | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteStudent = () => {
    if (!inviteEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setShowAddModal(false);
  };

  const handleAcceptRequest = (id: number) => {
    toast.success("Student added to your class");
  };

  const handleRejectRequest = (id: number) => {
    toast.info("Request declined");
  };

  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">My Students</h2>
            <p className="text-slate-500">Manage and monitor your students' progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button className="rounded-xl" onClick={() => setShowAddModal(true)}>
              <UserPlus className="w-4 h-4 mr-2" /> Add Student
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: "48", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Active Today", value: "32", icon: Clock, color: "text-emerald-500", bg: "bg-emerald-50" },
            { label: "Avg. Attendance", value: "89%", icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50" },
            { label: "Top Performers", value: "12", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
          ].map((stat, i) => (
            <Card key={i} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <Card className="rounded-2xl border-none shadow-sm border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-amber-500" />
                Pending Join Requests ({pendingRequests.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={req.avatar} />
                      <AvatarFallback>{req.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{req.name}</p>
                      <p className="text-xs text-slate-500">{req.class}</p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-500 hover:bg-emerald-50" onClick={() => handleAcceptRequest(req.id)}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-500 hover:bg-rose-50" onClick={() => handleRejectRequest(req.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search students by name or class..." 
              className="pl-10 rounded-xl bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        {/* Students Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <Card 
              key={student.id} 
              className="rounded-2xl border-none shadow-sm hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setShowStudentModal(student)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${student.lastActive === "Online" ? "bg-emerald-500" : "bg-slate-300"}`}></span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{student.name}</h3>
                      <p className="text-xs text-slate-500">{student.class}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-slate-50 rounded-xl">
                    <p className="text-lg font-bold text-slate-900">{student.attendance}%</p>
                    <p className="text-[10px] text-slate-500">Attendance</p>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded-xl">
                    <p className="text-lg font-bold text-slate-900">{student.grade}</p>
                    <p className="text-[10px] text-slate-500">Grade</p>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded-xl">
                    <p className="text-lg font-bold text-slate-900">{student.avgScore}</p>
                    <p className="text-[10px] text-slate-500">Avg Score</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-1 text-sm">
                    {student.trend === "up" ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-600 font-medium">Improving</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-rose-500" />
                        <span className="text-rose-600 font-medium">Needs attention</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{student.lastActive}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Add Student</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowAddModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Invite via Email</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="student@email.com" 
                      className="rounded-xl"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <Button onClick={handleInviteStudent} className="rounded-xl">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Or share invite code</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-2xl font-mono font-bold tracking-wider text-primary">PHY-SS3-2024</p>
                  <p className="text-xs text-slate-500 mt-1">Share this code with students to join your class</p>
                </div>
                <Button variant="outline" className="w-full rounded-xl">
                  <Plus className="w-4 h-4 mr-2" /> Generate New Code
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Student Detail Modal */}
        {showStudentModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={showStudentModal.avatar} />
                    <AvatarFallback>{showStudentModal.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{showStudentModal.name}</CardTitle>
                    <p className="text-sm text-slate-500">{showStudentModal.class}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowStudentModal(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Attendance Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{showStudentModal.attendance}%</p>
                    <Progress value={showStudentModal.attendance} className="h-1.5 mt-2" />
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Average Score</p>
                    <p className="text-2xl font-bold text-slate-900">{showStudentModal.avgScore}%</p>
                    <Progress value={showStudentModal.avgScore} className="h-1.5 mt-2" />
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-2">Subject Performance</p>
                  <div className="space-y-2">
                    {["Physics", "Chemistry", "Mathematics", "Biology"].map((subj, i) => (
                      <div key={subj} className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">{subj}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={85 - i * 8} className="w-24 h-1.5" />
                          <span className="text-xs font-medium text-slate-600">{85 - i * 8}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 rounded-xl">
                    <MessageSquare className="w-4 h-4 mr-2" /> Message
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl">
                    <Phone className="w-4 h-4 mr-2" /> Call Parent
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudents;
