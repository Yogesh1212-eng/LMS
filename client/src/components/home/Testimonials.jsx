import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "MERN Developer",
    review:
      "The MERN course completely changed my coding skills. The projects were amazing and interview-focused.",
  },
  {
    name: "Priya Singh",
    role: "AI Engineer",
    review:
      "The AI roadmap was well structured. I landed my internship after completing the projects.",
  },
  {
    name: "Aman Verma",
    role: "Cloud Engineer",
    review:
      "Best learning platform! The mentors explained every concept clearly with real-world examples.",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#111827] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-white">
          What Our Students Say
        </h2>

        <p className="text-slate-400 text-center mt-4 mb-14">
          Trusted by thousands of learners.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500 transition-all duration-300"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-slate-300 leading-7">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h3 className="text-white font-semibold">
                  {item.name}
                </h3>

                <p className="text-slate-400 text-sm">
                  {item.role}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;