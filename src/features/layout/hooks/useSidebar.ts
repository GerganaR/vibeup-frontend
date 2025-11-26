import { useState, useEffect } from "react";

const SIDEBAR_STORAGE_KEY = "sidebar-collapsed";

export const useSidebar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  const toggleSidebar = () => setCollapsed((prev: boolean) => !prev);

  return { collapsed, toggleSidebar };
};
