import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listCategories } from "../modules/renterDashboard/services/renterService";

export const getCategoriesList = createAsyncThunk("data/getCategories", async () => {
  try {
    const categoriesData = await listCategories();
    //console.log("members data is ", membersData);
    return categoriesData.data;
  } catch (error) {
    console.error("category error is ", error);
  }
});


export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    //categories
    categories: [],
    categoriesStatus: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesList.pending, (state, action) => {
        state.categoriesStatus = "loading";
      })
      .addCase(getCategoriesList.fulfilled, (state, action) => {
        state.categoriesStatus = "success";
        state.categories = action.payload;
      })
      .addCase(getCategoriesList.rejected, (state, action) => {
        state.categoriesStatus = "failed";
      })
  }
});

export default categoriesSlice.reducer;
