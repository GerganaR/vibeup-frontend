import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import type { User } from "../types/User";

export const fetchCurrentUser = createAsyncThunk<User>(
  "user/fetchCurrentUser",
  async () => {
    return await userApi.getCurrentUser();
  }
);
