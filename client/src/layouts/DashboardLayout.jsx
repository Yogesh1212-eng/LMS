import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0B1120]">

      <Navbar />

      <main className="pt-20 p-6">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;
