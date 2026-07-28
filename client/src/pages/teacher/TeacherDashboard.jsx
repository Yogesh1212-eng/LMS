import StatsSection from "../../components/teacher/StatsSection";
import RecentCourses from "../../components/teacher/RecentCourses";

function TeacherDashboard() {
  return (
    <section className="min-h-screen bg-[#0B1120] p-8">

      <h1 className="text-4xl font-bold text-white">
        Teacher Dashboard
      </h1>

      <p className="text-slate-400 mt-2">
        Manage your courses and students.
      </p>

      <div className="mt-10">
        <StatsSection />
      </div>

      <RecentCourses />

    </section>
  );
}

export default TeacherDashboard;