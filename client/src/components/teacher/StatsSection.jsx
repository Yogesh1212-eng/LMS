import DashboardCard from "./DashboardCard";

function StatsSection() {
  return (
    <div className="grid md:grid-cols-4 gap-6">

      <DashboardCard
        title="Courses"
        value="12"
        color="bg-indigo-600"
      />

      <DashboardCard
        title="Students"
        value="425"
        color="bg-cyan-600"
      />

      <DashboardCard
        title="Lectures"
        value="98"
        color="bg-emerald-600"
      />

      <DashboardCard
        title="Revenue"
        value="₹45,000"
        color="bg-orange-500"
      />

    </div>
  );
}

export default StatsSection;