import { NavLink } from "react-router-dom";

function TeacherSidebar() {
  return (
    <aside className="w-72 bg-slate-900 min-h-screen p-6 border-r border-slate-800">

      <h1 className="text-3xl text-white font-bold">
        Teacher
      </h1>

      <div className="mt-10 flex flex-col gap-3">

        <NavLink
          to="/teacher/dashboard"
          className="text-slate-300 hover:text-white"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/teacher/courses"
          className="text-slate-300 hover:text-white"
        >
          My Courses
        </NavLink>

        <NavLink
          to="/teacher/create-course"
          className="text-slate-300 hover:text-white"
        >
          Create Course
        </NavLink>

      </div>

    </aside>
  );
}

export default TeacherSidebar;