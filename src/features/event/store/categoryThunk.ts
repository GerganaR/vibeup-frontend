import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "../api/categoryApi";
import type { CategoryDTO } from "../types";

export const fetchCategories = createAsyncThunk<
  CategoryDTO[],
  void,
  { rejectValue: string }
>("event/categories/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await categoryApi.getAll();
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch categories");
  }
});

export const fetchCategoryById = createAsyncThunk<
  CategoryDTO,
  string,
  { rejectValue: string }
>("event/categories/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await categoryApi.getById(id);
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch category");
  }
});
