import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineCalendar } from "react-icons/hi2";
import { type EventModel } from "@/features/event/types";
import { EventCardCompact } from "@/features/event/components/EventCardCompact";

interface EventSectionProps {
  title: string;
  events: EventModel[];
  emptyMessage: string;
  emptyDescription: string;
  viewAllLink: string;
  showHostBadge?: boolean;
  icon?: React.ReactNode;
}

export function EventSection({
  title,
  events,
  emptyMessage,
  emptyDescription,
  viewAllLink,
  showHostBadge = false,
  icon,
}: EventSectionProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-green-50/50 to-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-slate-300/30">
                {icon}
              </div>
            )}
            <div>
              <Typography
                variant="h5"
                className="text-slate-800 font-bold tracking-tight"
              >
                {title}
              </Typography>
              <Typography
                variant="small"
                className="text-slate-500 font-medium"
              >
                {events.length} {events.length === 1 ? "event" : "events"}
              </Typography>
            </div>
          </div>
          <Link to={viewAllLink}>
            <Button
              variant="text"
              size="sm"
              className="flex items-center gap-1.5 font-semibold rounded-lg text-green-600 hover:text-green-700 hover:bg-green-50 transition-all"
            >
              View all
              <HiOutlineArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Scrollable content area */}
      <CardBody className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <div className="p-4 rounded-full bg-green-100 text-green-600 mb-4">
              <HiOutlineCalendar className="w-8 h-8" />
            </div>
            <Typography
              variant="h6"
              className="text-slate-700 font-semibold mb-1"
            >
              {emptyMessage}
            </Typography>
            <Typography variant="small" className="text-slate-500 max-w-xs">
              {emptyDescription}
            </Typography>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <EventCardCompact
                key={event.id}
                event={event}
                showHostBadge={showHostBadge}
              />
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
