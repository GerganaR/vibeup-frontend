export interface CreateEventDTO {
    title: string;
    description?: string;
    categoryIds?: string[];
    startDateTime: string;
    endDateTime: string;
    address: string;
    latitude?: number;
    longitude?: number;
    capacity?: number;
  }
  