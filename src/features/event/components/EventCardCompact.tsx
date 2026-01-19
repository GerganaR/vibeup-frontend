import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isEventEnded } from "@/utils/dateFormat";
import { useDateFormatter } from "@/hooks/useDateFormatter";
import type { EventModel } from "../types";
import { CategoryPill } from "./CategoryPill";
import { useTranslation } from "react-i18next";

interface EventCardCompactProps {
  event: EventModel;
  showHostBadge?: boolean;
}

export function EventCardCompact({
  event,
  showHostBadge = false,
}: EventCardCompactProps) {
  const { t } = useTranslation();
  const { formatDate, formatTime } = useDateFormatter();
  const navigate = useNavigate();
  const isPast = isEventEnded(new Date(event.endDateTime));

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Card
      className={`group overflow-hidden cursor-pointer transition-all duration-300 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:shadow-slate-200/50 hover:border-slate-300 ${
        isPast ? "opacity-60 bg-slate-50/50" : ""
      }`}
      onClick={handleClick}
    >
      <CardBody className="p-4">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <Typography
            variant="h6"
            className={`font-bold line-clamp-1 flex-1 group-hover:text-teal-600 transition-colors ${
              isPast ? "text-slate-500" : "text-slate-800"
            }`}
          >
            {event.title}
          </Typography>
          <div className="flex gap-1.5 flex-shrink-0">
            {isPast && (
              <Chip
                value={t("Past Event")}
                size="sm"
                className="bg-slate-200 text-slate-600 font-medium text-xs px-2 py-0.5"
              />
            )}
            {showHostBadge && (
              <Chip
                value={t("Host")}
                size="sm"
                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-medium text-xs px-2 py-0.5"
              />
            )}
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <Typography
            variant="small"
            className="text-slate-500 line-clamp-2 mb-4 leading-relaxed"
          >
            {event.description}
          </Typography>
        )}

        {/* Meta Info Row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            <FaCalendarAlt className="w-3 h-3 text-teal-500" />
            <span className="text-xs font-medium">
              {formatDate(new Date(event.startDateTime))}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            <FaClock className="w-3 h-3 text-teal-500" />
            <span className="text-xs font-medium">
              {formatTime(new Date(event.startDateTime))}
            </span>
          </div>

          {event.capacity && (
            <div className="flex items-center gap-1.5 text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
              <FaUsers className="w-3 h-3" />
              <span className="text-xs font-semibold">
                {event.attendees?.length || 0}/{event.capacity}
              </span>
            </div>
          )}

          {event.address && (
            <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg max-w-[140px]">
              <FaMapMarkerAlt className="w-3 h-3 text-rose-400 flex-shrink-0" />
              <span className="text-xs font-medium truncate">
                {event.address}
              </span>
            </div>
          )}
        </div>

        {/* Categories */}
        {event.categories && event.categories.length > 0 && (
          <div className="flex gap-1.5 flex-wrap pt-3 border-t border-slate-100">
            {event.categories.slice(0, 3).map((category) => (
              <CategoryPill
                key={category.id}
                category={category.name}
                size="sm"
              />
            ))}
            {event.categories.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
                +{event.categories.length - 3}
              </span>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
