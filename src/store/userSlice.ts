import api from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk<User, void>(
  "user/fetchCurrentUser",
  async () => {
    const { data } = await api.get<User>("/auth/me");
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<User>) => {
    //   state.user = action.payload;
    // },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch current user";
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  //  setUser,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
