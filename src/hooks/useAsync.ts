import { useState, useCallback } from "react";

export function useApiAction<TArgs extends any[], TResult>(
  apiFn: (...args: TArgs) => Promise<TResult>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResult | null>(null);

  const execute = useCallback(
    async (...args: TArgs): Promise<TResult> => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFn(...args);
        setData(result);
        return result;
      } catch (err: any) {
        setError(err.message ?? "Unknown error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );

  return { execute, loading, error, data };
}
