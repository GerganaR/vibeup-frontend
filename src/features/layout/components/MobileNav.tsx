import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  CalendarIcon as CalendarIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/react/24/solid";
import { ROUTES } from "@/routes";
import { useTranslation } from "react-i18next";

export function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    {
      label: "Home",
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
      path: ROUTES.HOME,
    },
    {
      label: "Events",
      icon: CalendarIcon,
      activeIcon: CalendarIconSolid,
      path: ROUTES.EVENTS,
    },
    {
      label: "Settings",
      icon: Cog6ToothIcon,
      activeIcon: Cog6ToothIconSolid,
      path: ROUTES.SETTINGS,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 px-6 py-3 md:hidden z-[1000] pb-safe">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 min-w-[64px]"
            >
              <div
                className={`
                  p-1.5 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-teal-50 text-teal-600"
                      : "text-slate-400 hover:text-slate-600"
                  }
                `}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span
                className={`
                  text-[10px] font-medium transition-colors
                  ${isActive ? "text-teal-600" : "text-slate-400"}
                `}
              >
                {t(item.label)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
