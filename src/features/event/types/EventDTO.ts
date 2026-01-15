import type { Category } from "./Category";

export interface EventDTO {
  id: string;
  title: string;
  description?: string;
  categories: Category[];
  startDateTime: string;
  endDateTime: string;
  address: string;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  hostId: string;
  attendees: { id: string; name: string; avatarUrl?: string }[];
  cohosts: string[];
  createdAt: string;
  updatedAt: string;
}
