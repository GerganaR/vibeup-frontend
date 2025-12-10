import api from "@/api/axios";
import type { EventDTO, CreateEventDTO, UpdateEventDTO } from "../types";

export const eventApi = {
  getAll: () => api.get<EventDTO[]>("/events"),

  getById: (id: string) => api.get<EventDTO>(`/events/${id}`),

  create: (data: CreateEventDTO) => api.post<EventDTO>("/events", data),

  update: (id: string, data: UpdateEventDTO) =>
    api.put<EventDTO>(`/events/${id}`, data),

  delete: (id: string) => api.delete(`/events/${id}`),

  rsvp: (id: string) => api.post<EventDTO>(`/events/${id}/rsvp`),

  cancelRsvp: (id: string) => api.delete<EventDTO>(`/events/${id}/rsvp`),
};
