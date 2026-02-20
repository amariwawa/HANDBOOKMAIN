import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateResearchContent, generateContent } from "@/lib/gemini";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BrainCircuit, 
  CheckSquare, 
  Sparkles,
  Search,
  Loader2,
  BookOpen,
  ExternalLink,
  Lightbulb,
  ChevronRight,
  Send,
  RefreshCw
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

interface ResearchResult {
  summary: string;
  keyPoints: string[];
  sources: { title: string; url: string }[];
  relatedTopics: string[];
}

const TeacherResearch = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;
    
    setIsLoading(true);
    setChatMessages([]);
    
    try {
      const research = await generateResearchContent(query);
      setResult(research);
    } catch (error) {
      console.error("Research error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsChatLoading(true);
    
    const prompt = `You are a research assistant helping a teacher. The current research topic is: "${query}".
    Previous conversation: ${chatMessages.map(m => `${m.role}: ${m.content}`).join("\n")}
    Teacher's question: ${userMsg}
    
    Provide a helpful, educational response.`;
    
    const response = await generateContent(prompt);
    setChatMessages(prev => [...prev, { role: "ai", content: response }]);
    setIsChatLoading(false);
  };

  const handleRelatedTopic = (topic: string) => {
    setQuery(topic);
    handleSearchWithTopic(topic);
  };

  const handleSearchWithTopic = async (topic: string) => {
    setIsLoading(true);
    setChatMessages([]);
    
    try {
      const research = await generateResearchContent(topic);
      setResult(research);
    } catch (error) {
      console.error("Research error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-primary rounded-xl">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">AI Research Assistant</h2>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search academic resources, papers, and teaching materials..." 
            className="pl-12 py-6 text-lg rounded-2xl border-slate-200 focus:ring-primary/20"
          />
          <Button 
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
          </Button>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">AI is researching "{query}"...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !result && (
          <div className="text-center text-muted-foreground py-16">
            <BrainCircuit className="w-20 h-20 mx-auto mb-4 opacity-20" />
            <p className="text-lg mb-2">Enter a topic to start researching</p>
            <p className="text-sm">Get AI-powered summaries, key points, and related resources</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && result && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Card */}
              <Card className="rounded-2xl border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {result.summary}
                  </p>
                </CardContent>
              </Card>

              {/* Key Points */}
              <Card className="rounded-2xl border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Key Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-slate-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Sources */}
              <Card className="rounded-2xl border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ExternalLink className="w-5 h-5 text-emerald-500" />
                    Suggested Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.sources.map((source, i) => (
                      <a 
                        key={i}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                        <span className="text-slate-700 group-hover:text-primary">{source.title}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Topics */}
              <Card className="rounded-2xl border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Related Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.relatedTopics.map((topic, i) => (
                      <button
                        key={i}
                        onClick={() => handleRelatedTopic(topic)}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-colors text-left group"
                      >
                        <span className="text-sm">{topic}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Chat */}
              <Card className="rounded-2xl border-none shadow-sm bg-slate-900 text-white overflow-hidden">
                <CardHeader className="pb-2 bg-slate-800/50">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Ask AI about this topic
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-48 overflow-y-auto p-4 space-y-3">
                    {chatMessages.length === 0 ? (
                      <p className="text-slate-500 text-xs text-center py-8">
                        Ask follow-up questions about your research
                      </p>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-2 rounded-xl text-xs ${
                            msg.role === 'user' 
                              ? 'bg-primary text-white rounded-tr-none' 
                              : 'bg-slate-800 text-slate-200 rounded-tl-none'
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-800 p-2 rounded-xl rounded-tl-none">
                          <Loader2 className="w-3 h-3 animate-spin text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-slate-800">
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleChat()}
                        placeholder="Ask a question..."
                        className="bg-slate-800 border-none text-white text-xs h-8"
                      />
                      <Button 
                        size="icon" 
                        onClick={handleChat}
                        disabled={isChatLoading}
                        className="h-8 w-8 bg-primary shrink-0"
                      >
                        <Send className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* New Search */}
              <Button 
                variant="outline" 
                className="w-full rounded-xl"
                onClick={() => {
                  setResult(null);
                  setQuery("");
                  setChatMessages([]);
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Research
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherResearch;
