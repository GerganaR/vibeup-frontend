import type { Category } from "./Category";

export interface EventAttendee {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface EventModel {
  id: string;
  title: string;
  description?: string;
  categories: Category[];
  startDateTime: Date;
  endDateTime: Date;
  address: string;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  hostId: string;
  host?: { id: string; name: string; avatarUrl?: string };
  attendees: EventAttendee[];
  cohosts: string[];
  createdAt: Date;
  updatedAt: Date;
}
