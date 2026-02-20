import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateQuestions, generateContent } from "@/lib/gemini";
import { 
  BookOpen, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  XCircle,
  MessageSquare,
  BrainCircuit,
  Loader2,
  RefreshCw,
  ArrowLeft,
  Play,
  Trophy,
  Clock,
  Target,
  Send
} from "lucide-react";
import { 
  LayoutDashboard, 
  Gamepad2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const studentNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/student-suite" },
  { name: "My Subjects", icon: BookOpen, href: "/student-suite/subjects" },
  { name: "Class AI", icon: Sparkles, href: "/student-suite/class" },
  { name: "Past Questions", icon: FileText, href: "/student-suite/past-questions" },
  { name: "Games", icon: Gamepad2, href: "/student-suite/games" },
  { name: "Inbox", icon: MessageSquare, href: "/student-suite/inbox" },
];

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
  explanation: string;
  followUp: string;
}

const subjectData: Record<string, {
  name: string;
  icon: string;
  color: string;
  gradient: string;
  image: string;
  description: string;
  topics: { name: string; lessons: number; completed: number }[];
}> = {
  mathematics: {
    name: "Mathematics",
    icon: "📐",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
    description: "Master algebra, geometry, trigonometry, and calculus for WAEC & JAMB success.",
    topics: [
      { name: "Algebra", lessons: 12, completed: 8 },
      { name: "Geometry", lessons: 10, completed: 6 },
      { name: "Trigonometry", lessons: 8, completed: 4 },
      { name: "Statistics", lessons: 6, completed: 3 },
      { name: "Calculus", lessons: 10, completed: 2 },
    ]
  },
  english: {
    name: "English",
    icon: "📚",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60",
    description: "Improve your grammar, comprehension, and essay writing skills.",
    topics: [
      { name: "Grammar", lessons: 15, completed: 10 },
      { name: "Comprehension", lessons: 12, completed: 7 },
      { name: "Essay Writing", lessons: 8, completed: 4 },
      { name: "Literature", lessons: 10, completed: 5 },
      { name: "Vocabulary", lessons: 10, completed: 6 },
    ]
  },
  physics: {
    name: "Physics",
    icon: "⚛️",
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=60",
    description: "Understand mechanics, electricity, waves, and modern physics.",
    topics: [
      { name: "Mechanics", lessons: 14, completed: 5 },
      { name: "Electricity", lessons: 12, completed: 4 },
      { name: "Waves", lessons: 8, completed: 3 },
      { name: "Optics", lessons: 6, completed: 2 },
      { name: "Heat", lessons: 8, completed: 3 },
    ]
  },
  biology: {
    name: "Biology",
    icon: "🧬",
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-green-500",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=60",
    description: "Explore cell biology, genetics, ecology, and human physiology.",
    topics: [
      { name: "Cell Biology", lessons: 10, completed: 8 },
      { name: "Genetics", lessons: 12, completed: 9 },
      { name: "Ecology", lessons: 8, completed: 6 },
      { name: "Human Physiology", lessons: 14, completed: 10 },
      { name: "Plant Biology", lessons: 8, completed: 5 },
    ]
  },
  chemistry: {
    name: "Chemistry",
    icon: "🧪",
    color: "bg-rose-500",
    gradient: "from-rose-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60",
    description: "Learn organic, inorganic, and physical chemistry concepts.",
    topics: [
      { name: "Organic Chemistry", lessons: 14, completed: 7 },
      { name: "Inorganic Chemistry", lessons: 12, completed: 6 },
      { name: "Physical Chemistry", lessons: 10, completed: 5 },
      { name: "Electrochemistry", lessons: 6, completed: 3 },
      { name: "Atomic Structure", lessons: 8, completed: 4 },
    ]
  },
  economics: {
    name: "Economics",
    icon: "📊",
    color: "bg-cyan-500",
    gradient: "from-cyan-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60",
    description: "Understand microeconomics, macroeconomics, and Nigerian economy.",
    topics: [
      { name: "Microeconomics", lessons: 10, completed: 3 },
      { name: "Macroeconomics", lessons: 10, completed: 2 },
      { name: "Nigerian Economy", lessons: 8, completed: 2 },
      { name: "International Trade", lessons: 6, completed: 1 },
      { name: "Public Finance", lessons: 6, completed: 1 },
    ]
  },
};

const SubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const subject = subjectData[subjectId || "mathematics"];
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [aiChat, setAiChat] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const fetchQuestions = async (topic: string) => {
    setIsLoading(true);
    setChatMessages([]);
    try {
      const newQuestions = await generateQuestions(subject.name, topic, 10);
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setCurrentIdx(0);
        setSelectedOption(null);
        setShowExplanation(false);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setIsLoading(false);
  };

  const handleStartTopic = (topicName: string) => {
    setSelectedTopic(topicName);
    fetchQuestions(topicName);
  };

  const handleAiChat = async (customMessage?: string) => {
    const messageToSend = customMessage || aiChat.trim();
    if (!messageToSend || isChatLoading || questions.length === 0) return;
    
    setAiChat("");
    setChatMessages(prev => [...prev, { role: "user", content: messageToSend }]);
    setIsChatLoading(true);
    
    const prompt = `You are a helpful AI tutor for Nigerian secondary school students preparing for WAEC/JAMB.
    
Subject: ${subject.name}
Topic: ${selectedTopic}
Current Question: "${questions[currentIdx]?.text}"
Correct Answer: ${questions[currentIdx]?.correct}

Student's question: ${messageToSend}

Please provide a clear, helpful response suitable for secondary school students.`;
    
    try {
      const response = await generateContent(prompt);
      setChatMessages(prev => [...prev, { role: "ai", content: response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: "ai", content: "Sorry, I couldn't process that. Please try again." }]);
    }
    setIsChatLoading(false);
  };

  if (!subject) {
    return (
      <DashboardLayout navItems={studentNavItems} userType="Student">
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-500">Subject not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const totalLessons = subject.topics.reduce((acc, t) => acc + t.lessons, 0);
  const completedLessons = subject.topics.reduce((acc, t) => acc + t.completed, 0);
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <DashboardLayout navItems={studentNavItems} userType="Student">
      {!selectedTopic ? (
        // Topic Selection View
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className={`relative h-64 bg-gradient-to-br ${subject.gradient} rounded-3xl overflow-hidden`}>
            <img 
              src={subject.image} 
              alt={subject.name}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            <div className="relative h-full flex items-center px-8">
              <div className="max-w-xl text-white">
                <Button 
                  variant="ghost" 
                  className="text-white/80 hover:text-white mb-4 -ml-2"
                  onClick={() => navigate('/student-suite/subjects')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
                </Button>
                <div className="mb-4">
                  <h1 className="text-3xl font-bold">{subject.name}</h1>
                  <p className="text-white/80">{subject.description}</p>
                </div>
                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <span>{totalLessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span>{progress}% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Your Progress</h3>
                <span className="text-primary font-bold">{completedLessons}/{totalLessons} lessons</span>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>

          {/* Topics Grid */}
          <div>
            <h2 className="text-xl font-bold mb-4">Topics</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subject.topics.map((topic, i) => {
                const topicProgress = Math.round((topic.completed / topic.lessons) * 100);
                return (
                  <Card 
                    key={i} 
                    className="rounded-2xl border-none shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => handleStartTopic(topic.name)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                          {i + 1}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{topic.name}</h3>
                      <p className="text-sm text-slate-500 mb-4">{topic.lessons} lessons</p>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-bold text-primary">{topicProgress}%</span>
                      </div>
                      <Progress value={topicProgress} className="h-1.5" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        // Question Practice View
        <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-160px)]">
          {/* Questions Area */}
          <div className="lg:col-span-2 space-y-4 overflow-y-auto pr-2">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedTopic(null)}
                className="text-slate-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Topics
              </Button>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 ${subject.color} text-white rounded-lg text-sm font-medium`}>
                  {selectedTopic}
                </span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => fetchQuestions(selectedTopic)}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="h-96 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-slate-500 animate-pulse">AI is generating questions...</p>
              </div>
            ) : questions.length > 0 ? (
              <Card className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-slate-500">Question {currentIdx + 1} of {questions.length}</span>
                    <Progress value={((currentIdx + 1) / questions.length) * 100} className="w-32 h-2" />
                  </div>
                  
                  <h3 className="text-xl font-medium text-slate-800 mb-8 leading-relaxed">
                    {questions[currentIdx].text}
                  </h3>

                  <div className="space-y-3">
                    {questions[currentIdx].options.map((option, i) => {
                      const optionLetter = String.fromCharCode(65 + i);
                      const isCorrect = optionLetter === questions[currentIdx].correct || option === questions[currentIdx].correct;
                      const isSelected = option === selectedOption;
                      
                      let styles = "bg-white border-slate-200 text-slate-800 hover:border-primary/50 hover:bg-indigo-50/30";
                      if (selectedOption) {
                        if (isCorrect) styles = "bg-emerald-50 border-emerald-300 text-emerald-800";
                        else if (isSelected) styles = "bg-rose-50 border-rose-300 text-rose-800";
                        else styles = "bg-slate-50 border-slate-200 text-slate-500";
                      }

                      return (
                        <button
                          key={i}
                          disabled={!!selectedOption}
                          onClick={() => {
                            setSelectedOption(option);
                            setShowExplanation(true);
                          }}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${styles}`}
                        >
                          <span className="font-medium">{optionLetter}. {option}</span>
                          {selectedOption && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                          {selectedOption && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setCurrentIdx(Math.max(0, currentIdx - 1));
                        setSelectedOption(null);
                        setShowExplanation(false);
                        setChatMessages([]);
                      }}
                      disabled={currentIdx === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                    </Button>
                    <Button 
                      onClick={() => {
                        setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1));
                        setSelectedOption(null);
                        setShowExplanation(false);
                        setChatMessages([]);
                      }}
                      disabled={currentIdx === questions.length - 1}
                      className="bg-primary"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-8 text-center">
                  <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                  <p className="text-slate-500 mb-4">Failed to load questions. Please try again.</p>
                  <Button onClick={() => fetchQuestions(selectedTopic)}>Retry</Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* AI Tutor Sidebar */}
          <Card className="rounded-2xl border-none shadow-sm bg-slate-900 text-white overflow-hidden flex flex-col h-full">
            <div className="p-4 bg-slate-800/50 flex items-center gap-3 shrink-0">
              <div className={`w-10 h-10 ${subject.color} rounded-xl flex items-center justify-center`}>
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">AI Tutor</h4>
                <p className="text-[10px] text-emerald-400 font-bold">Ready to help</p>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.length > 0 ? (
                chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-slate-800 text-slate-200 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))
              ) : showExplanation && questions[currentIdx] ? (
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {questions[currentIdx].explanation}
                    </p>
                  </div>
                  <div className="bg-primary/20 rounded-xl p-4">
                    <p className="text-sm text-slate-200 mb-3">{questions[currentIdx].followUp}</p>
                    <Button 
                      size="sm" 
                      className="bg-primary text-white"
                      onClick={() => handleAiChat("Can you explain this in more detail?")}
                    >
                      Explain More
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Sparkles className="w-12 h-12 text-slate-700 mb-4" />
                  <p className="text-slate-500 text-sm">Select an answer to see the explanation!</p>
                </div>
              )}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-700 shrink-0">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={aiChat}
                  onChange={(e) => setAiChat(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAiChat()}
                  placeholder="Ask a question..." 
                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50 outline-none"
                />
                <Button 
                  size="icon"
                  onClick={() => handleAiChat()}
                  disabled={isChatLoading || !aiChat.trim()}
                  className="bg-primary shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SubjectPage;
