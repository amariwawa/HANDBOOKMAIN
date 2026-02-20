import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Zap, 
  Clock, 
  ChevronRight, 
  Star,
  TrendingUp,
  Award,
  Flame,
  Users,
  Play,
  Sparkles,
  Brain,
  GraduationCap
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const leaderboard = [
  { rank: 1, name: "Chiamaka O.", score: 2850, avatar: "https://i.pravatar.cc/150?u=chiamaka", trend: "+12%" },
  { rank: 2, name: "Emeka A.", score: 2720, avatar: "https://i.pravatar.cc/150?u=emeka", trend: "+8%" },
  { rank: 3, name: "Fatima B.", score: 2650, avatar: "https://i.pravatar.cc/150?u=fatima", trend: "+15%" },
  { rank: 4, name: "You", score: 2480, avatar: "https://github.com/shadcn.png", isMe: true, trend: "+22%" },
  { rank: 5, name: "David K.", score: 2350, avatar: "https://i.pravatar.cc/150?u=david", trend: "+5%" },
];

const subjects = [
  { 
    id: 1, 
    name: "Mathematics", 
    progress: 65, 
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop&q=60",
    topics: 12,
    completed: 8
  },
  { 
    id: 2, 
    name: "English", 
    progress: 45, 
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=60",
    topics: 10,
    completed: 4
  },
  { 
    id: 3, 
    name: "Physics", 
    progress: 30, 
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&auto=format&fit=crop&q=60",
    topics: 15,
    completed: 5
  },
  { 
    id: 4, 
    name: "Biology", 
    progress: 80, 
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&auto=format&fit=crop&q=60",
    topics: 14,
    completed: 11
  },
  { 
    id: 5, 
    name: "Chemistry", 
    progress: 55, 
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop&q=60",
    topics: 12,
    completed: 7
  },
  { 
    id: 6, 
    name: "Economics", 
    progress: 25, 
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-500",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=60",
    topics: 10,
    completed: 3
  },
];

const weeklyData = [
  { day: 'Mon', hours: 2.5, questions: 45 },
  { day: 'Tue', hours: 3.2, questions: 62 },
  { day: 'Wed', hours: 1.8, questions: 38 },
  { day: 'Thu', hours: 4.0, questions: 85 },
  { day: 'Fri', hours: 2.9, questions: 55 },
  { day: 'Sat', hours: 5.1, questions: 92 },
  { day: 'Sun', hours: 3.5, questions: 68 },
];

const performanceData = [
  { name: 'Correct', value: 78, color: '#10B981' },
  { name: 'Incorrect', value: 22, color: '#F43F5E' },
];

const quickActions = [
  { 
    title: "Practice Questions", 
    description: "Test your knowledge",
    icon: Target, 
    color: "from-blue-500 to-blue-700",
    href: "/student-suite/past-questions"
  },
  { 
    title: "AI Tutor", 
    description: "Get instant help",
    icon: Brain, 
    color: "from-sky-500 to-blue-600",
    href: "/student-suite/class"
  },
  { 
    title: "My Subjects", 
    description: "Continue learning",
    icon: BookOpen, 
    color: "from-blue-600 to-indigo-700",
    href: "/student-suite/subjects"
  },
  { 
    title: "Play Games", 
    description: "Learn while playing",
    icon: Zap, 
    color: "from-cyan-500 to-blue-600",
    href: "/student-suite/games"
  },
];

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl overflow-hidden shadow-xl shadow-blue-500/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Content */}
          <div className="flex-1 p-8 lg:p-12 z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3" /> 7 Day Streak
              </span>
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center gap-1">
                <Star className="w-3 h-3" /> Level 12
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Sharpen Your Skills with<br />AI-Powered Learning
            </h2>
            <p className="text-blue-100 mb-6 text-base max-w-md">
              Master WAEC & JAMB with personalized AI tutoring. Track your progress and compete with friends.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => navigate('/student-suite/subjects')}
                className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl font-bold px-6 py-6 h-auto shadow-lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/student-suite/past-questions')}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl font-bold px-6 py-6 h-auto backdrop-blur-sm"
              >
                Practice Questions
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative w-full lg:w-2/5 h-48 lg:h-72">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80" 
              alt="Students learning"
              className="w-full h-full object-cover lg:rounded-l-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-700/50 to-transparent lg:rounded-l-3xl"></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <Card 
            key={i}
            className="rounded-2xl border-none shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            onClick={() => navigate(action.href)}
          >
            <CardContent className="p-0">
              <div className={`bg-gradient-to-br ${action.color} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-white text-lg">{action.title}</h3>
                <p className="text-white/80 text-sm">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Questions Solved", value: "1,284", icon: Target, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
              { label: "Study Hours", value: "86.5", icon: Clock, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
              { label: "Current Streak", value: "7 days", icon: Flame, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
              { label: "Accuracy Rate", value: "78%", icon: Award, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
            ].map((stat, i) => (
              <Card key={i} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* My Subjects Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Continue Learning</h3>
              <Button 
                variant="ghost" 
                className="text-primary font-bold"
                onClick={() => navigate('/student-suite/subjects')}
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <Card 
                  key={subject.id} 
                  className="rounded-2xl border-none shadow-sm cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden group"
                  onClick={() => navigate(`/student-suite/subject/${subject.name.toLowerCase()}`)}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={subject.image} 
                      alt={subject.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${subject.color} opacity-60`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h4 className="text-white font-bold text-xl drop-shadow-lg">{subject.name}</h4>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold text-slate-700">
                      {subject.completed}/{subject.topics} Topics
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Progress</p>
                      <p className="text-xs font-bold text-primary">{subject.progress}%</p>
                    </div>
                    <Progress value={subject.progress} className="h-1.5" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Weekly Progress Chart */}
          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">Weekly Progress</CardTitle>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                    Study Hours
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    Questions
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorQuestions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} />
                    <YAxis stroke="#94A3B8" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#6366F1" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorHours)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="questions" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorQuestions)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Performance Ring */}
          <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Performance</h3>
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceData}
                        innerRadius={30}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">78%</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-100">Correct</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-100">Incorrect</span>
                    <span className="font-bold">22%</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Keep it up! You're in the top 15% of learners this week.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Today", value: "45" },
                  { label: "This Week", value: "312" },
                  { label: "Total", value: "1.2K" },
                ].map((stat, i) => (
                  <div key={i} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Leaderboard
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-primary">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboard.map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${
                    item.isMe 
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 ring-1 ring-indigo-200 dark:ring-indigo-700' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="relative">
                    {item.rank <= 3 ? (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                        item.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-500' :
                        item.rank === 2 ? 'bg-gradient-to-br from-slate-400 to-slate-500' :
                        'bg-gradient-to-br from-orange-400 to-orange-500'
                      }`}>
                        {item.rank}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-300">
                        {item.rank}
                      </div>
                    )}
                  </div>
                  <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800 shadow-sm">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.name} {item.isMe && <span className="text-primary">(You)</span>}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.score.toLocaleString()} pts</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-emerald-500">{item.trend}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Friends Online */}
          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Friends Online
                </CardTitle>
                <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                  12 online
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex -space-x-3 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <Avatar key={i} className="w-10 h-10 border-2 border-white dark:border-slate-800">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=friend${i}`} />
                  </Avatar>
                ))}
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                  +7
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full rounded-xl"
                onClick={() => navigate('/student-suite/friends')}
              >
                <Users className="w-4 h-4 mr-2" />
                View All Friends
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
