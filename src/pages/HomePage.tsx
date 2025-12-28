import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";
import { ROUTES } from "@/routes";
import { StatsCard } from "@/components/StatsCard";
import { WelcomeHeader } from "@/features/layout/components/WelcomeHeader";
import { CategoryFilterBar } from "@/features/event/components/CategoryFilterBar";
import { EventCardCompact } from "@/features/event/components/EventCardCompact";
import { EmptyState } from "@/features/event/components/EmptyState";
import { EventFormModal } from "@/features/event/components/EventFormModal";
import { useHomeEvents } from "@/features/event/hooks/useHomeEvents";
import { useCreateEvent } from "@/features/event/hooks/useCreateEvent";
import type { CreateEventDTO, EventModel } from "@/features/event/types";

// Helper: Calculate events happening this week
function calculateThisWeek(
  incoming: EventModel[],
  myEvents: EventModel[]
): number {
  const now = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(weekFromNow.getDate() + 7);

  return [...incoming, ...myEvents].filter((event) => {
    const eventDate = new Date(event.startDateTime);
    return eventDate > now && eventDate <= weekFromNow;
  }).length;
}

// Logged Out State
function LoggedOutState() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <FaCalendarAlt className="w-20 h-20 text-gray-300 mb-6" />
      <Typography variant="h4" className="text-gray-700 mb-3">
        Welcome to VibeUp
      </Typography>
      <Typography
        variant="paragraph"
        className="text-gray-500 mb-6 max-w-md text-center"
      >
        Please log in to access your personalized dashboard
      </Typography>
      <Link to={ROUTES.LOGIN}>
        <Button color="green" size="lg">
          Log In
        </Button>
      </Link>
    </div>
  );
}

// Dashboard Skeleton
function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <Card className="h-28 bg-gray-200 rounded-lg">
        <div />
      </Card>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-gray-200 rounded-full flex-shrink-0"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-32 bg-gray-200">
            <div className="animate-pulse h-full" />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="h-96 bg-gray-200">
            <div className="animate-pulse h-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}

// Error State
interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="text-red-500 mb-4">
        <svg
          className="w-20 h-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <Typography variant="h5" className="text-gray-700 mb-2">
        Something went wrong
      </Typography>
      <Typography variant="paragraph" className="text-gray-500 mb-6">
        {error}
      </Typography>
      <Button color="green" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}

// Stats Row
interface StatsRowProps {
  stats: {
    incoming: number;
    hosted: number;
    thisWeek: number;
  };
  loading?: boolean;
}

function StatsRow({ stats, loading }: StatsRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="Incoming Events"
        value={stats.incoming}
        icon={<FaCalendarAlt className="w-6 h-6" />}
        color="blue"
        loading={loading}
      />
      <StatsCard
        title="My Events"
        value={stats.hosted}
        icon={<FaUsers className="w-6 h-6" />}
        color="green"
        loading={loading}
      />
      <StatsCard
        title="This Week"
        value={stats.thisWeek}
        icon={<FaClock className="w-6 h-6" />}
        color="purple"
        loading={loading}
      />
    </div>
  );
}

// Event Section
interface EventSectionProps {
  title: string;
  events: EventModel[];
  emptyMessage: string;
  emptyDescription: string;
  viewAllLink: string;
  showHostBadge?: boolean;
}

function EventSection({
  title,
  events,
  emptyMessage,
  emptyDescription,
  viewAllLink,
  showHostBadge = false,
}: EventSectionProps) {
  return (
    <Card className="shadow-sm">
      <CardBody className="p-0">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Typography variant="h5" className="text-gray-900 font-semibold">
              {title}
            </Typography>
            <Link to={viewAllLink}>
              <Button
                variant="text"
                size="sm"
                className="text-green-600 hover:text-green-700"
              >
                View all
              </Button>
            </Link>
          </div>
        </div>
        <div className="p-6">
          {events.length === 0 ? (
            <EmptyState message={emptyMessage} description={emptyDescription} />
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
        </div>
      </CardBody>
    </Card>
  );
}

// Main HomePage
export default function HomePage() {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { incomingEvents, myEvents, categories, loading, error, refetch } =
    useHomeEvents(user?.id, selectedCategory);

  const { createEvent, loading: createLoading } = useCreateEvent();

  // Calculate stats
  const stats = useMemo(
    () => ({
      incoming: incomingEvents.length,
      hosted: myEvents.length,
      thisWeek: calculateThisWeek(incomingEvents, myEvents),
    }),
    [incomingEvents, myEvents]
  );

  const handleCreateEvent = async (data: CreateEventDTO) => {
    try {
      await createEvent(data);
      setShowCreateModal(false);
      refetch(); // Refresh events
    } catch (error) {
      console.error("Create event failed:", error);
    }
  };

  // Auth states
  if (!user) return <LoggedOutState />;
  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <WelcomeHeader
        userName={user.profile.name}
        userEmail={user.profile.email}
        userAvatar={user.profile.avatarUrl}
        onCreateEvent={() => setShowCreateModal(true)}
        onBrowseEvents={() => navigate(ROUTES.EVENTS)}
      />

      <CategoryFilterBar
        categories={["All", ...categories]}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <StatsRow stats={stats} loading={false} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventSection
          title="Incoming Events"
          events={incomingEvents}
          emptyMessage="No upcoming events"
          emptyDescription="You're not attending any events yet"
          viewAllLink={ROUTES.EVENTS}
        />

        <EventSection
          title="My Events"
          events={myEvents}
          emptyMessage="No hosted events"
          emptyDescription="You haven't created any events yet"
          viewAllLink={ROUTES.EVENTS}
          showHostBadge
        />
      </div>

      <EventFormModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateEvent}
        loading={createLoading}
      />
    </div>
  );
}
