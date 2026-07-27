import {
  GraduationCap,
  Users,
  BadgeCheck,
  Infinity,
  Briefcase,
  Laptop,
} from "lucide-react";

const features = [
  {
    icon: <GraduationCap size={40} />,
    title: "Expert Mentors",
    desc: "Learn from experienced industry professionals.",
  },
  {
    icon: <Laptop size={40} />,
    title: "Live + Recorded",
    desc: "Attend live classes or learn anytime with recordings.",
  },
  {
    icon: <Infinity size={40} />,
    title: "Lifetime Access",
    desc: "One purchase, unlimited learning forever.",
  },
  {
    icon: <BadgeCheck size={40} />,
    title: "Certificates",
    desc: "Get verified certificates after course completion.",
  },
  {
    icon: <Briefcase size={40} />,
    title: "Placement Support",
    desc: "Resume review, interview prep & career guidance.",
  },
  {
    icon: <Users size={40} />,
    title: "Community",
    desc: "Connect with thousands of learners and mentors.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-[#111827] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-white">
          Why Choose LMS?
        </h2>

        <p className="text-slate-400 text-center mt-4 mb-14">
          Everything you need to become job-ready.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-8 hover:border-indigo-500 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-indigo-400 mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-3">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;