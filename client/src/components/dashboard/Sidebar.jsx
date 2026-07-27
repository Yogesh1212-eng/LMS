import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Courses",
      path: "/student/courses",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Profile",
      path: "/student/profile",
      icon: <User size={20} />,
    },
    {
      name: "Settings",
      path: "/student/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen flex flex-col">

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-white">
          LMS
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Student Panel
        </p>
      </div>

      <nav className="flex-1 p-4">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

      </nav>

      <div className="p-4 border-t border-slate-800">

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;