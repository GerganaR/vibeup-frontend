import type { Category } from "./Category";

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
  attendees: string[];
  cohosts: string[];
  createdAt: Date;
  updatedAt: Date;
}
