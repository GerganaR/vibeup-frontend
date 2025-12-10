import { eventApi } from "../api/eventApi";
import { mapEventDTO } from "../utils/mapEventDTO";
import type { EventModel } from "../types";
import { useApiAction } from "@/hooks/useAsync";

export function useCancelRsvp() {
  const { execute, loading, error, data } = useApiAction(
    async (eventId: string): Promise<EventModel> => {
      const response = await eventApi.cancelRsvp(eventId);
      return mapEventDTO(response.data);
    }
  );

  return {
    cancelRsvp: execute,
    event: data,
    loading,
    error,
  };
}
