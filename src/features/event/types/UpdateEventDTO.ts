export interface UpdateEventDTO {
  title?: string;
  description?: string;
  categories?: string[];
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
}
