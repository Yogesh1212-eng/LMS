import {
  BookOpen,
  Trophy,
  Clock3,
  BarChart3,
} from "lucide-react";

const cards = [
  {
    title: "Enrolled Courses",
    value: "05",
    icon: <BookOpen size={35} />,
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Certificates",
    value: "02",
    icon: <Trophy size={35} />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Hours Learned",
    value: "48",
    icon: <Clock3 size={35} />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Progress",
    value: "78%",
    icon: <BarChart3 size={35} />,
    color: "from-pink-500 to-purple-500",
  },
];

function DashboardHome() {
  return (
    <div>

      <h1 className="text-4xl font-bold text-white">
        Student Dashboard
      </h1>

      <p className="text-slate-400 mt-2">
        Welcome back! Here's your learning overview.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-400 transition"
          >

            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}
            >
              {card.icon}
            </div>

            <h2 className="text-3xl font-bold mt-6 text-white">
              {card.value}
            </h2>

            <p className="text-slate-400 mt-2">
              {card.title}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default DashboardHome;