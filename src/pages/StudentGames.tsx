import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Gamepad2, 
  MessageSquare,
  Sparkles,
  Trophy,
  Users,
  Clock,
  Star,
  Play,
  Zap
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

const games = [
  { 
    name: "Math Blast", 
    description: "Race against time solving math puzzles!", 
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&auto=format&fit=crop&q=60",
    color: "from-blue-500 to-indigo-600",
    players: 1234,
    topScore: 9500,
    category: "Mathematics",
    difficulty: "Medium"
  },
  { 
    name: "Word Wizard", 
    description: "Build your vocabulary with word challenges!", 
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&auto=format&fit=crop&q=60",
    color: "from-purple-500 to-pink-600",
    players: 892,
    topScore: 8200,
    category: "English",
    difficulty: "Easy"
  },
  { 
    name: "Science Lab", 
    description: "Conduct virtual experiments and learn!", 
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop&q=60",
    color: "from-emerald-500 to-teal-600",
    players: 756,
    topScore: 7800,
    category: "Science",
    difficulty: "Hard"
  },
  { 
    name: "History Quest", 
    description: "Travel through time and discover history!", 
    image: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400&auto=format&fit=crop&q=60",
    color: "from-amber-500 to-orange-600",
    players: 645,
    topScore: 6500,
    category: "History",
    difficulty: "Medium"
  },
  { 
    name: "Geography Explorer", 
    description: "Explore countries, capitals and landmarks!", 
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400&auto=format&fit=crop&q=60",
    color: "from-cyan-500 to-blue-600",
    players: 534,
    topScore: 7200,
    category: "Geography",
    difficulty: "Easy"
  },
  { 
    name: "Quiz Champion", 
    description: "Test your knowledge across all subjects!", 
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&auto=format&fit=crop&q=60",
    color: "from-rose-500 to-red-600",
    players: 1567,
    topScore: 10200,
    category: "General",
    difficulty: "Mixed"
  },
];

const StudentGames = () => {
  return (
    <DashboardLayout navItems={studentNavItems} userType="Student" friends={mockFriends}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Educational Games</h2>
            <p className="text-slate-500 mt-1">Learn while having fun with interactive games</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-amber-700">Your Best: 9,500 pts</span>
            </div>
          </div>
        </div>

        {/* Featured Game Banner */}
        <div className="relative h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60')] bg-cover bg-center opacity-20"></div>
          <div className="relative h-full flex items-center px-8">
            <div className="flex-1">
              <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-xs font-semibold mb-3 inline-block">
                🎮 Featured Game
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Champion Challenge</h3>
              <p className="text-white/80 text-sm mb-4">Compete with students nationwide in real-time quiz battles!</p>
              <Button className="bg-white text-purple-600 hover:bg-white/90 rounded-xl font-bold">
                <Play className="w-4 h-4 mr-2" /> Play Now
              </Button>
            </div>
            <div className="hidden md:flex items-center gap-8 text-white">
              <div className="text-center">
                <p className="text-3xl font-bold">1.5K</p>
                <p className="text-xs text-white/70">Playing Now</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">50K</p>
                <p className="text-xs text-white/70">Total Players</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Games Played", value: "156", icon: Gamepad2, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Total Score", value: "45,280", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Time Played", value: "24h 30m", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
            { label: "Global Rank", value: "#127", icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-50" },
          ].map((stat, i) => (
            <Card key={i} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Games Grid */}
        <div>
          <h3 className="text-xl font-bold mb-4">All Games</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game, i) => (
              <Card key={game.name} className="rounded-2xl border-none shadow-sm overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-70`}></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="bg-white text-slate-900 rounded-xl font-bold shadow-xl">
                      <Play className="w-4 h-4 mr-2" /> Play Now
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-lg">
                    <span className="text-xs font-bold text-slate-700">{game.category}</span>
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur rounded-lg">
                    <span className="text-xs font-medium text-white">{game.difficulty}</span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{game.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{game.description}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {game.players.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        {game.topScore.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-amber-600">+500 XP</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentGames;
