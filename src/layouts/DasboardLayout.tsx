// DasboardLayout.tsx

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadPostCard from "../components/LoadPostCard";

function Layout() {
  return (
    <div className="flex relative bg-linear-to-tl from-[#1125] to-[#111]">
      <Navbar />
      <LoadPostCard />
      <main className="flex md:ml-17 w-screen relative">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
