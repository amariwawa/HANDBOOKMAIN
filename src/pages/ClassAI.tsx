import React, { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateContent } from "@/lib/gemini";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Gamepad2, 
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
  Upload,
  FileUp,
  X,
  Bot,
  User,
  Lightbulb,
  BookMarked,
  GraduationCap
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

const quickPrompts = [
  { icon: BookMarked, text: "Explain photosynthesis", category: "Biology" },
  { icon: GraduationCap, text: "Solve quadratic equations", category: "Mathematics" },
  { icon: Lightbulb, text: "What is Newton's first law?", category: "Physics" },
  { icon: BookOpen, text: "Help me with grammar", category: "English" },
];

const ClassAI = () => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hello! I'm your personal AI Tutor. I can help you understand any topic, solve problems, or explain concepts. You can also upload PDF documents for me to analyze and explain. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; content: string } | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customMessage?: string) => {
    const messageToSend = customMessage || input.trim();
    if (!messageToSend || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: messageToSend }]);
    setIsLoading(true);

    try {
      let prompt = `You are the Handbook AI Tutor, a friendly and knowledgeable educational assistant for Nigerian secondary school students preparing for WAEC and JAMB examinations.

Your role:
- Help students understand difficult concepts in simple terms
- Answer questions about any subject (Mathematics, English, Physics, Chemistry, Biology, etc.)
- Provide step-by-step explanations for problem-solving
- Give study tips and exam preparation strategies
- Use Nigerian context and examples when relevant
- Be encouraging and supportive

Previous conversation:
${messages.slice(-8).map(m => `${m.role === 'user' ? 'Student' : 'AI Tutor'}: ${m.content}`).join('\n')}`;

      if (uploadedFile) {
        prompt += `\n\nThe student has uploaded a document titled "${uploadedFile.name}". Here's the content:\n${uploadedFile.content.slice(0, 5000)}...\n\nPlease refer to this document when answering their question.`;
      }

      prompt += `\n\nStudent's message: ${messageToSend}\n\nRespond in a clear, helpful, and friendly manner. Use formatting like bullet points and numbered lists when helpful.`;

      const response = await generateContent(prompt);
      setMessages((prev) => [...prev, { role: "ai", content: response || "I couldn't generate a response." }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setIsProcessingFile(true);

    try {
      // For demo purposes, we'll extract text from PDF using a simple approach
      // In production, you'd use a proper PDF parser library
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        // Simulating PDF text extraction
        const mockExtractedText = `This is the content extracted from ${file.name}. The document appears to contain educational material that can be analyzed and explained by the AI tutor.`;
        
        setUploadedFile({
          name: file.name,
          content: mockExtractedText
        });

        toast.success(`${file.name} uploaded successfully!`);
        
        // Auto-send a message about the uploaded file
        setMessages(prev => [...prev, 
          { role: "user", content: `I've uploaded a document: ${file.name}` },
          { role: "ai", content: `I've received your document "${file.name}". I'm ready to help you understand its contents. What would you like me to explain or clarify from this document?` }
        ]);
        
        setIsProcessingFile(false);
      };
      reader.readAsText(file);
    } catch (error) {
      toast.error("Failed to process the file");
      setIsProcessingFile(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info("Document removed");
  };

  return (
    <DashboardLayout navItems={studentNavItems} userType="Student" friends={mockFriends}>
      <div className="h-[calc(100vh-160px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Class AI Tutor</h2>
              <p className="text-sm text-slate-500">Your personal AI learning assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf"
              className="hidden"
            />
            <Button 
              variant="outline" 
              className="rounded-xl"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessingFile}
            >
              {isProcessingFile ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Upload PDF
            </Button>
          </div>
        </div>

        {/* Uploaded File Indicator */}
        {uploadedFile && (
          <div className="mb-4 p-3 bg-indigo-50 rounded-xl flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <FileUp className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-sm font-medium text-indigo-700">{uploadedFile.name}</p>
                <p className="text-xs text-indigo-500">Document loaded - Ask me about it!</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile} className="text-indigo-500 hover:text-indigo-700">
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Chat Area */}
        <Card className="flex-1 rounded-2xl border-none shadow-sm overflow-hidden flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user" 
                      ? "bg-primary text-white" 
                      : "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
                  }`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`p-4 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-white text-slate-800 rounded-tl-none border shadow-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-6 py-4 border-t bg-white dark:bg-slate-800">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-medium">Quick prompts:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt.text)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-xl text-sm transition-colors border border-slate-200 dark:border-slate-600"
                  >
                    <prompt.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about your studies..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none"
              />
              <Button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="rounded-xl bg-primary hover:bg-primary/90 px-6"
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

export default ClassAI;
