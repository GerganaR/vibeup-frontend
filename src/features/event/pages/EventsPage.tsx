import { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Chip,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "@/store/hooks";
import { EventsTabs } from "../components/EventTabs";
import { EventsGrid } from "../components/EventGrid";
import { EventMap } from "../components/EventMap";
import { EventCardSkeleton } from "../components/EventCardSkeleton";
import { EventFormModal } from "../components/EventFormModal";
import { useGetEvents } from "../hooks/useGetEvents";
import { useCreateEvent } from "../hooks/useCreateEvent";
import type { CreateEventDTO, UpdateEventDTO } from "../types";
import { useUpdateEvent } from "../hooks/useUpdateEvent";

type FilterTab = "all" | "my" | "attending";

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const user = useAppSelector((state) => state.user.user);
  const { getEvents, events, loading } = useGetEvents();
  const { createEvent, loading: createLoading } = useCreateEvent();
  const { updateEvent } = useUpdateEvent();

  useEffect(() => {
    getEvents();
  }, []);

  // Filter events based on active tab
  const filteredEvents = useMemo(() => {
    if (!events || !user) return events;

    switch (filterTab) {
      case "my":
        return events.filter((event) => event.hostId === user.id);
      case "attending":
        return events.filter(
          (event) =>
            event.attendees?.some((a) => a.id === user.id) &&
            event.hostId !== user.id
        );
      case "all":
      default:
        return events;
    }
  }, [events, filterTab, user]);

  const handleCreateOrUpdateEvent = async (
    data: CreateEventDTO | UpdateEventDTO
  ) => {
    try {
      if ("id" in data) {
        await updateEvent(data.id as string, data as UpdateEventDTO);
      } else {
        await createEvent(data as CreateEventDTO);
      }
      setShowCreateModal(false);
      // Refresh events list
      getEvents();
    } catch (error) {
      console.error("Create event failed:", error);
    }
  };

  return (
    <div className=" flex flex-col gap-6 h-full">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Typography variant="h3" className="text-gray-900">
          Events
        </Typography>

        <div className="flex items-center gap-3">
          <EventsTabs mode={viewMode} onChange={setViewMode} />
          <Button
            color="green"
            className="flex items-center gap-2"
            onClick={() => setShowCreateModal(true)}
          >
            <PlusIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Create Event</span>
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <div onClick={() => setFilterTab("all")}>
          <Chip
            value="All Events"
            variant={filterTab === "all" ? "filled" : "outlined"}
            color={filterTab === "all" ? "green" : "gray"}
            className="cursor-pointer whitespace-nowrap"
          />
        </div>
        <div onClick={() => setFilterTab("my")}>
          <Chip
            value="My Events"
            variant={filterTab === "my" ? "filled" : "outlined"}
            color={filterTab === "my" ? "green" : "gray"}
            className="cursor-pointer whitespace-nowrap"
          />
        </div>
        <div onClick={() => setFilterTab("attending")}>
          <Chip
            value="Attending"
            variant={filterTab === "attending" ? "filled" : "outlined"}
            color={filterTab === "attending" ? "green" : "gray"}
            className="cursor-pointer whitespace-nowrap"
          />
        </div>
      </div>

      {/* Main Content */}
      <Card className="shadow-sm flex-1 overflow-y-auto">
        <CardBody className="p-6">
          {loading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredEvents && filteredEvents.length > 0 ? (
            viewMode === "grid" ? (
              <EventsGrid events={filteredEvents} />
            ) : (
              <EventMap events={filteredEvents} />
            )
          ) : (
            <div className="text-center py-12">
              <Typography variant="h6" className="text-gray-500">
                {filterTab === "my"
                  ? "No hosted events"
                  : filterTab === "attending"
                  ? "Not attending any events"
                  : "No events found"}
              </Typography>
              <Typography variant="small" className="text-gray-400 mt-2">
                {filterTab === "my"
                  ? "You haven't created any events yet. Start by creating one!"
                  : filterTab === "attending"
                  ? "You're not attending any events. Browse and RSVP to join!"
                  : "When events are available, you'll see them here."}
              </Typography>
              <Button
                color="green"
                className="mt-6"
                onClick={() => setShowCreateModal(true)}
              >
                Create Your First Event
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Create Event Modal */}
      <EventFormModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateOrUpdateEvent}
        loading={createLoading}
      />
    </div>
  );
}
