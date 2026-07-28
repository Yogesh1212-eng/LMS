import { Outlet } from "react-router-dom";
import TeacherSidebar from "../components/teacher/TeacherSidebar";

function TeacherLayout() {
  return (
    <div className="flex bg-[#0B1120]">
      <TeacherSidebar />

      <main className="flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default TeacherLayout;