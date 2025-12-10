import { useState, useEffect } from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { EventsTabs } from "../components/EventTabs";
import { EventsGrid } from "../components/EventGrid";
import { EventMap } from "../components/EventMap";
import { useGetEvents } from "../hooks/useGetEvents";

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const { getEvents, events, loading } = useGetEvents();

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className=" flex flex-col gap-6 h-full">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between">
        <Typography variant="h3" className="text-gray-900">
          Events
        </Typography>

        <EventsTabs mode={viewMode} onChange={setViewMode} />
      </div>

      {/* Main Content */}
      <Card className="shadow-sm flex-1 overflow-y-auto">
        <CardBody className="p-6">
          {loading ? (
            <p>Loading...</p>
          ) : events && events.length > 0 ? (
            viewMode === "grid" ? (
              <EventsGrid events={events} />
            ) : (
              <EventMap />
            )
          ) : (
            <div className="text-center py-12">
              <Typography variant="h6" className="text-gray-500">
                No events found
              </Typography>
              <Typography variant="small" className="text-gray-400 mt-2">
                When events are available, you'll see them here.
              </Typography>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
