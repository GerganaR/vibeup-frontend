import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { fetchCategories } from "@/features/event/store/categoryThunk";
import { MobileNav } from "../components/MobileNav";

const UserLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>
      <main className="flex-1 p-4 pb-32 md:p-6 overflow-auto w-full h-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 relative">
        {/* Subtle decorative elements for depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 h-full">
          <Outlet />
        </div>
        <MobileNav />
      </main>
    </div>
  );
};

export default UserLayout;
