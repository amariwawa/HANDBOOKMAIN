import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentSuite from "./pages/StudentSuite";
import TeacherSuite from "./pages/TeacherSuite";
import Admin from "./pages/Admin";
import StudentPastQuestions from "./pages/StudentPastQuestions";
import AllCategories from "./pages/AllCategories";
import Donate from "./pages/Donate";
import StudentSubjects from "./pages/StudentSubjects";
import ClassAI from "./pages/ClassAI";
import StudentGames from "./pages/StudentGames";
import StudentInbox from "./pages/StudentInbox";
import TeacherStudents from "./pages/TeacherStudents";
import TeacherChat from "./pages/TeacherChat";
import TeacherNotes from "./pages/TeacherNotes";
import TeacherExams from "./pages/TeacherExams";
import TeacherResearch from "./pages/TeacherResearch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student-suite" element={<StudentSuite />} />
          <Route path="/student-suite/past-questions" element={<StudentPastQuestions />} />
          <Route path="/student-suite/subjects" element={<StudentSubjects />} />
          <Route path="/student-suite/class" element={<ClassAI />} />
          <Route path="/student-suite/games" element={<StudentGames />} />
          <Route path="/student-suite/inbox" element={<StudentInbox />} />
          
          <Route path="/all-categories" element={<AllCategories />} />
          
          <Route path="/teacher-suite" element={<TeacherSuite />} />
          <Route path="/teacher-suite/students" element={<TeacherStudents />} />
          <Route path="/teacher-suite/chat" element={<TeacherChat />} />
          <Route path="/teacher-suite/notes" element={<TeacherNotes />} />
          <Route path="/teacher-suite/exams" element={<TeacherExams />} />
          <Route path="/teacher-suite/research" element={<TeacherResearch />} />
          
          <Route path="/admin" element={<Admin />} />
          <Route path="/donate" element={<Donate />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
