import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-slate-50 overflow-auto w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
