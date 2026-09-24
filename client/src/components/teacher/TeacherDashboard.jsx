import { useEffect, useState } from "react";
import StatsSection from "../../components/teacher/StatsSection";
import RecentCourses from "../../components/teacher/RecentCourses";
import { getTeacherDashboard } from "../../services/dashboardService";

function TeacherDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getTeacherDashboard();
      setDashboard(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (!dashboard) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-slate-400 text-base">
        Loading Teacher Dashboard...
      </div>
    );
  }

  return (
    <section className="w-full text-slate-100">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Teacher Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your courses, view live student count and metrics.
        </p>
      </div>

      <div className="mt-8">
        <StatsSection dashboard={dashboard} />
      </div>

      <div className="mt-10">
        <RecentCourses courses={dashboard.recentCourses || []} />
      </div>
    </section>
  );
}

export default TeacherDashboard;