import { useState, useEffect, useCallback } from "react";
import { dashboardApi, type DashboardStats } from "../api/dashboardApi";
import { mapEventDTO } from "../utils/mapEventDTO";
import type { EventModel } from "../types";
import { useAppSelector } from "@/store/hooks";

interface UseDashboardReturn {
  stats: DashboardStats | null;
  attendingEvents: EventModel[];
  hostedEvents: EventModel[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDashboard(selectedCategory?: string): UseDashboardReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [attendingEvents, setAttendingEvents] = useState<EventModel[]>([]);
  const [hostedEvents, setHostedEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useAppSelector((state) => state.user.user);

  const fetchDashboardData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch in parallel
      const [statsRes, attendingRes, hostedRes] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getAttending(selectedCategory),
        dashboardApi.getHosted(selectedCategory),
      ]);

      setStats(statsRes.data);
      setAttendingEvents(attendingRes.data.map(mapEventDTO));
      setHostedEvents(hostedRes.data.map(mapEventDTO));
    } catch (err: any) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, [user, selectedCategory]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    attendingEvents,
    hostedEvents,
    loading,
    error,
    refetch: fetchDashboardData,
  };
}
