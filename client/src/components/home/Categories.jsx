import {
  Code2,
  BrainCircuit,
  Cloud,
  Database,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

const categories = [
  {
    title: "Web Development",
    icon: <Code2 size={40} />,
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Artificial Intelligence",
    icon: <BrainCircuit size={40} />,
    color: "from-pink-500 to-purple-500",
  },
  {
    title: "Cloud Computing",
    icon: <Cloud size={40} />,
    color: "from-cyan-500 to-sky-500",
  },
  {
    title: "Database",
    icon: <Database size={40} />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Android Development",
    icon: <Smartphone size={40} />,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Cyber Security",
    icon: <ShieldCheck size={40} />,
    color: "from-yellow-500 to-amber-500",
  },
];

function Categories() {
  return (
    <section className="bg-[#0B1120] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-white">
          Explore Categories
        </h2>

        <p className="text-slate-400 text-center mt-4 mb-14">
          Choose your learning path and start building your career.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((item, index) => (
            <div
              key={index}
              className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white`}
              >
                {item.icon}
              </div>

              <h3 className="text-2xl text-white font-semibold mt-6">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-3">
                Learn industry-ready skills with hands-on projects.
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Categories;