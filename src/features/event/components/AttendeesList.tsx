import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import Avatar from "@/components/Avatar";

import type { EventAttendee } from "../types";

interface AttendeesListProps {
  attendees: EventAttendee[];
  cohostIds?: string[];
}

export function AttendeesList({
  attendees,
  cohostIds = [],
}: AttendeesListProps) {
  const { t } = useTranslation();
  const totalAttendees = attendees.length;

  if (totalAttendees === 0 && cohostIds.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Typography variant="paragraph">{t("No attendees yet")}</Typography>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Typography variant="h6" className="text-gray-900">
        {t("Attendees")} ({totalAttendees})
      </Typography>

      <div className="flex flex-wrap gap-3">
        {attendees.slice(0, 20).map((attendee) => (
          <div key={attendee.id} className="flex flex-col items-center">
            <Avatar name={attendee.name} src={attendee.avatarUrl} size={48} />
            <Typography
              variant="small"
              className="text-gray-600 mt-1 max-w-[64px] truncate"
            >
              {attendee.name}
            </Typography>
            {cohostIds.includes(attendee.id) && (
              <Typography
                variant="small"
                className="text-xs text-primary font-medium"
              >
                {t("Co-host")}
              </Typography>
            )}
          </div>
        ))}
        {totalAttendees > 20 && (
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-600 font-semibold">
            +{totalAttendees - 20}
          </div>
        )}
      </div>
    </div>
  );
}
