import DashboardCard from "./DashboardCard";

function StatsSection({ dashboard }) {
  return (
    <div className="grid md:grid-cols-4 gap-6">

      <DashboardCard
        title="Courses"
        value={dashboard.totalCourses}
        color="bg-indigo-600"
      />

      <DashboardCard
        title="Students"
        value={dashboard.totalStudents}
        color="bg-cyan-600"
      />

      <DashboardCard
        title="Lectures"
        value={dashboard.totalLectures}
        color="bg-emerald-600"
      />

      <DashboardCard
        title="Revenue"
        value={`₹${dashboard.totalRevenue}`}
        color="bg-orange-500"
      />

    </div>
  );
}

export default StatsSection;