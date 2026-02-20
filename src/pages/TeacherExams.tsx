import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateQuestions } from "@/lib/gemini";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BrainCircuit, 
  CheckSquare, 
  Sparkles,
  Plus,
  Loader2,
  FileText,
  Download,
  Trash2,
  Eye,
  X,
  Wand2
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

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
  explanation: string;
  followUp: string;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  createdAt: Date;
}

const TeacherExams = () => {
  const [showCreator, setShowCreator] = useState(false);
  const [examTitle, setExamTitle] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [exams, setExams] = useState<Exam[]>([
    { id: "1", title: "Mid-Term Mathematics", subject: "Mathematics", questions: [], createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: "2", title: "Physics Mock", subject: "Physics", questions: [], createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { id: "3", title: "Biology CA", subject: "Biology", questions: [], createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  ]);
  const [previewExam, setPreviewExam] = useState<Exam | null>(null);

  const handleGenerateQuestions = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setIsGenerating(true);
    
    try {
      const questions = await generateQuestions(subject, topic, questionCount);
      if (questions && questions.length > 0) {
        setGeneratedQuestions(questions);
        toast.success(`Generated ${questions.length} questions`);
      } else {
        toast.error("Failed to generate questions");
      }
    } catch (error) {
      toast.error("Failed to generate questions");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveExam = () => {
    if (!examTitle.trim()) {
      toast.error("Please enter an exam title");
      return;
    }
    if (generatedQuestions.length === 0) {
      toast.error("Please generate questions first");
      return;
    }

    const newExam: Exam = {
      id: Date.now().toString(),
      title: examTitle,
      subject,
      questions: generatedQuestions,
      createdAt: new Date(),
    };

    setExams([newExam, ...exams]);
    setShowCreator(false);
    setExamTitle("");
    setTopic("");
    setGeneratedQuestions([]);
    toast.success("Exam saved successfully");
  };

  const handleDeleteExam = (id: string) => {
    setExams(exams.filter(e => e.id !== id));
    toast.success("Exam deleted");
  };

  const handleDownloadExam = (exam: Exam) => {
    let content = `${exam.title}\nSubject: ${exam.subject}\nTotal Questions: ${exam.questions.length}\n\n`;
    content += "=" .repeat(50) + "\n\n";
    
    exam.questions.forEach((q, i) => {
      content += `Question ${i + 1}: ${q.text}\n\n`;
      q.options.forEach((opt, j) => {
        content += `   ${String.fromCharCode(65 + j)}. ${opt}\n`;
      });
      content += `\n   Correct Answer: ${q.correct}\n`;
      content += `   Explanation: ${q.explanation}\n\n`;
      content += "-".repeat(40) + "\n\n";
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exam.title.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exam downloaded");
  };

  return (
    <DashboardLayout navItems={teacherNavItems} userType="Teacher" friends={mockTeacherFriends}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-primary rounded-xl">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Exam Creator</h2>
          </div>
          <Button onClick={() => setShowCreator(true)} className="rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Create New Exam
          </Button>
        </div>

        {/* Exam Creator Modal */}
        {showCreator && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-xl font-bold">Create New Exam with AI</h3>
                <button onClick={() => setShowCreator(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Settings Panel */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600 mb-1 block">Exam Title</label>
                      <Input 
                        value={examTitle}
                        onChange={(e) => setExamTitle(e.target.value)}
                        placeholder="e.g., Mid-Term Mathematics Exam"
                        className="rounded-xl"
                      />
                    </div>

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
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600 mb-1 block">Questions</label>
                        <select 
                          value={questionCount}
                          onChange={(e) => setQuestionCount(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value={5}>5 Questions</option>
                          <option value={10}>10 Questions</option>
                          <option value={15}>15 Questions</option>
                          <option value={20}>20 Questions</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600 mb-1 block">Topic</label>
                      <Input 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., Algebra, Photosynthesis, Grammar"
                        className="rounded-xl"
                      />
                    </div>

                    <Button 
                      onClick={handleGenerateQuestions}
                      disabled={isGenerating}
                      className="w-full rounded-xl h-12"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating Questions...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate Questions with AI
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Preview Panel */}
                  <div className="bg-slate-50 rounded-2xl p-4 max-h-[400px] overflow-y-auto">
                    <h4 className="font-medium text-sm text-slate-600 mb-3">Generated Questions Preview</h4>
                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
                        <p className="text-sm text-slate-500 animate-pulse">AI is creating questions...</p>
                      </div>
                    ) : generatedQuestions.length > 0 ? (
                      <div className="space-y-4">
                        {generatedQuestions.map((q, i) => (
                          <div key={i} className="bg-white rounded-xl p-4 border">
                            <p className="font-medium text-sm mb-2">Q{i + 1}. {q.text}</p>
                            <div className="space-y-1">
                              {q.options.map((opt, j) => (
                                <p key={j} className={`text-xs pl-3 ${String.fromCharCode(65 + j) === q.correct || opt === q.correct ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}>
                                  {String.fromCharCode(65 + j)}. {opt}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <FileText className="w-10 h-10 mb-3 opacity-30" />
                        <p className="text-sm">Questions will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowCreator(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveExam}
                  disabled={generatedQuestions.length === 0 || !examTitle.trim()}
                  className="rounded-xl"
                >
                  Save Exam
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewExam && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{previewExam.title}</h3>
                  <p className="text-sm text-slate-500">{previewExam.subject} - {previewExam.questions.length} Questions</p>
                </div>
                <button onClick={() => setPreviewExam(null)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {previewExam.questions.length > 0 ? (
                  previewExam.questions.map((q, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-4">
                      <p className="font-medium mb-3">Q{i + 1}. {q.text}</p>
                      <div className="space-y-2 pl-4">
                        {q.options.map((opt, j) => (
                          <p key={j} className={`text-sm ${String.fromCharCode(65 + j) === q.correct || opt === q.correct ? 'text-emerald-600 font-medium' : 'text-slate-600'}`}>
                            {String.fromCharCode(65 + j)}. {opt}
                          </p>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-slate-500 italic">Explanation: {q.explanation}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-500 py-8">No questions in this exam yet</p>
                )}
              </div>

              <div className="p-6 border-t flex justify-end">
                <Button onClick={() => handleDownloadExam(previewExam)} className="rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Download Exam
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Exam List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-card p-6 rounded-2xl border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-indigo-50 rounded-xl">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                  {exam.subject}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-1">{exam.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {exam.questions.length} questions - {exam.createdAt.toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 rounded-xl"
                  onClick={() => setPreviewExam(exam)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl"
                  onClick={() => handleDownloadExam(exam)}
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                  onClick={() => handleDeleteExam(exam.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherExams;
