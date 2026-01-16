import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { ROUTES } from "@/routes";
import { WelcomeHeader } from "@/features/layout/components/WelcomeHeader";
import { EventFormModal } from "@/features/event/components/EventFormModal";
import { DashboardStats } from "@/features/event/components/DashboardStats";
import { EventSection } from "../components/EventSection";
import { useDashboard } from "@/features/event/hooks/useDashboard";
import { useCreateEvent } from "@/features/event/hooks/useCreateEvent";
import { useGetEvents } from "@/features/event/hooks/useGetEvents";
import { useUpdateEvent } from "@/features/event/hooks/useUpdateEvent";
import type { CreateEventDTO, UpdateEventDTO } from "../types";
import { LoggedOutState } from "../components/dashboard/LoggedOutState";
import { DashboardSkeleton } from "../components/dashboard/DashboardSkeleton";
import { DashboardError } from "../components/dashboard/DashboardError";
import { HiOutlineTicket, HiOutlineStar } from "react-icons/hi2";

export default function DashboardPage() {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const {
    stats,
    attendingEvents,
    hostedEvents,
    loading: dashboardLoading,
    error: dashboardError,
    refetch,
  } = useDashboard();

  const { createEvent, loading: createLoading } = useCreateEvent();
  const { updateEvent } = useUpdateEvent();
  const { getEvents } = useGetEvents();

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
      refetch();
      getEvents();
    } catch (error) {
      console.error("Create event failed:", error);
    }
  };

  if (!user) return <LoggedOutState />;
  if (dashboardLoading && !stats) return <DashboardSkeleton />;
  if (dashboardError)
    return <DashboardError error={dashboardError} onRetry={refetch} />;

  return (
    <div className="flex flex-col h-full min-h-0 gap-4">
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0">
        <WelcomeHeader
          userName={user.profile.name}
          userEmail={user.profile.email}
          userAvatar={user.profile.avatarUrl}
          onCreateEvent={() => setShowCreateModal(true)}
          onBrowseEvents={() => navigate(ROUTES.EVENTS)}
        />
      </div>

      {/* Stats Section - Fixed */}
      <div className="flex-shrink-0">
        <DashboardStats stats={stats} loading={dashboardLoading} />
      </div>

      {/* Event Sections - Flexible & Scrollable */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <EventSection
          title="Incoming Events"
          events={attendingEvents}
          emptyMessage="No upcoming events"
          emptyDescription="You're not attending any events yet. Browse events to find something interesting!"
          viewAllLink={ROUTES.EVENTS}
          icon={<HiOutlineTicket className="w-5 h-5" />}
        />

        <EventSection
          title="My Events"
          events={hostedEvents}
          emptyMessage="No hosted events"
          emptyDescription="You haven't created any events yet. Start hosting to build your community!"
          viewAllLink={ROUTES.EVENTS}
          showHostBadge
          icon={<HiOutlineStar className="w-5 h-5" />}
        />
      </div>

      <EventFormModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateOrUpdateEvent}
        loading={createLoading}
      />
    </div>
  );
}
