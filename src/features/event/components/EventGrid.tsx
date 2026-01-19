import type { EventModel } from "../types";
import { EventCard } from "./EventCard";
import { EmptyState } from "./EmptyState";

interface Props {
  events: EventModel[];
}

export function EventsGrid({ events }: Props) {
  if (events.length === 0) {
    return (
      <EmptyState
        message="No events found"
        description="Events will appear here soon."
      />
    );
  }

  return (
    <div
      className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-1
        lg:grid-cols-3
      "
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
