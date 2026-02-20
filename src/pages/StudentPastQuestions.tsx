import React, { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Volume2,
  BrainCircuit,
  Loader2,
  RefreshCw,
  Send,
  Users
} from "lucide-react";
import { 
  LayoutDashboard, 
  Gamepad2
} from "lucide-react";

const studentNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/student-suite" },
  { name: "My Subjects", icon: BookOpen, href: "/student-suite/subjects" },
  { name: "Class AI", icon: Sparkles, href: "/student-suite/class" },
  { name: "Past Questions", icon: FileText, href: "/student-suite/past-questions" },
  { name: "Games", icon: Gamepad2, href: "/student-suite/games" },
  { name: "Friends", icon: Users, href: "/student-suite/friends" },
  { name: "Inbox", icon: MessageSquare, href: "/student-suite/inbox" },
];

interface Question {
  id: number;
  subject: string;
  text: string;
  options: string[];
  correct: string;
  explanation: string;
  followUp: string;
}

const StudentPastQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subject, setSubject] = useState("Mathematics");
  const [aiChat, setAiChat] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const aiTutorRef = useRef<HTMLDivElement>(null);

  // Topics per subject for WAEC/JAMB
  const subjectTopics: Record<string, string[]> = {
    Mathematics: ["Algebra", "Geometry", "Trigonometry", "Statistics", "Calculus"],
    English: ["Grammar", "Comprehension", "Essay Writing", "Literature", "Vocabulary"],
    Physics: ["Mechanics", "Electricity", "Waves", "Optics", "Heat"],
    Chemistry: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Electrochemistry", "Atomic Structure"],
    Biology: ["Cell Biology", "Genetics", "Ecology", "Human Physiology", "Plant Biology"],
  };

  const [topic, setTopic] = useState(subjectTopics[subject][0]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setChatMessages([]);
    try {
      const newQuestions = await generateQuestions(subject, topic, 10);
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions.map((q: any) => ({ ...q, subject })));
        setCurrentIdx(0);
        setSelectedOption(null);
        setShowExplanation(false);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setIsLoading(false);
  };

  // Fetch questions on mount and when subject/topic changes
  useEffect(() => {
    fetchQuestions();
  }, [subject, topic]);

  // Update topic when subject changes
  useEffect(() => {
    setTopic(subjectTopics[subject][0]);
  }, [subject]);

  // Scroll to AI tutor when answer is selected
  useEffect(() => {
    if (showExplanation && aiTutorRef.current) {
      setTimeout(() => {
        aiTutorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [showExplanation]);

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setChatMessages([]);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setChatMessages([]);
    }
  };

  const handleAiChat = async (customMessage?: string) => {
    const messageToSend = customMessage || aiChat.trim();
    if (!messageToSend || isChatLoading || !questions[currentIdx]) return;
    
    const userMsg = messageToSend;
    setAiChat("");
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsChatLoading(true);
    
    const prompt = `You are a helpful AI tutor for Nigerian secondary school students preparing for WAEC/JAMB.
    
Subject: ${subject}
Current Question: "${questions[currentIdx].text}"
Options: ${questions[currentIdx].options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join(", ")}
Correct Answer: ${questions[currentIdx].correct}
Explanation: ${questions[currentIdx].explanation}

Previous conversation:
${chatMessages.map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`).join("\n")}

Student's question: ${userMsg}

Please provide a clear, helpful response that:
1. Directly addresses the student's question
2. Uses simple language suitable for secondary school students
3. Provides examples where helpful
4. Encourages further learning`;
    
    try {
      const response = await generateContent(prompt);
      setChatMessages(prev => [...prev, { role: "ai", content: response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: "ai", content: "Sorry, I couldn't process that. Please try again." }]);
    }
    setIsChatLoading(false);
  };

  const handleExplainMore = () => {
    handleAiChat("Can you explain this answer in more detail? I want to understand it better.");
  };

  const currentQuestion = questions[currentIdx];

  return (
    <DashboardLayout 
      navItems={studentNavItems} 
      userType="Student"
    >
      <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-160px)] pr-2 font-[Times_New_Roman]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-indigo-500/30">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Past Questions AI</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Practice with AI-generated questions</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-slate-200"
            >
              <option>Mathematics</option>
              <option>English</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
            </select>
            <select 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-slate-200"
            >
              {subjectTopics[subject]?.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <Button 
              size="sm" 
              onClick={fetchQuestions} 
              disabled={isLoading}
              className="rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span className="ml-2 hidden sm:inline">New Questions</span>
            </Button>
          </div>
        </div>

        {/* Question Progress */}
        {!isLoading && questions.length > 0 && (
          <div className="flex items-center gap-2">
            {questions.map((_, i) => (
              <div 
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i === currentIdx 
                    ? 'bg-primary' 
                    : i < currentIdx 
                      ? 'bg-emerald-500' 
                      : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        )}

        {/* Question Card */}
        {isLoading ? (
          <Card className="rounded-3xl border-none shadow-lg p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">AI is generating your questions...</p>
            </div>
          </Card>
        ) : questions.length > 0 ? (
          <Card className="rounded-3xl border-none shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
              <div className="flex items-center justify-between text-white">
                <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-lg text-sm font-semibold">
                  {currentQuestion.subject} - {topic}
                </span>
                <span className="text-sm font-bold">
                  Question {currentIdx + 1} of {questions.length}
                </span>
              </div>
            </div>
            
            <CardContent className="p-8">
              <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-8">
                {currentQuestion.text}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, i) => {
                  const optionLetter = String.fromCharCode(65 + i);
                  const isCorrect = optionLetter === currentQuestion.correct || option === currentQuestion.correct;
                  const isSelected = option === selectedOption;
                  
                  let bgColor = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200";
                  if (selectedOption) {
                    if (isCorrect) bgColor = "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 text-emerald-800 dark:text-emerald-200";
                    else if (isSelected) bgColor = "bg-rose-50 dark:bg-rose-900/30 border-rose-400 text-rose-800 dark:text-rose-200";
                  }

                  return (
                    <button
                      key={i}
                      disabled={!!selectedOption}
                      onClick={() => {
                        setSelectedOption(option);
                        setShowExplanation(true);
                      }}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${bgColor} ${!selectedOption && 'hover:border-primary hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:shadow-md'}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                          selectedOption 
                            ? isCorrect 
                              ? 'bg-emerald-500 text-white' 
                              : isSelected 
                                ? 'bg-rose-500 text-white' 
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-white'
                        }`}>
                          {optionLetter}
                        </span>
                        <span className="font-medium text-base">{option}</span>
                      </div>
                      {selectedOption && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                      {selectedOption && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between mt-10">
                <Button 
                  variant="outline" 
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  className="rounded-xl font-bold"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={currentIdx === questions.length - 1}
                  className="bg-primary text-white hover:bg-primary/90 rounded-xl font-bold px-8"
                >
                  Next Question <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-3xl border-none shadow-lg p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <XCircle className="w-12 h-12 text-rose-500" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Failed to generate questions. Please try again.</p>
              <Button onClick={fetchQuestions}>Retry</Button>
            </div>
          </Card>
        )}

        {/* AI Tutor Section - Below Questions */}
        {showExplanation && currentQuestion && (
          <div ref={aiTutorRef} className="scroll-mt-8">
            <Card className="rounded-3xl border-none shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
              <div className="p-6 bg-slate-800/50 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <BrainCircuit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">AI Tutor</h4>
                    <p className="text-xs text-emerald-400 font-semibold">Ready to help you understand</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Explanation */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-emerald-400 font-bold text-sm mb-1">Correct Answer: {currentQuestion.correct}</p>
                      <p className="text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </div>

                {/* Follow-up prompt */}
                <div className="bg-indigo-500/20 rounded-2xl p-6 border border-indigo-500/30">
                  <p className="text-indigo-200 font-medium mb-4">{currentQuestion.followUp}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={handleExplainMore}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Explain More
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl"
                      onClick={() => setChatMessages([])}
                    >
                      Clear Chat
                    </Button>
                  </div>
                </div>

                {/* Chat Messages */}
                {chatMessages.length > 0 && (
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-slate-700 text-slate-200 rounded-tl-none border border-slate-600'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-700 p-4 rounded-2xl rounded-tl-none border border-slate-600">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Chat Input */}
                <div className="relative">
                  <input 
                    type="text" 
                    value={aiChat}
                    onChange={(e) => setAiChat(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAiChat()}
                    placeholder="Ask me anything about this question..." 
                    className="w-full bg-slate-800 border border-slate-600 rounded-2xl py-4 px-5 pr-14 text-sm text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none"
                  />
                  <button 
                    onClick={() => handleAiChat()}
                    disabled={isChatLoading || !aiChat.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-xl text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isChatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentPastQuestions;
