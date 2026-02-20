import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { generateContent } from "@/lib/gemini";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BrainCircuit, 
  CheckSquare, 
  Sparkles,
  Wand2,
  Loader2,
  Copy,
  Download,
  RefreshCw,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";

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

const TeacherNotes = () => {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("General");
  const [level, setLevel] = useState("SS1-SS3");
  const [generatedNotes, setGeneratedNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    
    const prompt = `Generate comprehensive teaching notes for Nigerian secondary school students (${level}) on the following topic:

Subject: ${subject}
Topic: ${topic}

Please structure the notes with:
1. **Learning Objectives** - What students should know after this lesson
2. **Introduction** - A brief engaging introduction to the topic
3. **Main Content** - Detailed explanation with examples relevant to Nigerian context
4. **Key Definitions** - Important terms and their meanings
5. **Worked Examples** - Step-by-step problem solutions if applicable
6. **Summary Points** - Bullet points of key takeaways
7. **Practice Questions** - 3-5 questions for students to try
8. **Teacher's Notes** - Tips for effective delivery

Make the content suitable for WAEC/JAMB preparation and use examples that Nigerian students can relate to.`;

    try {
      const notes = await generateContent(prompt);
      setGeneratedNotes(notes);
    } catch (error) {
      toast.error("Failed to generate notes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedNotes);
    toast.success("Notes copied to clipboard");
  };

  const handleDownload = () => {
    const blob = new Blob([generatedNotes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, "_")}_notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Notes downloaded");
  };

  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-primary rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">AI Note Generator</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="bg-card p-6 rounded-2xl border shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Configure Notes
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-1 block">Subject</label>
                    <select 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option>Mathematics</option>
                      <option>English</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>Economics</option>
                      <option>Government</option>
                      <option>Literature</option>
                      <option>Geography</option>
                      <option>General</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-1 block">Level</label>
                    <select 
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option>JS1-JS3</option>
                      <option>SS1-SS3</option>
                      <option>WAEC Prep</option>
                      <option>JAMB Prep</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Topic / Content</label>
                  <Textarea 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic or paste curriculum content...&#10;&#10;Example: Quadratic Equations - solving by factorization, completing the square, and formula method" 
                    className="min-h-[180px] rounded-xl"
                  />
                </div>

                <Button 
                  className="w-full rounded-xl h-12"
                  onClick={handleGenerate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Notes...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Notes
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Quick Topics */}
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-sm font-medium text-slate-600 mb-3">Quick Topics</p>
              <div className="flex flex-wrap gap-2">
                {["Photosynthesis", "Quadratic Equations", "Parts of Speech", "Newton's Laws", "Chemical Bonding"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className="px-3 py-1.5 bg-white rounded-lg text-sm text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors border"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-card rounded-2xl border shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
              <span className="font-medium text-sm text-slate-600">Generated Notes</span>
              {generatedNotes && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setGeneratedNotes("")}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-1 p-6 overflow-y-auto min-h-[400px]">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-slate-500 animate-pulse">AI is generating your notes...</p>
                </div>
              ) : generatedNotes ? (
                <div className="prose prose-slate prose-sm max-w-none whitespace-pre-wrap">
                  {generatedNotes}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                  <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                  <p>Generated notes will appear here...</p>
                  <p className="text-xs mt-2">Enter a topic and click Generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherNotes;
