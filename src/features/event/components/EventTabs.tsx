import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { FaMap, FaThLarge } from "react-icons/fa";

interface Props {
  mode: "grid" | "map";
  onChange: (mode: "grid" | "map") => void;
}

export function EventsTabs({ mode, onChange }: Props) {
  return (
    <Tabs value={mode} className="w-auto">
      <TabsHeader className="bg-white shadow-sm rounded-xl">
        <Tab
          value="grid"
          onClick={() => onChange("grid")}
          className="flex items-center gap-2 w-36"
        >
          <FaThLarge className="w-4 h-4" />
          Grid
        </Tab>

        <Tab
          value="map"
          onClick={() => onChange("map")}
          className="flex items-center gap-2 w-36"
        >
          <FaMap className="w-4 h-4" />
          Map
        </Tab>
      </TabsHeader>
    </Tabs>
  );
}
