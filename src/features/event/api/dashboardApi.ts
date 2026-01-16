import api from "@/api/axios";
import type { EventDTO } from "../types";

export interface DashboardStats {
  upcomingCount: number;
  attendingCount: number;
  hostedCount: number;
}

export const dashboardApi = {
  getStats: () => api.get<DashboardStats>("/events/stats"),

  getAttending: (categoryId?: string) =>
    api.get<EventDTO[]>("/events/attending", {
      params: { categoryId: categoryId === "All" ? undefined : categoryId },
    }),

  getHosted: (categoryId?: string) =>
    api.get<EventDTO[]>("/events/hosted", {
      params: { categoryId: categoryId === "All" ? undefined : categoryId },
    }),
};
