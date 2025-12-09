import api from "@/api/axios";
import type { User } from "../types/User";

export const userApi = {
  getCurrentUser: async (): Promise<User> => {
    const res = await api.get<User>("/users/me");
    return res.data;
  },
};
