import { eventApi } from "../api/eventApi";
import { mapEventDTO } from "../utils/mapEventDTO";
import type { UpdateEventDTO, EventModel } from "../types";
import { useApiAction } from "@/hooks/useAsync";

export function useUpdateEvent() {
  const { execute, loading, error, data } = useApiAction(
    async (id: string, payload: UpdateEventDTO): Promise<EventModel> => {
      const response = await eventApi.update(id, payload);
      return mapEventDTO(response.data);
    }
  );

  return {
    updateEvent: execute,
    updatedEvent: data,
    loading,
    error,
  };
}
