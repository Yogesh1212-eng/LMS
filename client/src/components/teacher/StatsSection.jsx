import React from "react";
import DashboardCard from "./DashboardCard";

function StatsSection({ dashboard = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
      <DashboardCard
        title="Courses"
        value={dashboard.totalCourses ?? 0}
        color="bg-indigo-600"
      />

      <DashboardCard
        title="Students"
        value={dashboard.totalStudents ?? 0}
        color="bg-cyan-600"
      />

      <DashboardCard
        title="Lectures"
        value={dashboard.totalLectures ?? 0}
        color="bg-emerald-600"
      />

      <DashboardCard
        title="Revenue"
        value={`₹${dashboard.totalRevenue ?? 0}`}
        color="bg-orange-500"
      />
    </div>
  );
}

export default StatsSection;