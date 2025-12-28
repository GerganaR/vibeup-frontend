export interface CreateEventDTO {
    title: string;
    description?: string;
    categories?: string[];
    startDateTime: string;
    endDateTime: string;
    address: string;
    latitude?: number;
    longitude?: number;
    capacity?: number;
  }
  