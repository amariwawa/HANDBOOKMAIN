import React, { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BrainCircuit, 
  CheckSquare, 
  Sparkles,
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  Plus,
  Image,
  Smile,
  Paperclip,
  Check,
  CheckCheck
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

const chatGroups = [
  { 
    id: 1, 
    name: "SS3 Science Class", 
    avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100", 
    lastMessage: "Remember to submit your assignments", 
    time: "2:30 PM",
    unread: 3,
    online: 24
  },
  { 
    id: 2, 
    name: "Mathematics Department", 
    avatar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100", 
    lastMessage: "Meeting tomorrow at 10 AM", 
    time: "1:15 PM",
    unread: 0,
    online: 8
  },
  { 
    id: 3, 
    name: "SS2 Physics Group", 
    avatar: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=100", 
    lastMessage: "Great work on the practicals!", 
    time: "11:45 AM",
    unread: 1,
    online: 18
  },
  { 
    id: 4, 
    name: "Staff Room", 
    avatar: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=100", 
    lastMessage: "PTA meeting scheduled for Friday", 
    time: "Yesterday",
    unread: 0,
    online: 12
  },
];

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isMe: boolean;
  status: "sent" | "delivered" | "read";
}

const initialMessages: Message[] = [
  { id: 1, sender: "Chiamaka O.", avatar: "https://i.pravatar.cc/150?u=chiamaka", content: "Good afternoon sir! I have a question about the assignment.", time: "2:15 PM", isMe: false, status: "read" },
  { id: 2, sender: "You", avatar: "https://github.com/shadcn.png", content: "Yes, Chiamaka. What's your question?", time: "2:18 PM", isMe: true, status: "read" },
  { id: 3, sender: "Chiamaka O.", avatar: "https://i.pravatar.cc/150?u=chiamaka", content: "The question on electromagnetic induction - should we include Faraday's law derivation?", time: "2:20 PM", isMe: false, status: "read" },
  { id: 4, sender: "Emeka A.", avatar: "https://i.pravatar.cc/150?u=emeka", content: "I was wondering the same thing!", time: "2:22 PM", isMe: false, status: "read" },
  { id: 5, sender: "You", avatar: "https://github.com/shadcn.png", content: "Great question! Yes, please include the derivation. It will help you understand the concept better and is likely to come up in WAEC.", time: "2:25 PM", isMe: true, status: "read" },
  { id: 6, sender: "Fatima B.", avatar: "https://i.pravatar.cc/150?u=fatima", content: "Thank you sir! That's very helpful.", time: "2:28 PM", isMe: false, status: "read" },
  { id: 7, sender: "You", avatar: "https://github.com/shadcn.png", content: "Remember to submit your assignments before Friday. Let me know if you have any other questions.", time: "2:30 PM", isMe: true, status: "delivered" },
];

const TeacherChat = () => {
  const [selectedChat, setSelectedChat] = useState(chatGroups[0]);
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
      avatar: "https://github.com/shadcn.png",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: "sent"
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate delivery status update
    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, status: "delivered" } : m
      ));
    }, 1000);
  };

  const filteredGroups = chatGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="h-[calc(100vh-160px)] flex gap-6">
        {/* Sidebar - Chat List */}
        <div className="w-80 shrink-0 flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-10 rounded-xl bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredGroups.map((group) => (
              <Card 
                key={group.id}
                className={`rounded-2xl border-none cursor-pointer transition-all ${
                  selectedChat.id === group.id 
                    ? 'bg-primary/10 shadow-sm' 
                    : 'bg-white hover:bg-slate-50'
                }`}
                onClick={() => setSelectedChat(group)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={group.avatar} />
                      <AvatarFallback>{group.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm text-slate-900 truncate">{group.name}</p>
                      <span className="text-[10px] text-slate-400">{group.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 truncate">{group.lastMessage}</p>
                      {group.unread > 0 && (
                        <span className="px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">
                          {group.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="mt-4 rounded-xl w-full">
            <Plus className="w-4 h-4 mr-2" /> Create New Group
          </Button>
        </div>

        {/* Main Chat Area */}
        <Card className="flex-1 rounded-2xl border-none shadow-sm overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedChat.avatar} />
                <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-slate-900">{selectedChat.name}</h3>
                <p className="text-xs text-emerald-500">{selectedChat.online} members online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Phone className="w-5 h-5 text-slate-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Video className="w-5 h-5 text-slate-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="w-5 h-5 text-slate-500" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-end gap-2 max-w-[70%] ${msg.isMe ? "flex-row-reverse" : ""}`}>
                  {!msg.isMe && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    {!msg.isMe && (
                      <p className="text-xs text-slate-500 mb-1 ml-1">{msg.sender}</p>
                    )}
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
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full shrink-0">
                <Paperclip className="w-5 h-5 text-slate-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full shrink-0">
                <Image className="w-5 h-5 text-slate-500" />
              </Button>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 rounded-xl bg-slate-100 border-slate-200 text-slate-900"
              />
              <Button variant="ghost" size="icon" className="rounded-full shrink-0">
                <Smile className="w-5 h-5 text-slate-500" />
              </Button>
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
    </DashboardLayout>
  );
};

export default TeacherChat;
