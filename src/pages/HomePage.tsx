import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  Spinner,
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaCalendarAlt, FaUsers, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import Avatar from "@/components/Avatar";

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
  host?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  attendees?: Array<{
    id: string;
    userId: string;
    eventId: string;
  }>;
}

export default function HomePage() {
  const { user } = useAppSelector((state) => state.user);
  const [incomingEvents, setIncomingEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoints when implemented
        // const [incomingRes, myEventsRes] = await Promise.all([
        //   api.get("/events?upcoming=true"),
        //   api.get("/events/my/events"),
        // ]);
        // setIncomingEvents(incomingRes.data);
        // setMyEvents(myEventsRes.data);

        // Placeholder data for now
        setIncomingEvents([]);
        setMyEvents([]);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchEvents();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please log in to view your dashboard</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  const upcomingIncoming = incomingEvents
    .filter((event) => new Date(event.startDateTime) > new Date())
    .sort(
      (a, b) =>
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
    )
    .slice(0, 5);

  const upcomingMyEvents = myEvents
    .filter((event) => new Date(event.startDateTime) > new Date())
    .sort(
      (a, b) =>
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="shadow-sm">
        <CardBody className="p-6">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} src={user.avatarUrl} size={60} className="text-xl" />
            <div>
              <Typography variant="h4" className="text-gray-900">
                Welcome back, {user.name}!
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {user.email}
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Incoming Events"
          value={incomingEvents.length}
          icon={<FaCalendarAlt className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="My Events"
          value={myEvents.length}
          icon={<FaUsers className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Upcoming This Week"
          value={
            [...incomingEvents, ...myEvents].filter((event) => {
              const eventDate = new Date(event.startDateTime);
              const weekFromNow = new Date();
              weekFromNow.setDate(weekFromNow.getDate() + 7);
              return eventDate > new Date() && eventDate <= weekFromNow;
            }).length
          }
          icon={<FaClock className="w-6 h-6" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incoming Events Section */}
        <Card className="shadow-sm">
          <CardBody className="p-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Typography variant="h5" className="text-gray-900">
                  Incoming Events
                </Typography>
                <Link to={ROUTES.EVENTS}>
                  <Button
                    variant="text"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View all
                  </Button>
                </Link>
              </div>
            </div>
            <div className="p-6">
              {upcomingIncoming.length === 0 ? (
                <EmptyState
                  message="No upcoming events"
                  description="You don't have any events coming up"
                />
              ) : (
                <div className="space-y-4">
                  {upcomingIncoming.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* My Events Section */}
        <Card className="shadow-sm">
          <CardBody className="p-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Typography variant="h5" className="text-gray-900">
                  My Events
                </Typography>
                <Link to={ROUTES.EVENTS}>
                  <Button
                    variant="text"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View all
                  </Button>
                </Link>
              </div>
            </div>
            <div className="p-6">
              {upcomingMyEvents.length === 0 ? (
                <EmptyState
                  message="No events hosted"
                  description="You haven't created any events yet"
                />
              ) : (
                <div className="space-y-4">
                  {upcomingMyEvents.map((event) => (
                    <EventCard key={event.id} event={event} isHost />
                  ))}
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple";
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <Card className="shadow-sm">
      <CardBody className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="small" className="text-gray-500 mb-1">
              {title}
            </Typography>
            <Typography variant="h3" className="text-gray-900">
              {value}
            </Typography>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        </div>
      </CardBody>
    </Card>
  );
}

// Event Card Component
interface EventCardProps {
  event: Event;
  isHost?: boolean;
}

function EventCard({ event, isHost }: EventCardProps) {
  const startDate = new Date(event.startDateTime);
  const formattedDate = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Card className="shadow-none border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
      <CardBody className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Typography variant="h6" className="text-gray-900 line-clamp-1">
            {event.title}
          </Typography>
          {isHost && (
            <Typography
              variant="small"
              className="ml-2 px-2 py-1 bg-green-100 text-green-700 font-medium rounded"
            >
              Host
            </Typography>
          )}
        </div>
        {event.description && (
          <Typography
            variant="small"
            className="text-gray-600 line-clamp-2 mb-3"
          >
            {event.description}
          </Typography>
        )}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3 text-gray-500" />
            <Typography variant="small" className="text-gray-500">
              {formattedDate}
            </Typography>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="w-3 h-3 text-gray-500" />
            <Typography variant="small" className="text-gray-500">
              {formattedTime}
            </Typography>
          </div>
          {event.capacity && (
            <div className="flex items-center gap-1">
              <FaUsers className="w-3 h-3 text-gray-500" />
              <Typography variant="small" className="text-gray-500">
                {event.attendees?.length || 0}/{event.capacity}
              </Typography>
            </div>
          )}
        </div>
        {event.categories && event.categories.length > 0 && (
          <div className="flex gap-2 mt-3">
            {event.categories.slice(0, 2).map((category) => (
              <Typography
                key={category}
                variant="small"
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
              >
                {category}
              </Typography>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

// Empty State Component
interface EmptyStateProps {
  message: string;
  description: string;
}

function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="text-center py-8">
      <FaCalendarAlt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <Typography variant="h6" className="text-gray-600 mb-1">
        {message}
      </Typography>
      <Typography variant="small" className="text-gray-400">
        {description}
      </Typography>
    </div>
  );
}
