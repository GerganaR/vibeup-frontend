import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  formatEventDate,
  formatEventTime,
  isEventEnded,
} from "@/utils/dateFormat";
import type { EventModel } from "../types";

interface EventCardCompactProps {
  event: EventModel;
  showHostBadge?: boolean;
}

export function EventCardCompact({
  event,
  showHostBadge = false,
}: EventCardCompactProps) {
  const navigate = useNavigate();
  const isPast = isEventEnded(new Date(event.endDateTime));

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Card
      className={`shadow-none border border-gray-200 hover:border-green-400 hover:shadow-md transition-all cursor-pointer ${
        isPast ? "opacity-60 bg-gray-50" : ""
      }`}
      onClick={handleClick}
    >
      <CardBody className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Typography
            variant="h6"
            className={`font-semibold line-clamp-1 flex-1 ${
              isPast ? "text-gray-500" : "text-gray-900"
            }`}
          >
            {event.title}
          </Typography>
          <div className="flex gap-2 ml-2">
            {isPast && (
              <Chip
                value="Past"
                size="sm"
                className="bg-gray-600 text-white font-medium"
              />
            )}
            {showHostBadge && (
              <Chip
                value="Host"
                size="sm"
                className="bg-green-100 text-green-700 font-medium"
              />
            )}
          </div>
        </div>

        {event.description && (
          <Typography
            variant="small"
            className="text-gray-600 line-clamp-2 mb-3"
          >
            {event.description}
          </Typography>
        )}

        <div className="flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-1.5 text-gray-600">
            <FaCalendarAlt className="w-3.5 h-3.5" />
            <span>{formatEventDate(new Date(event.startDateTime))}</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-600">
            <FaClock className="w-3.5 h-3.5" />
            <span>{formatEventTime(new Date(event.startDateTime))}</span>
          </div>

          {event.capacity && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <FaUsers className="w-3.5 h-3.5" />
              <span>
                {event.attendees?.length || 0}/{event.capacity}
              </span>
            </div>
          )}
        </div>

        {event.categories && event.categories.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {event.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                {category}
              </span>
            ))}
            {event.categories.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{event.categories.length - 2}
              </span>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
