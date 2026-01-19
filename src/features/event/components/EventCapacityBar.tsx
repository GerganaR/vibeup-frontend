import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

// Custom Infinity Icon component
function InfinityIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
    </svg>
  );
}

interface EventCapacityBarProps {
  attendeesCount: number;
  capacity?: number | null;
  showNumbers?: boolean;
  size?: "sm" | "md";
}

export function EventCapacityBar({
  attendeesCount,
  capacity,
  showNumbers = true,
  size = "md",
}: EventCapacityBarProps) {
  const { t } = useTranslation();
  const safeAttendees = Math.max(0, attendeesCount);

  // Handle unlimited capacity
  if (!capacity || capacity === 0) {
    return (
      <div className="flex items-center justify-between">
        <Typography variant="small" className="text-slate-600">
          Capacity
        </Typography>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2.5 py-1 mb-4 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            <InfinityIcon className="w-3.5 h-3.5" />
            {t("Unlimited")}
          </span>
          {showNumbers && (
            <Typography
              variant="small"
              className="font-semibold text-slate-800"
            >
              {safeAttendees} {t("attending")}
            </Typography>
          )}
        </div>
      </div>
    );
  }

  const safeCapacity = Math.max(0, capacity);
  const clampedAttendees = Math.min(safeAttendees, safeCapacity);

  const ratio = safeCapacity === 0 ? 0 : clampedAttendees / safeCapacity;
  const percent = Math.round(ratio * 100);
  const spotsLeft = Math.max(0, safeCapacity - clampedAttendees);

  const barColor =
    percent >= 90
      ? "bg-red-500"
      : percent >= 70
      ? "bg-amber-500"
      : "bg-green-500";

  const badgeColor =
    spotsLeft === 0
      ? "bg-red-50 text-red-700"
      : spotsLeft <= 5
      ? "bg-amber-50 text-amber-700"
      : "bg-green-50 text-green-700";

  const heightClass = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Typography variant="small" className="text-slate-600">
          Capacity
        </Typography>

        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${badgeColor}`}
          >
            {spotsLeft === 0 ? t("Full") : `${spotsLeft} ${t("left")}`}
          </span>

          {showNumbers && (
            <Typography
              variant="small"
              className="font-semibold text-slate-800"
            >
              {clampedAttendees} / {safeCapacity}
            </Typography>
          )}
        </div>
      </div>

      <div
        className={`w-full rounded-full bg-slate-100 overflow-hidden ${heightClass}`}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t("Event capacity")}
      >
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
