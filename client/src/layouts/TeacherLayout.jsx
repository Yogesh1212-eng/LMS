import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import TeacherSidebar from "../components/teacher/TeacherSidebar";

function TeacherLayout() {
  return (
    <div className="min-h-screen bg-[#0B1120]">

      <Navbar />

      <div className="flex pt-20">

        <TeacherSidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default TeacherLayout;
