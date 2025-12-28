import { Typography } from "@material-tailwind/react";

interface EventCapacityBarProps {
  attendeesCount: number;
  capacity: number;
  showNumbers?: boolean;
  size?: "sm" | "md";
}

export function EventCapacityBar({
  attendeesCount,
  capacity,
  showNumbers = true,
  size = "md",
}: EventCapacityBarProps) {
  const safeCapacity = Math.max(0, capacity);
  const safeAttendees = Math.max(0, attendeesCount);
  const clampedAttendees = Math.min(safeAttendees, safeCapacity);

  const ratio = safeCapacity === 0 ? 0 : clampedAttendees / safeCapacity;
  const percent = Math.round(ratio * 100);
  const spotsLeft = Math.max(0, safeCapacity - clampedAttendees);

  const barColor =
    percent >= 90
      ? "bg-red-500"
      : percent >= 70
      ? "bg-amber-500"
      : "bg-green-600";

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
        <Typography variant="small" className="text-gray-600">
          Capacity
        </Typography>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}
          >
            {spotsLeft === 0 ? "Full" : `${spotsLeft} left`}
          </span>

          {showNumbers && (
            <Typography variant="small" className="font-semibold text-gray-900">
              {clampedAttendees} / {safeCapacity}
            </Typography>
          )}
        </div>
      </div>

      <div
        className={`w-full rounded-full bg-gray-100 overflow-hidden ${heightClass}`}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Event capacity"
      >
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
