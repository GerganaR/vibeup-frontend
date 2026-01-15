import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/store/userSlice";
import categoryReducer from "@/features/event/store/categorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
