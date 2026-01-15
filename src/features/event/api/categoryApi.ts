import api from "@/api/axios";
import type { CategoryDTO } from "../types";


export const categoryApi = {
  getAll: () => api.get<CategoryDTO[]>("/categories"),

  getById: (id: string) => api.get<CategoryDTO>(`/categories/${id}`),
};
