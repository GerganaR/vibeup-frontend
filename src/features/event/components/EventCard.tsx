import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { EventModel } from "../types";
import { EventCoverPlaceholder } from "./EventCover";
import { isEventEnded } from "@/utils/dateFormat";
import { EventCapacityBar } from "./EventCapacityBar";

interface Props {
  event: EventModel;
}

export function EventCard({ event }: Props) {
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

  const mainCategory = event.categories?.[0] || undefined;
  const hasCoordinates =
    event.latitude !== undefined && event.longitude !== undefined;

  // Google Street View for card thumbnails
  const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapThumbnailUrl =
    hasCoordinates && GOOGLE_MAPS_KEY
      ? `https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${event.latitude},${event.longitude}&fov=90&heading=0&pitch=0&source=outdoor&key=${GOOGLE_MAPS_KEY}`
      : null;

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  const attendeesCount = event.attendees?.length ?? 0;
  const hasCapacity = typeof event.capacity === "number" && event.capacity > 0;

  return (
    <Card
      className={`shadow-md hover:shadow-xl transition-all rounded-2xl border border-gray-100 overflow-hidden cursor-pointer ${
        isPast ? "opacity-60" : ""
      }`}
      onClick={handleClick}
    >
      {/* Google Street View or Placeholder Cover */}
      {hasCoordinates && mapThumbnailUrl ? (
        <div className="w-full h-48 relative">
          <img
            src={mapThumbnailUrl}
            alt={event.address || "Event Location"}
            className={`w-full h-full object-cover ${
              isPast ? "grayscale" : ""
            }`}
            onError={(e) => {
              // If Street View fails, show placeholder
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
          {isPast && (
            <div className="absolute top-2 right-2">
              <Chip
                value="Past Event"
                size="sm"
                className="bg-gray-700 text-white font-medium"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className={isPast ? "grayscale" : ""}>
            <EventCoverPlaceholder category={mainCategory} />
          </div>
          {isPast && (
            <div className="absolute top-2 right-2">
              <Chip
                value="Past Event"
                size="sm"
                className="bg-gray-700 text-white font-medium"
              />
            </div>
          )}
        </div>
      )}

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
        {/* Capacity progress bar (NEW) */}
        {hasCapacity && (
          <div
            className={isPast ? "pointer-events-none opacity-80" : ""}
            onClick={(e) => e.stopPropagation()}
          >
            <EventCapacityBar
              attendeesCount={attendeesCount}
              capacity={event.capacity!}
              size="sm"
              showNumbers={false}
            />
          </div>
        )}

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
