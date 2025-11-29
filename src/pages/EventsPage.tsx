import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { FaMap, FaList } from "react-icons/fa";

type ViewMode = "list" | "map";

interface Event {
  id: string;
  title: string;
  description?: string;
  categories?: string[];
  startDateTime: string;
  endDateTime: string;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  hostId: string;
}

function EventsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  // TODO: Replace with actual data fetching
  const [events] = useState<Event[]>([]);

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between">
        <Typography variant="h3" className="text-gray-900">
          Events
        </Typography>

        {/* View Toggle */}
        <Tabs value={viewMode} className="w-auto">
          <TabsHeader className="bg-white">
            <Tab
              value="list"
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2 w-[300px]"
            >
              <FaList className="w-4 h-4" />
              List
            </Tab>
            <Tab
            
              value="map"
              onClick={() => setViewMode("map")}
              className="flex items-center gap-2 w-[300px]"
            >
              <FaMap className="w-4 h-4" />
              Map
            </Tab>
          </TabsHeader>
        </Tabs>
      </div>

      {/* Content Area */}
      <Card className="shadow-sm">
        <CardBody className="p-0">
          {viewMode === "list" ? (
            <EventsListView events={events} />
          ) : (
            <EventsMapView events={events} />
          )}
        </CardBody>
      </Card>
    </div>
  );
}

// List View Component
interface EventsListViewProps {
  events: Event[];
}

function EventsListView({ events }: EventsListViewProps) {
  if (events.length === 0) {
    return (
      <div className="p-12 text-center">
        <Typography variant="h6" className="text-gray-500">
          No events found
        </Typography>
        <Typography variant="small" className="text-gray-400 mt-2">
          Events will appear here when available
        </Typography>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {events.map((event) => (
        <Card
          key={event.id}
          className="shadow-none border-0 rounded-none hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Typography variant="h5" className="text-gray-900 mb-2">
                  {event.title}
                </Typography>
                {event.description && (
                  <Typography
                    variant="paragraph"
                    className="text-gray-600 mb-3 line-clamp-2"
                  >
                    {event.description}
                  </Typography>
                )}
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="text-gray-500">
                    {new Date(event.startDateTime).toLocaleDateString()}
                  </Typography>
                  {event.capacity && (
                    <Typography variant="small" className="text-gray-500">
                      Capacity: {event.capacity}
                    </Typography>
                  )}
                  {event.categories && event.categories.length > 0 && (
                    <div className="flex gap-2">
                      {event.categories.map((category) => (
                        <Typography
                          key={category}
                          variant="small"
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                        >
                          {category}
                        </Typography>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

// Map View Component
interface EventsMapViewProps {
  events: Event[];
}

function EventsMapView({ events }: EventsMapViewProps) {
  if (events.length === 0) {
    return (
      <div className="p-12 text-center">
        <Typography variant="h6" className="text-gray-500">
          No events found
        </Typography>
        <Typography variant="small" className="text-gray-400 mt-2">
          Events will appear on the map when available
        </Typography>
      </div>
    );
  }

  // Filter events with location data
  const eventsWithLocation = events.filter(
    (event) => event.latitude && event.longitude
  );

  if (eventsWithLocation.length === 0) {
    return (
      <div className="p-12 text-center">
        <Typography variant="h6" className="text-gray-500">
          No events with location data available
        </Typography>
      </div>
    );
  }

  return (
    <div className="h-[600px] relative bg-gray-100 rounded-lg overflow-hidden">
      {/* Placeholder for map - Replace with actual map library (e.g., react-leaflet, google-maps-react) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <FaMap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <Typography variant="h6" className="text-gray-500 font-medium">
            Map View
          </Typography>
          <Typography variant="small" className="text-gray-400 mt-2">
            {eventsWithLocation.length} event(s) with location data
          </Typography>
          <Typography variant="small" className="text-gray-400 mt-4">
            TODO: Integrate map library (e.g., react-leaflet, Google Maps)
          </Typography>
        </div>
      </div>

      {/* Event markers would be rendered here */}
      {eventsWithLocation.map((event) => (
        <div
          key={event.id}
          className="absolute"
          style={{
            // Placeholder positioning - would be calculated based on lat/lng
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Map marker component would go here */}
        </div>
      ))}
    </div>
  );
}

export default EventsPage;
