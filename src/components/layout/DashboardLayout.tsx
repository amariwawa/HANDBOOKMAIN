import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  LogOut,
  Search,
  Bell,
  Sparkles,
  UserPlus,
  Menu,
  ChevronLeft,
  Home
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  userType: "Admin" | "Student" | "Teacher";
  friends?: Array<{ name: string; status: string; avatar?: string }>;
}

export const DashboardLayout = ({
  children,
  navItems,
  userType,
  friends = []
}: DashboardLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative h-screen bg-[#F8F9FB] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-30 flex flex-col whitespace-nowrap overflow-hidden"
          >
            <div className="p-6 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-xl font-bold tracking-tight">
                  HAND<span className="italic text-primary">BOOK</span>
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 custom-scrollbar">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
                  Overview
                </p>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary"
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:text-primary"}`} />
                        <span className="font-medium text-sm">{item.name}</span>
                      </Link>
                    );
                  })}
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all group"
                  >
                    <Home className="w-5 h-5 group-hover:text-primary" />
                    <span className="font-medium text-sm">Back to Home</span>
                  </Link>
                </nav>
              </div>

              {userType !== "Admin" && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2 flex justify-between items-center">
                    Friends
                    <button className="text-primary hover:text-primary/80">
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </p>
                  <div className="space-y-3">
                    {friends.length > 0 ? (
                      friends.map((friend, i) => (
                        <div key={i} className="flex items-center gap-3 px-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{friend.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{friend.status}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 px-2 italic">No friends yet</p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
                  Settings
                </p>
                <nav className="space-y-1">
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium text-sm">Setting</span>
                  </Link>
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className={`flex flex-col h-screen overflow-hidden bg-[#F8F9FB] dark:bg-slate-950 ${isSidebarOpen ? "lg:pl-64" : "lg:pl-0"}`}>
        {/* Header */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 transition-all">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
               <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                 <Menu className="w-6 h-6" />
               </Button>
            )}
            <div className="w-96 relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search your course...." 
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {userType === "Admin" ? "Admin User" : "Saint Stream"}
                </p>
                <p className="text-xs text-slate-400">{userType}</p>
              </div>
              <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800 shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
