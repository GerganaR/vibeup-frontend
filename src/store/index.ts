import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/store/userSlice";
import categoryReducer from "@/features/event/store/categorySlice";
import i18nReducer from "./i18nSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    i18n: i18nReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
