export interface UpdateEventDTO {
  title?: string;
  description?: string;
  categoryIds?: string[];
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
}
