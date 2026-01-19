import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/hooks";
import { Button, Typography } from "@material-tailwind/react";
import {
  HomeIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { RiArrowLeftSLine, RiLogoutBoxLine } from "react-icons/ri";
import Avatar from "@/components/Avatar";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useSidebar } from "../hooks/useSidebar";
import { SideNavItem, type MenuItem } from "./SidebarItem";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { twMerge } from "tailwind-merge";
import { ROUTES } from "@/routes";

const Sidenav: React.FC = () => {
  const { collapsed, toggleSidebar } = useSidebar();
  const open = !collapsed;
  const { t } = useTranslation();

  const user = useAppSelector((state) => state.user.user);
  const { logout } = useAuth();

  const menus: MenuItem[] = [
    { title: "Home", icon: HomeIcon, to: ROUTES.HOME },
    { title: "Events", icon: CalendarIcon, to: ROUTES.EVENTS },
    { title: "Settings", icon: Cog6ToothIcon, to: ROUTES.SETTINGS },
  ];

  const initials =
    user?.profile?.name
      ?.split(" ")
      .map((w) => w[0]?.toUpperCase())
      .join("") || "U";

  return (
    <aside className="h-[100dvh] overflow-hidden">
      <div className="flex h-full bg-slate-50">
        <motion.div
          initial={{
            width: open
              ? "var(--sidebar-max-width)"
              : "var(--sidebar-min-width)",
          }}
          animate={{
            width: open
              ? "var(--sidebar-max-width)"
              : "var(--sidebar-min-width)",
          }}
          transition={{ duration: 0.3, type: "spring", damping: 15 }}
          className="h-full p-2 pt-8 w-full relative shadow-xl flex flex-col justify-between items-center bg-white rounded-tr-2xl rounded-br-2xl overflow-hidden border border-slate-200/50"
        >
          {/* Header */}
          <div>
            <div className="flex justify-between items-center">
              {open && (
                <Typography variant="h6" className="text-green-700">
                  VIBE UP
                </Typography>
              )}

              {/* Toggle Button */}
              <motion.div
                animate={{
                  x: open ? 0 : "-50%",
                  rotate: open ? 0 : 180,
                }}
                transition={{
                  x: { duration: 0.08 },
                  rotate: { duration: 0.1 },
                }}
                className="
                  absolute cursor-pointer w-8 h-8 flex items-center justify-center
                  rounded-full bg-slate-50 hover:bg-green-50
                  border border-slate-200 hover:border-green-300
                  shadow-sm hover:shadow-md
                "
                style={{
                  top: "26px",
                  right: open ? "15px" : "auto",
                  left: open ? "auto" : "50%",
                }}
                onClick={toggleSidebar}
              >
                <RiArrowLeftSLine className="w-5 h-5 text-slate-600 hover:text-green-700 transition-colors" />
              </motion.div>
            </div>

            {/* USER SECTION — moved higher */}
            <div className="flex flex-col items-center mt-[100px] mb-8">
              <Avatar
                name={user?.profile?.name || "User"}
                src={user?.profile?.avatarUrl}
                size={open ? 90 : 32}
                className="mb-2"
              />

              {!open ? (
                <Typography variant="h6" className="text-slate-800">
                  {initials}
                </Typography>
              ) : (
                <>
                  <Typography variant="h6" className="text-slate-800 truncate">
                    {user?.profile?.name || "User"}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-slate-600 truncate"
                  >
                    {user?.profile?.email || "user@example.com"}
                  </Typography>
                </>
              )}
            </div>

            <div className="border-b border-slate-200" />
          </div>

          {/* Menu Items */}
          <div className={twMerge("flex-grow mt-5 w-full", !open && "ml-2")}>
            <ul className="pt-6 w-full flex flex-col items-center">
              {menus.map((Menu, index) => (
                <SideNavItem
                  data-testid={`side-nav-button-${index}`}
                  key={Menu.title}
                  item={Menu}
                  open={open}
                />
              ))}
            </ul>
          </div>

          {/* Language Switch */}
          <div className="flex justify-center w-full mb-3">
            <LanguageSwitch compact={!open} flagsOnly />
          </div>

          {/* Logout */}
          <div className="flex justify-center w-[70%] mb-4">
            {open ? (
              <Button
                onClick={logout}
                variant="outlined"
                className="bg-transparent text-slate-800 border-slate-300 font-medium px-4 py-2 rounded-lg w-full normal-case text-sm hover:bg-green-50 hover:border-green-300 transition"
              >
                {t("Logout")}
              </Button>
            ) : (
              <RiLogoutBoxLine
                onClick={logout}
                className="w-[22px] h-[22px] mb-2 text-slate-600 hover:text-slate-800 cursor-pointer"
              />
            )}
          </div>
        </motion.div>
      </div>
    </aside>
  );
};

export default Sidenav;
