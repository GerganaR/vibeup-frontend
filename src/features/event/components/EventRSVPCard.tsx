import { Card, CardBody, Button, Typography } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { isEventEnded } from "@/utils/dateFormat";
import type { EventModel } from "../types";
import { EventCapacityBar } from "./EventCapacityBar";

interface EventRSVPCardProps {
  event: EventModel;
  currentUserId?: string;
  isHost?: boolean;
  onRSVP: () => void;
  onCancelRSVP: () => void;
  loading?: boolean;
}

export function EventRSVPCard({
  event,
  currentUserId,
  isHost = false,
  onRSVP,
  onCancelRSVP,
  loading = false,
}: EventRSVPCardProps) {
  const isAttending = currentUserId
    ? event.attendees?.some((a) => a.id === currentUserId)
    : false;
  const isFull =
    event.capacity && event.attendees
      ? event.attendees.length >= event.capacity
      : false;
  const isPast = isEventEnded(new Date(event.endDateTime));

  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-green-50/50 to-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-slate-300/30">
            <UserGroupIcon className="w-5 h-5" />
          </div>
          <Typography variant="h5" className="text-slate-800 font-bold">
            RSVP Status
          </Typography>
        </div>
      </div>

      <CardBody className="p-5 space-y-4">
        {isHost ? (
          <div className="text-center py-6 px-4 rounded-xl bg-blue-50 border border-blue-200/50">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 w-fit mx-auto mb-3">
              <CheckCircleIcon className="w-6 h-6" />
            </div>
            <Typography variant="paragraph" className="text-blue-700 font-bold">
              You're hosting this event
            </Typography>
            <Typography variant="small" className="text-slate-500 mt-1">
              Hosts cannot RSVP to their own events
            </Typography>
          </div>
        ) : isPast ? (
          <div className="text-center py-6 px-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="p-3 rounded-full bg-slate-200 text-slate-500 w-fit mx-auto mb-3">
              <XCircleIcon className="w-6 h-6" />
            </div>
            <Typography
              variant="paragraph"
              className="text-slate-600 font-bold"
            >
              This event has ended
            </Typography>
            <Typography variant="small" className="text-slate-400 mt-1">
              RSVP is no longer available
            </Typography>
          </div>
        ) : isAttending ? (
          <div className="space-y-4">
            <div className="text-center py-6 px-4 rounded-xl bg-green-50 border border-green-200/50">
              <div className="p-3 rounded-full bg-green-100 text-green-600 w-fit mx-auto mb-3">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <Typography
                variant="paragraph"
                className="text-green-700 font-bold"
              >
                You're attending!
              </Typography>
              <Typography variant="small" className="text-slate-500 mt-1">
                We'll see you there
              </Typography>
            </div>
            <Button
              variant="outlined"
              color="red"
              fullWidth
              onClick={onCancelRSVP}
              disabled={loading}
              loading={loading}
              className="rounded-xl font-semibold"
            >
              Cancel RSVP
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {isFull ? (
              <div className="text-center py-6 px-4 rounded-xl bg-red-50 border border-red-200/50">
                <div className="p-3 rounded-full bg-red-100 text-red-500 w-fit mx-auto mb-3">
                  <XCircleIcon className="w-6 h-6" />
                </div>
                <Typography
                  variant="paragraph"
                  className="text-red-600 font-bold"
                >
                  Event is full
                </Typography>
                <Typography variant="small" className="text-slate-500 mt-1">
                  No more spots available
                </Typography>
              </div>
            ) : (
              <Button
                variant="filled"
                color="green"
                fullWidth
                size="lg"
                onClick={onRSVP}
                disabled={loading}
                loading={loading}
                className="rounded-xl font-bold shadow-lg shadow-slate-300/30 hover:shadow-xl transition-all"
              >
                RSVP Now
              </Button>
            )}
          </div>
        )}

        {/* Event Stats */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          {typeof event.capacity === "number" ? (
            <EventCapacityBar
              attendeesCount={event.attendees?.length ?? 0}
              capacity={event.capacity}
            />
          ) : (
            <div className="flex justify-between text-sm">
              <Typography className="text-slate-500">Attendees</Typography>
              <Typography className="font-bold text-slate-800">
                {event.attendees?.length ?? 0}
              </Typography>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
