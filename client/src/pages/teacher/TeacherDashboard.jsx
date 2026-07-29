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
      <div className="min-h-screen bg-[#0B1120] flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0B1120] p-8">

      <h1 className="text-4xl font-bold text-white">
        Teacher Dashboard
      </h1>

      <p className="text-slate-400 mt-2">
        Manage your courses and students.
      </p>

      <div className="mt-10">
        <StatsSection dashboard={dashboard} />
      </div>

      <RecentCourses courses={dashboard.recentCourses} />

    </section>
  );
}

export default TeacherDashboard;