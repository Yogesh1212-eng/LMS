import { BookOpen, Users, Award, Star } from "lucide-react";

function Stats() {
  const stats = [
    {
      icon: <BookOpen size={32} />,
      value: "50+",
      title: "Expert Courses",
      desc: "Industry-ready content",
    },
    {
      icon: <Users size={32} />,
      value: "2K+",
      title: "Students",
      desc: "Active learners",
    },
    {
      icon: <Award size={32} />,
      value: "200+",
      title: "Certificates",
      desc: "Successfully Issued",
    },
    {
      icon: <Star size={32} />,
      value: "4.9",
      title: "Average Rating",
      desc: "Student Reviews",
    },
  ];

  return (
    <section className="bg-[#0B1120] py-16">
      <div className="max-w-7xl mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="text-indigo-400 mb-4">{item.icon}</div>

            <h2 className="text-4xl font-bold text-white">
              {item.value}
            </h2>

            <h3 className="text-xl font-semibold mt-3 text-white">
              {item.title}
            </h3>

            <p className="text-slate-400 mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;