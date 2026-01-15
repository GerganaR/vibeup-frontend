import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories, fetchCategoryById } from "./categoryThunk";
import type { CategoryDTO } from "../types";


interface CategoryState {
  items: CategoryDTO[];
  selected: CategoryDTO | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "event/categories",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      // fetch all
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<CategoryDTO[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // fetch by id
      .addCase(fetchCategoryById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategoryById.fulfilled,
        (state, action: PayloadAction<CategoryDTO>) => {
          state.selected = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default categorySlice.reducer;
