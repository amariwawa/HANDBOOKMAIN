import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import StudentSuite from "./pages/StudentSuite";
import TeacherSuite from "./pages/TeacherSuite";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminPayments from "./pages/AdminPayments";
import AdminQuestions from "./pages/AdminQuestions";
import AdminCalendars from "./pages/AdminCalendars";
import AdminDatabase from "./pages/AdminDatabase";
import StudentPastQuestions from "./pages/StudentPastQuestions";
import AllCategories from "./pages/AllCategories";
import Donate from "./pages/Donate";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StudentSubjects from "./pages/StudentSubjects";
import SubjectPage from "./pages/SubjectPage";
import ClassAI from "./pages/ClassAI";
import StudentGames from "./pages/StudentGames";
import StudentInbox from "./pages/StudentInbox";
import TeacherStudents from "./pages/TeacherStudents";
import TeacherChat from "./pages/TeacherChat";
import TeacherNotes from "./pages/TeacherNotes";
import TeacherExams from "./pages/TeacherExams";
import TeacherResearch from "./pages/TeacherResearch";
import StudentFriends from "./pages/StudentFriends";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student-suite" element={<StudentSuite />} />
          <Route path="/student-suite/past-questions" element={<StudentPastQuestions />} />
          <Route path="/student-suite/subjects" element={<StudentSubjects />} />
          <Route path="/student-suite/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/student-suite/class" element={<ClassAI />} />
          <Route path="/student-suite/games" element={<StudentGames />} />
          <Route path="/student-suite/inbox" element={<StudentInbox />} />
          <Route path="/student-suite/friends" element={<StudentFriends />} />
          
          <Route path="/all-categories" element={<AllCategories />} />
          
          <Route path="/teacher-suite" element={<TeacherSuite />} />
          <Route path="/teacher-suite/students" element={<TeacherStudents />} />
          <Route path="/teacher-suite/chat" element={<TeacherChat />} />
          <Route path="/teacher-suite/notes" element={<TeacherNotes />} />
          <Route path="/teacher-suite/exams" element={<TeacherExams />} />
          <Route path="/teacher-suite/research" element={<TeacherResearch />} />
          
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/questions" element={<AdminQuestions />} />
          <Route path="/admin/calendars" element={<AdminCalendars />} />
          <Route path="/admin/database" element={<AdminDatabase />} />

          <Route path="/donate" element={<Donate />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* Redirect all unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
