export interface EventModel {
    id: string;
    title: string;
    description?: string;
    categories?: string[];
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
  