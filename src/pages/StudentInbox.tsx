import React, { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Gamepad2, 
  MessageSquare,
  Sparkles,
  Search,
  Send,
  Bell,
  Trophy,
  UserPlus,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star,
  Clock,
  MoreHorizontal,
  Check,
  CheckCheck
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

const conversations = [
  { 
    id: 1, 
    name: "Mr. Adebayo", 
    avatar: "https://i.pravatar.cc/150?u=adebayo", 
    role: "Physics Teacher",
    lastMessage: "Don't forget to submit your assignment before Friday.", 
    time: "2:30 PM",
    unread: 2,
    online: true
  },
  { 
    id: 2, 
    name: "Chiamaka O.", 
    avatar: "https://i.pravatar.cc/150?u=chiamaka", 
    role: "Classmate",
    lastMessage: "Can we study together this weekend?", 
    time: "1:15 PM",
    unread: 1,
    online: true
  },
  { 
    id: 3, 
    name: "Mrs. Okoro", 
    avatar: "https://i.pravatar.cc/150?u=okoro", 
    role: "Mathematics Teacher",
    lastMessage: "Great work on your last test!", 
    time: "Yesterday",
    unread: 0,
    online: false
  },
  { 
    id: 4, 
    name: "Study Group SS3", 
    avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100", 
    role: "12 members",
    lastMessage: "Emeka: Let's meet at the library", 
    time: "Yesterday",
    unread: 5,
    online: true
  },
];

const notifications = [
  { id: 1, type: "achievement", title: "New Achievement Unlocked!", message: "You earned the 'Quick Learner' badge for completing 10 lessons in a day.", time: "10 mins ago", read: false },
  { id: 2, type: "friend", title: "Friend Request", message: "Blessing Nwachukwu wants to connect with you.", time: "1 hour ago", read: false },
  { id: 3, type: "assignment", title: "Assignment Reminder", message: "Physics assignment due in 2 days. Don't forget to submit!", time: "2 hours ago", read: false },
  { id: 4, type: "leaderboard", title: "Leaderboard Update", message: "You moved up 5 positions in the weekly leaderboard!", time: "5 hours ago", read: true },
  { id: 5, type: "event", title: "Upcoming Event", message: "JAMB mock exam scheduled for next Saturday at 9 AM.", time: "Yesterday", read: true },
  { id: 6, type: "system", title: "New Features Available", message: "Check out the new AI-powered past questions feature!", time: "2 days ago", read: true },
];

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
  status: "sent" | "delivered" | "read";
}

const initialMessages: Message[] = [
  { id: 1, sender: "Mr. Adebayo", content: "Good afternoon! How are your preparations for the upcoming test?", time: "2:00 PM", isMe: false, status: "read" },
  { id: 2, sender: "You", content: "Good afternoon sir! I'm doing well, thank you. I've been practicing the past questions.", time: "2:05 PM", isMe: true, status: "read" },
  { id: 3, sender: "Mr. Adebayo", content: "That's great to hear! Make sure you focus on electromagnetic induction - it's a key topic.", time: "2:10 PM", isMe: false, status: "read" },
  { id: 4, sender: "You", content: "Yes sir, I'll make sure to cover that thoroughly.", time: "2:15 PM", isMe: true, status: "read" },
  { id: 5, sender: "Mr. Adebayo", content: "Don't forget to submit your assignment before Friday.", time: "2:30 PM", isMe: false, status: "read" },
];

const StudentInbox = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: "sent"
    };

    setMessages([...messages, message]);
    setNewMessage("");

    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, status: "delivered" } : m
      ));
    }, 1000);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "achievement": return <Trophy className="w-5 h-5 text-amber-500" />;
      case "friend": return <UserPlus className="w-5 h-5 text-blue-500" />;
      case "assignment": return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case "leaderboard": return <Star className="w-5 h-5 text-purple-500" />;
      case "event": return <Calendar className="w-5 h-5 text-emerald-500" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout navItems={studentNavItems} userType="Student" friends={mockFriends}>
      <div className="h-[calc(100vh-160px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Inbox</h2>
            <p className="text-slate-500">Messages and notifications</p>
          </div>
        </div>

        <Tabs defaultValue="messages" className="flex-1 flex flex-col">
          <TabsList className="bg-slate-100 rounded-xl p-1 mb-4 shrink-0 w-fit">
            <TabsTrigger value="messages" className="rounded-lg">
              <MessageSquare className="w-4 h-4 mr-2" /> Messages
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg relative">
              <Bell className="w-4 h-4 mr-2" /> Notifications
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages" className="flex-1 mt-0">
            <div className="h-full flex gap-4">
              {/* Conversation List */}
              <div className="w-80 shrink-0 flex flex-col">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-10 rounded-xl bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-2">
                  {conversations.map((conv) => (
                    <Card 
                      key={conv.id}
                      className={`rounded-2xl border-none cursor-pointer transition-all ${
                        selectedConversation.id === conv.id 
                          ? 'bg-primary/10 shadow-sm' 
                          : 'bg-white hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedConversation(conv)}
                    >
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={conv.avatar} />
                            <AvatarFallback>{conv.name[0]}</AvatarFallback>
                          </Avatar>
                          {conv.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm text-slate-900 truncate">{conv.name}</p>
                            <span className="text-[10px] text-slate-400">{conv.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                            {conv.unread > 0 && (
                              <span className="px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full ml-2">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <Card className="flex-1 rounded-2xl border-none shadow-sm overflow-hidden flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between bg-white shrink-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedConversation.avatar} />
                      <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-900">{selectedConversation.name}</h3>
                      <p className="text-xs text-slate-500">{selectedConversation.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%]`}>
                        <div
                          className={`p-3 rounded-2xl ${
                            msg.isMe
                              ? "bg-primary text-white rounded-br-none"
                              : "bg-white text-slate-800 rounded-bl-none border shadow-sm"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 ${msg.isMe ? "justify-end" : "justify-start"}`}>
                          <span className="text-[10px] text-slate-400">{msg.time}</span>
                          {msg.isMe && (
                            msg.status === "read" ? (
                              <CheckCheck className="w-3 h-3 text-blue-500" />
                            ) : msg.status === "delivered" ? (
                              <CheckCheck className="w-3 h-3 text-slate-400" />
                            ) : (
                              <Check className="w-3 h-3 text-slate-400" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t shrink-0">
                  <div className="flex gap-3">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 rounded-xl bg-slate-100 border-slate-200 text-slate-900"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="rounded-xl"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="flex-1 mt-0">
            <Card className="rounded-2xl border-none shadow-sm h-full overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y max-h-[calc(100vh-300px)] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${!notif.read ? 'bg-primary/10' : 'bg-slate-100'}`}>
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <p className={`font-semibold text-sm ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                            {notif.title}
                          </p>
                          <span className="text-xs text-slate-400 shrink-0 ml-2">{notif.time}</span>
                        </div>
                        <p className="text-sm text-slate-500">{notif.message}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentInbox;
