import { eventApi } from "../api/eventApi";
import { mapEventDTO } from "../utils/mapEventDTO";
import type { CreateEventDTO, EventModel } from "../types";
import { useApiAction } from "@/hooks/useAsync";

export function useCreateEvent() {
  const { execute, loading, error, data } = useApiAction(
    async (payload: CreateEventDTO): Promise<EventModel> => {
      const response = await eventApi.create(payload);
      return mapEventDTO(response.data);
    }
  );

  return {
    createEvent: execute,
    createdEvent: data,
    loading,
    error,
  };
}
