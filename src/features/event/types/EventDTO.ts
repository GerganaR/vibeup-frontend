export interface EventDTO {
  id: string;
  title: string;
  description?: string;
  categories?: string[];
  startDateTime: string;
  endDateTime: string;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  hostId: string;
  attendees: string[];
  cohosts: string[];
  createdAt: string;
  updatedAt: string;
}
