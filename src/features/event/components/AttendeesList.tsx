import { Typography } from "@material-tailwind/react";
import Avatar from "@/components/Avatar";

interface AttendeesListProps {
  attendeeIds: string[];
  cohostIds?: string[];
}

export function AttendeesList({
  attendeeIds,
  cohostIds = [],
}: AttendeesListProps) {
  const totalAttendees = attendeeIds.length;

  if (totalAttendees === 0 && cohostIds.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Typography variant="paragraph">No attendees yet</Typography>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Typography variant="h6" className="text-gray-900">
        Attendees ({totalAttendees})
      </Typography>

      <div className="flex flex-wrap gap-3">
        {attendeeIds.slice(0, 20).map((id, index) => (
          <div key={id} className="flex flex-col items-center">
            <Avatar name={`User ${index + 1}`} size={48} />
            <Typography variant="small" className="text-gray-600 mt-1">
              {cohostIds.includes(id) && "Co-host"}
            </Typography>
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
