import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Gamepad2, 
  MessageSquare,
  Sparkles,
  ChevronRight,
  Clock,
  Trophy,
  Target
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

const subjects = [
  { 
    id: "mathematics",
    name: "Mathematics", 
    progress: 65, 
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop&q=60",
    topics: 5,
    lessons: 46,
    studyTime: "12h 30m"
  },
  { 
    id: "english",
    name: "English", 
    progress: 45, 
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=60",
    topics: 5,
    lessons: 55,
    studyTime: "8h 15m"
  },
  { 
    id: "physics",
    name: "Physics", 
    progress: 30, 
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&auto=format&fit=crop&q=60",
    topics: 5,
    lessons: 48,
    studyTime: "5h 45m"
  },
  { 
    id: "biology",
    name: "Biology", 
    progress: 80, 
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&auto=format&fit=crop&q=60",
    topics: 5,
    lessons: 52,
    studyTime: "15h 20m"
  },
  { 
    id: "chemistry",
    name: "Chemistry", 
    progress: 55, 
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop&q=60",
    topics: 5,
    lessons: 50,
    studyTime: "10h 10m"
  },
  { 
    id: "economics",
    name: "Economics", 
    progress: 25, 
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-500",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=60",
    topics: 5,
    lessons: 40,
    studyTime: "3h 30m"
  },
  { 
    id: "government",
    name: "Government", 
    progress: 40, 
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-500",
    image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&auto=format&fit=crop&q=60",
    topics: 5,
    lessons: 38,
    studyTime: "6h 45m"
  },
  { 
    id: "literature",
    name: "Literature", 
    progress: 35, 
    color: "from-fuchsia-500 to-pink-500",
    bgColor: "bg-fuchsia-500",
    image: "https://images.unsplash.com/photo-1474932430478-1d680c256bc5?w=400&auto=format&fit=crop&q=60",
    topics: 4,
    lessons: 32,
    studyTime: "5h 00m"
  },
];

const StudentSubjects = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout navItems={studentNavItems} userType="Student" friends={mockFriends}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">My Subjects</h2>
            <p className="text-slate-500 mt-1">Choose a subject to start learning</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl">
              <Target className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-700">8 Subjects</span>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Lessons", value: "361", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Completed", value: "167", icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-50" },
            { label: "In Progress", value: "194", icon: Target, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Study Time", value: "67h 15m", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
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

        {/* Subjects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="rounded-2xl border-none shadow-sm overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate(`/student-suite/subject/${subject.id}`)}
            >
              {/* Image Header */}
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={subject.image} 
                  alt={subject.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${subject.color} opacity-80`}></div>
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-lg">
                  <span className="text-xs font-bold text-slate-700">{subject.progress}%</span>
                </div>
              </div>
              
              {/* Content */}
              <CardContent className="p-5">
                <h3 className="font-bold text-lg text-slate-900 mb-1">{subject.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{subject.topics} topics • {subject.lessons} lessons</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-bold text-primary">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{subject.studyTime}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className={`${subject.bgColor} text-white rounded-lg text-xs group-hover:shadow-lg`}
                    >
                      Continue <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSubjects;
