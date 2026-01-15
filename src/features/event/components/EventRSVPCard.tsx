import { Card, CardBody, Button, Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
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
    <Card className="shadow-lg">
      <CardBody className="space-y-4">
        <Typography variant="h5" className="text-gray-900">
          RSVP Status
        </Typography>

        {isHost ? (
          <div className="text-center py-4">
            <Typography
              variant="paragraph"
              className="text-blue-600 font-semibold"
            >
              You're hosting this event
            </Typography>
            <Typography variant="small" className="text-gray-500 mt-2">
              Hosts cannot RSVP to their own events
            </Typography>
          </div>
        ) : isPast ? (
          <div className="text-center py-4">
            <Typography
              variant="paragraph"
              className="text-gray-500 font-semibold"
            >
              This event has ended
            </Typography>
            <Typography variant="small" className="text-gray-400 mt-2">
              RSVP is no longer available
            </Typography>
          </div>
        ) : isAttending ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircleIcon className="w-6 h-6" />
              <Typography variant="paragraph" className="font-semibold">
                You're attending!
              </Typography>
            </div>
            <Button
              variant="outlined"
              color="red"
              fullWidth
              onClick={onCancelRSVP}
              disabled={loading}
              loading={loading}
            >
              Cancel RSVP
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {isFull ? (
              <div className="text-center py-4">
                <Typography
                  variant="paragraph"
                  className="text-red-500 font-semibold"
                >
                  Event is full
                </Typography>
                <Typography variant="small" className="text-gray-500 mt-2">
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
              >
                RSVP Now
              </Button>
            )}
          </div>
        )}

        {/* Event Stats */}
        <div className="pt-4 border-t border-gray-200 space-y-3">
          {typeof event.capacity === "number" ? (
            <EventCapacityBar
              attendeesCount={event.attendees?.length ?? 0}
              capacity={event.capacity}
            />
          ) : (
            <div className="flex justify-between text-sm">
              <Typography className="text-gray-600">Attendees</Typography>
              <Typography className="font-semibold">
                {event.attendees?.length ?? 0}
              </Typography>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
