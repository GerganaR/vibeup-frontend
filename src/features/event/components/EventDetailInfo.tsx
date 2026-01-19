import { Typography } from "@material-tailwind/react";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { formatEventDate, formatEventTime } from "@/utils/dateFormat";
import { useTranslation } from "react-i18next";
import type { EventModel } from "../types";

interface EventDetailInfoProps {
  event: EventModel;
}

function InfoCard({
  icon,
  label,
  title,
  subtitle,
  fullWidth,
}: {
  icon: React.ReactNode;
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow",
        fullWidth ? "col-span-full" : "",
      ].join(" ")}
    >
      <div className="shrink-0 rounded-lg bg-green-50 p-2 text-green-700">
        {icon}
      </div>

      <div className="min-w-0">
        <Typography
          variant="small"
          className="text-gray-500 uppercase tracking-wide"
        >
          {label}
        </Typography>

        <Typography variant="h6" className="text-gray-900 leading-snug">
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="small" className="text-gray-600 mt-0.5">
            {subtitle}
          </Typography>
        )}
      </div>
    </div>
  );
}

export function EventDetailInfo({ event }: EventDetailInfoProps) {
  const { t } = useTranslation();
  const attendeesCount = event.attendees?.length ?? 0;
  const spotsLeft =
    typeof event.capacity === "number" ? event.capacity - attendeesCount : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Row 1 */}
      <InfoCard
        icon={<CalendarIcon className="h-5 w-5" />}
        label={t("Start")}
        title={formatEventDate(new Date(event.startDateTime))}
        subtitle={formatEventTime(new Date(event.startDateTime))}
      />

      <InfoCard
        icon={<ClockIcon className="h-5 w-5" />}
        label={t("End")}
        title={formatEventDate(new Date(event.endDateTime))}
        subtitle={formatEventTime(new Date(event.endDateTime))}
      />

      {typeof event.capacity === "number" && (
        <InfoCard
          icon={<UsersIcon className="h-5 w-5" />}
          label={t("Capacity")}
          title={`${attendeesCount} / ${event.capacity}`}
          subtitle={
            spotsLeft > 0
              ? t("{{count}} spots left", { count: spotsLeft })
              : t("No spots left")
          }
        />
      )}

      {/* Row 2 – full width */}
      {event.address && (
        <InfoCard
          fullWidth
          icon={<MapPinIcon className="h-5 w-5" />}
          label={t("Location")}
          title={<span className="line-clamp-2">{event.address}</span>}
          subtitle={
            event.latitude != null && event.longitude != null
              ? `${event.latitude.toFixed(4)}, ${event.longitude.toFixed(4)}`
              : undefined
          }
        />
      )}
    </div>
  );
}
