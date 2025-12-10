import { eventApi } from "../api/eventApi";
import { useApiAction } from "@/hooks/useAsync";

export function useDeleteEvent() {
  const { execute, loading, error } = useApiAction(async (id: string) => {
    await eventApi.delete(id);
    return true;
  });

  return {
    deleteEvent: execute,
    loading,
    error,
  };
}
