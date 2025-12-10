import { Typography } from "@material-tailwind/react";
import { FaMap } from "react-icons/fa";

export function EventMap() {
  return (
    <div className="h-[600px] flex flex-col items-center justify-center bg-gray-100 rounded-xl">
      <FaMap className="w-16 h-16 text-gray-400 mb-4" />
      <Typography variant="h6" className="text-gray-600">
        Map View Coming Soon
      </Typography>
      <Typography variant="small" className="text-gray-400 mt-1">
        Event locations will be displayed on an interactive map
      </Typography>
    </div>
  );
}
