import { eventApi } from "../api/eventApi";
import { mapEventDTO } from "../utils/mapEventDTO";
import type { EventModel } from "../types";
import { useApiAction } from "@/hooks/useAsync";

export function useGetEvents() {
  const { execute, loading, error, data } = useApiAction(async () => {
    const events = await eventApi.getAll();
    return events.data.map(mapEventDTO) as EventModel[];
  });

  return {
    getEvents: execute,
    events: data,
    loading,
    error,
  };
}

