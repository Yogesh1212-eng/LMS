function DashboardCard({ title, value, color }) {
  return (
    <div
      className={`rounded-2xl p-6 ${color} shadow-lg hover:scale-105 transition`}
    >
      <h3 className="text-slate-300 text-sm">{title}</h3>

      <h2 className="text-4xl font-bold text-white mt-3">
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;