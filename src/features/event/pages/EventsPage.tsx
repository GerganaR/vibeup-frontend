import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { EventsTabs } from "../components/EventTabs";
import { EventsGrid } from "../components/EventGrid";
import { EventMap } from "../components/EventMap";
import { EventCardSkeleton } from "../components/EventCardSkeleton";
import { EventFormModal } from "../components/EventFormModal";
import { useGetEvents } from "../hooks/useGetEvents";
import { useCreateEvent } from "../hooks/useCreateEvent";
import { useDashboard } from "../hooks/useDashboard";
import { CategoryFilterBar } from "../components/CategoryFilterBar";
import { EventFilterTabs, type FilterTab } from "../components/EventFilterTabs";
import { PageHeader } from "@/features/layout/components/PageHeader";
import type { CreateEventDTO, UpdateEventDTO } from "../types";
import { useUpdateEvent } from "../hooks/useUpdateEvent";

export default function EventsPage() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { getEvents, events, loading: allEventsLoading } = useGetEvents();
  const { createEvent, loading: createLoading } = useCreateEvent();
  const { updateEvent } = useUpdateEvent();

  // Dashboard Data
  const {
    attendingEvents,
    hostedEvents,
    loading: dashboardLoading,
    refetch: refetchDashboard,
  } = useDashboard(selectedCategoryId);

  useEffect(() => {
    getEvents();
  }, []);

  // Extract categories from all events (discovery) to populate filter
  const categories = useMemo(() => {
    if (!events) return [];
    const categoryMap = new Map<string, string>();
    events.forEach((event) => {
      event.categories?.forEach((cat) => categoryMap.set(cat.id, cat.name));
    });
    return Array.from(categoryMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [events]);

  // Determine displayed events based on tab
  const displayedEvents = useMemo(() => {
    switch (filterTab) {
      case "my":
        return hostedEvents;
      case "attending":
        return attendingEvents;
      case "all":
      default:
        // Local filtering for "All" tab (since we fetch all)
        if (!events) return [];
        if (selectedCategoryId === "All") return events;
        return events.filter((e) =>
          e.categories?.some((cat) => cat.id === selectedCategoryId)
        );
    }
  }, [filterTab, events, hostedEvents, attendingEvents, selectedCategoryId]);

  const loading = filterTab === "all" ? allEventsLoading : dashboardLoading;

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
      // Refresh both lists
      getEvents();
      refetchDashboard();
    } catch (error) {
      console.error("Create event failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header with Tabs */}
      <PageHeader
        title="Events"
        actions={
          <>
            <EventsTabs mode={viewMode} onChange={setViewMode} />
            <Button
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white border-none shadow-md hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
              onClick={() => setShowCreateModal(true)}
            >
              <PlusIcon className="w-5 h-5" />
              <span className="hidden sm:inline">{t("Create Event")}</span>
            </Button>
          </>
        }
      />

      {/* Filter Tabs & Category Filter */}
      <div className="flex flex-col gap-4">
        <EventFilterTabs selectedTab={filterTab} onSelectTab={setFilterTab} />

        <CategoryFilterBar
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
      </div>

      {/* Main Content */}
      <Card
        className={`shadow-sm flex-1 ${
          viewMode === "grid" ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <CardBody className={`${viewMode === "map" ? "p-4 h-full" : "p-6"}`}>
          {loading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : displayedEvents && displayedEvents.length > 0 ? (
            viewMode === "grid" ? (
              <EventsGrid events={displayedEvents} />
            ) : (
              <EventMap events={displayedEvents} />
            )
          ) : (
            <div className="text-center py-12">
              <Typography variant="h6" className="text-gray-500">
                {filterTab === "my"
                  ? t("No hosted events found")
                  : filterTab === "attending"
                  ? t("Not attending any events")
                  : t("No events found")}
              </Typography>
              <Typography variant="small" className="text-gray-400 mt-2">
                {filterTab === "my"
                  ? t("You haven't created any events yet.")
                  : filterTab === "attending"
                  ? t("You're not attending any events matching filter.")
                  : t("Try adjusting filters.")}
              </Typography>
              {filterTab === "my" && (
                <Button
                  className="mt-6 bg-teal-500 hover:bg-teal-600 text-white border-none shadow-md hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                  onClick={() => setShowCreateModal(true)}
                >
                  {t("Create Your First Event")}
                </Button>
              )}
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
