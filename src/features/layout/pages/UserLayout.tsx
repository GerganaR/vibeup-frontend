import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { fetchCategories } from "@/features/event/store/categoryThunk";

const UserLayout = () => {
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
