import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { MapIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface Props {
  mode: "grid" | "map";
  onChange: (mode: "grid" | "map") => void;
}

export function EventsTabs({ mode, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <Tabs value={mode} className="w-auto sm:hidden md:block">
      <TabsHeader
        className="bg-slate-100 p-1 rounded-xl"
        indicatorProps={{
          className: "bg-white shadow-md rounded-lg",
        }}
      >
        <Tab
          value="grid"
          onClick={() => onChange("grid")}
          className={`px-4 py-3 text-sm font-medium transition-colors w-[140px] ${
            mode === "grid" ? "text-slate-800" : "text-slate-500"
          }`}
        >
          <span className="flex items-center justify-center gap-2 h-full">
            <Squares2X2Icon className="w-4 h-4" />
            {t("Grid")}
          </span>
        </Tab>

        <Tab
          value="map"
          onClick={() => onChange("map")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors w-[140px] ${
            mode === "map" ? "text-slate-800" : "text-slate-500"
          }`}
        >
          <span className="flex items-center justify-center gap-2 h-full">
            <MapIcon className="w-4 h-4" />
            {t("Map")}
          </span>
        </Tab>
      </TabsHeader>
    </Tabs>
  );
}
