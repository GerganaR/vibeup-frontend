import { useState, useEffect, useCallback } from "react";
import { eventApi } from "../api/eventApi";
import { mapEventDTO } from "../utils/mapEventDTO";
import type { EventModel } from "../types";

interface UseHomeEventsReturn {
  incomingEvents: EventModel[];
  myEvents: EventModel[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Helper: Extract unique categories from events
function extractCategories(events: EventModel[]): string[] {
  const categorySet = new Set<string>();
  events.forEach((event) => {
    event.categories?.forEach((cat) => categorySet.add(cat));
  });
  return Array.from(categorySet).sort();
}

// Helper: Filter by category
function filterByCategory(events: EventModel[], category: string): EventModel[] {
  if (category === "All") return events;
  return events.filter((e) => e.categories?.includes(category));
}

// Helper: Filter upcoming events
function filterUpcoming(events: EventModel[]): EventModel[] {
  const now = new Date();
  return events.filter((event) => new Date(event.startDateTime) > now);
}

// Helper: Sort by start date
function sortByStartDate(events: EventModel[]): EventModel[] {
  return [...events].sort(
    (a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
  );
}

export function useHomeEvents(
  userId: string | undefined,
  selectedCategory: string
): UseHomeEventsReturn {
  const [allEvents, setAllEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await eventApi.getAll();
      const events = response.data.map(mapEventDTO);
      setAllEvents(events);
    } catch (err: any) {
      setError(err.message || "Failed to fetch events");
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Process events
  const upcomingEvents = filterUpcoming(allEvents);

  // Split by host/attendee
  const myEventsRaw = upcomingEvents.filter((event) => event.hostId === userId);
  const incomingEventsRaw = upcomingEvents.filter(
    (event) =>
      event.hostId !== userId &&
      event.attendees?.some((attendeeId) => attendeeId === userId)
  );

  // Extract categories from all upcoming events
  const categories = extractCategories(upcomingEvents);

  // Apply category filter
  const myEventsFiltered = filterByCategory(myEventsRaw, selectedCategory);
  const incomingEventsFiltered = filterByCategory(incomingEventsRaw, selectedCategory);

  // Sort and limit to 5
  const myEvents = sortByStartDate(myEventsFiltered).slice(0, 5);
  const incomingEvents = sortByStartDate(incomingEventsFiltered).slice(0, 5);

  return {
    incomingEvents,
    myEvents,
    categories,
    loading,
    error,
    refetch: fetchEvents,
  };
}

