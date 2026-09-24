import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import TeacherSidebar from "../components/teacher/TeacherSidebar";

function TeacherLayout() {
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 relative selection:bg-purple-600/30 selection:text-purple-200">
      {/* Background Soft Glows for Instructor Workspace */}
      <div className="fixed top-24 left-72 w-[500px] h-[350px] bg-blue-950/20 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-[400px] h-[400px] bg-amber-950/15 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <Navbar />

      {/* Workspace Flex Area */}
      <div className="flex pt-20 relative z-10 min-h-[calc(100vh-5rem)]">
        {/* Sidebar Container (Hidden on mobile or handled inside sidebar) */}
        <div className="hidden lg:block shrink-0">
          <TeacherSidebar />
        </div>

        {/* Dynamic Studio Dashboard Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherLayout;