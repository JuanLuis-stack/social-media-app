// DasboardLayout.tsx

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadPostCard from "../components/LoadPostCard";

function Layout() {
  return (
    <div className="flex bg-linear-to-tl from-[#111] to-[#112]">
      <Navbar />
      <LoadPostCard />
      <main className="flex ml-5 md:ml-30 w-screen relative">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
