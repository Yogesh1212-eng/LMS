import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">

      <Navbar />

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;
