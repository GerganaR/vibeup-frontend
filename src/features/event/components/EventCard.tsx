import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { EventModel } from "../types";
import { EventCoverPlaceholder } from "./EventCover";
import { CategoryPill } from "./CategoryPill";
import { EventCapacityBar } from "./EventCapacityBar";
import { isEventEnded } from "@/utils/dateFormat";

interface Props {
  event: EventModel;
}

export function EventCard({ event }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const date = new Date(event.startDateTime);
  const isPast = isEventEnded(new Date(event.endDateTime));

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const mainCategory = event.categories?.[0]?.name || undefined;
  const hasCoordinates =
    event.latitude !== undefined && event.longitude !== undefined;

  const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapThumbnailUrl =
    hasCoordinates && GOOGLE_MAPS_KEY
      ? `https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${event.latitude},${event.longitude}&fov=90&heading=0&pitch=0&source=outdoor&key=${GOOGLE_MAPS_KEY}`
      : null;

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  const attendeesCount = event.attendees?.length ?? 0;

  return (
    <Card
      className={`group overflow-hidden cursor-pointer transition-all duration-300 rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 hover:border-slate-300 hover:-translate-y-1 ${
        isPast ? "opacity-60 grayscale-[30%]" : ""
      }`}
      onClick={handleClick}
    >
      {/* Cover Image */}
      {hasCoordinates && mapThumbnailUrl ? (
        <div className="w-full h-48 relative overflow-hidden">
          <img
            src={mapThumbnailUrl}
            alt={event.address || t("Event Location")}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isPast ? "grayscale" : ""
            }`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) {
                (fallback as HTMLElement).style.display = "flex";
              }
            }}
          />
          <div className="hidden w-full h-full">
            <EventCoverPlaceholder category={mainCategory} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          {isPast && (
            <div className="absolute top-3 right-3">
              <Chip
                value={t("Past Event")}
                size="sm"
                className="bg-slate-800/90 backdrop-blur-sm text-white font-medium"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <div
            className={`transition-transform duration-500 group-hover:scale-105 ${
              isPast ? "grayscale" : ""
            }`}
          >
            <EventCoverPlaceholder category={mainCategory} />
          </div>
          {isPast && (
            <div className="absolute top-3 right-3">
              <Chip
                value={t("Past Event")}
                size="sm"
                className="bg-slate-800/90 backdrop-blur-sm text-white font-medium"
              />
            </div>
          )}
        </div>
      )}

      <CardBody className="p-5 space-y-4">
        {/* Title */}
        <Typography
          variant="h5"
          className="text-slate-800 font-bold line-clamp-1 group-hover:text-green-600 transition-colors"
        >
          {event.title}
        </Typography>

        {/* Description */}
        {event.description && (
          <Typography
            variant="small"
            className="text-slate-500 line-clamp-2 leading-relaxed"
          >
            {event.description}
          </Typography>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600">
            <FaCalendarAlt className="w-3 h-3 text-green-500" />
            <span className="text-xs font-medium">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600">
            <FaClock className="w-3 h-3 text-green-500" />
            <span className="text-xs font-medium">{formattedTime}</span>
          </div>

          {event.capacity && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-50 text-green-700">
              <FaUsers className="w-3 h-3" />
              <span className="text-xs font-semibold">
                {attendeesCount}/{event.capacity}
              </span>
            </div>
          )}
        </div>

        {/* Address */}
        {event.address && (
          <div className="flex items-center gap-1.5 text-slate-500">
            <FaMapMarkerAlt className="w-3 h-3 text-rose-400 flex-shrink-0" />
            <span className="text-xs truncate">{event.address}</span>
          </div>
        )}

        <div
          className={isPast ? "pointer-events-none opacity-80" : ""}
          onClick={(e) => e.stopPropagation()}
        >
          <EventCapacityBar
            attendeesCount={attendeesCount}
            capacity={event.capacity}
            size="sm"
            showNumbers={false}
          />
        </div>

        {/* Categories */}
        {event.categories && event.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
            {event.categories.slice(0, 3).map((c) => (
              <CategoryPill key={c.id} category={c.name} size="sm" />
            ))}
            {event.categories.length > 3 && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
                +{event.categories.length - 3}
              </span>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
