import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  UserPlus,
  Users,
  Check,
  X,
  Clock,
  Send,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";

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

const friendsList = [
  { id: 1, name: "Chiamaka Okonkwo", avatar: "https://i.pravatar.cc/150?u=chiamaka", status: "online", school: "Federal Science College", mutualFriends: 5 },
  { id: 2, name: "Emeka Adeyemi", avatar: "https://i.pravatar.cc/150?u=emeka", status: "online", school: "Kings College Lagos", mutualFriends: 8 },
  { id: 3, name: "Fatima Bello", avatar: "https://i.pravatar.cc/150?u=fatima", status: "offline", school: "Queens College Lagos", mutualFriends: 3 },
  { id: 4, name: "David Kalu", avatar: "https://i.pravatar.cc/150?u=david", status: "online", school: "Loyola College Ibadan", mutualFriends: 12 },
  { id: 5, name: "Amina Ibrahim", avatar: "https://i.pravatar.cc/150?u=amina", status: "offline", school: "Government College Kaduna", mutualFriends: 6 },
];

const pendingRequests = [
  { id: 1, name: "Blessing Nwachukwu", avatar: "https://i.pravatar.cc/150?u=blessing", school: "Federal Science College", mutualFriends: 2 },
  { id: 2, name: "Yusuf Mohammed", avatar: "https://i.pravatar.cc/150?u=yusuf", school: "Government College Kano", mutualFriends: 4 },
];

const sentRequests = [
  { id: 1, name: "Grace Obi", avatar: "https://i.pravatar.cc/150?u=grace", school: "Command Secondary School", sentAt: "2 days ago" },
];

const suggestedFriends = [
  { id: 1, name: "Tunde Bakare", avatar: "https://i.pravatar.cc/150?u=tunde", school: "Federal Government College", mutualFriends: 15 },
  { id: 2, name: "Ngozi Eze", avatar: "https://i.pravatar.cc/150?u=ngozi", school: "Kings College Lagos", mutualFriends: 8 },
  { id: 3, name: "Ahmed Sani", avatar: "https://i.pravatar.cc/150?u=ahmed", school: "Barewa College Zaria", mutualFriends: 6 },
  { id: 4, name: "Chidinma Okeke", avatar: "https://i.pravatar.cc/150?u=chidinma", school: "Queens College Lagos", mutualFriends: 11 },
];

const StudentFriends = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("friends");

  const handleAcceptRequest = (id: number) => {
    toast.success("Friend request accepted!");
  };

  const handleRejectRequest = (id: number) => {
    toast.info("Friend request declined");
  };

  const handleSendRequest = (id: number) => {
    toast.success("Friend request sent!");
  };

  const handleCancelRequest = (id: number) => {
    toast.info("Friend request cancelled");
  };

  const filteredFriends = friendsList.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout navItems={studentNavItems} userType="Student" friends={mockFriends}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Friends</h2>
            <p className="text-slate-500">Connect with classmates and study partners</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary">{friendsList.length} Friends</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search friends or find new ones..." 
            className="pl-10 rounded-xl bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList className="bg-slate-100 rounded-xl p-1">
            <TabsTrigger value="friends" className="rounded-lg">
              My Friends ({friendsList.length})
            </TabsTrigger>
            <TabsTrigger value="requests" className="rounded-lg">
              Requests ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="sent" className="rounded-lg">
              Sent ({sentRequests.length})
            </TabsTrigger>
            <TabsTrigger value="discover" className="rounded-lg">
              Discover
            </TabsTrigger>
          </TabsList>

          {/* My Friends */}
          <TabsContent value="friends" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFriends.map((friend) => (
                <Card key={friend.id} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${friend.status === "online" ? "bg-emerald-500" : "bg-slate-300"}`}></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{friend.name}</p>
                        <p className="text-xs text-slate-500 truncate">{friend.school}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-xs text-slate-500">{friend.mutualFriends} mutual friends</span>
                      <Button size="sm" variant="outline" className="rounded-lg text-xs h-8">
                        <Send className="w-3 h-3 mr-1" /> Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pending Requests */}
          <TabsContent value="requests" className="space-y-4">
            {pendingRequests.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="rounded-2xl border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{request.name}</p>
                          <p className="text-xs text-slate-500 truncate">{request.school}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{request.mutualFriends} mutual friends</p>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 rounded-lg" 
                          size="sm"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          <Check className="w-4 h-4 mr-1" /> Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 rounded-lg" 
                          size="sm"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <X className="w-4 h-4 mr-1" /> Decline
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No pending friend requests</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Sent Requests */}
          <TabsContent value="sent" className="space-y-4">
            {sentRequests.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sentRequests.map((request) => (
                  <Card key={request.id} className="rounded-2xl border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{request.name}</p>
                          <p className="text-xs text-slate-500 truncate">{request.school}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Sent {request.sentAt}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-lg text-xs h-8 text-rose-500 hover:text-rose-600"
                          onClick={() => handleCancelRequest(request.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-12 text-center">
                  <Send className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No pending sent requests</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Discover */}
          <TabsContent value="discover" className="space-y-4">
            <h3 className="font-semibold text-slate-900">People you may know</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {suggestedFriends.map((person) => (
                <Card key={person.id} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-4 text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>{person.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold text-slate-900 truncate">{person.name}</p>
                    <p className="text-xs text-slate-500 mb-1 truncate">{person.school}</p>
                    <p className="text-xs text-slate-400 mb-3">{person.mutualFriends} mutual friends</p>
                    <Button 
                      className="w-full rounded-lg" 
                      size="sm"
                      onClick={() => handleSendRequest(person.id)}
                    >
                      <UserPlus className="w-4 h-4 mr-1" /> Add Friend
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentFriends;
