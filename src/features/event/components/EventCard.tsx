import { Card, CardBody, Typography } from "@material-tailwind/react";
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";
import type { EventModel } from "../types";
import { EventCoverPlaceholder } from "./EventCover";

interface Props {
  event: EventModel;
}

export function EventCard({ event }: Props) {
  const date = new Date(event.startDateTime);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const mainCategory = event.categories?.[0] || undefined;

  return (
    <Card className="shadow-md hover:shadow-xl transition-all rounded-2xl border border-gray-100 overflow-hidden">
      
      {/* Placeholder Cover */}
      <EventCoverPlaceholder category={mainCategory} />

      <CardBody className="p-4 space-y-4">
        <Typography variant="h5" className="text-gray-900 font-semibold">
          {event.title}
        </Typography>

        {event.description && (
          <Typography variant="small" className="text-gray-600 line-clamp-2">
            {event.description}
          </Typography>
        )}

        {/* Date + Time */}
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            {formattedDate}
          </div>

          <div className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            {formattedTime}
          </div>

          {event.capacity && (
            <div className="flex items-center gap-1">
              <FaUsers className="w-3 h-3" />
              {(event.attendees?.length || 0) + "/" + event.capacity}
            </div>
          )}
        </div>

        {/* Categories */}
        {event.categories && event.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.categories.slice(0, 3).map((c) => (
              <span
                key={c}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
