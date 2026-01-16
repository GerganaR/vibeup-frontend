import { useState, useEffect } from "react";
import { categoryApi } from "../api/categoryApi";
import type { CategoryDTO } from "../types";

export function useGetCategories() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryApi.getAll();
        setCategories(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
