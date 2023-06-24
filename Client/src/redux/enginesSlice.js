import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listValidEngines } from "../modules/rentRequest/services/rentEngineService";

export const getEnginesList = createAsyncThunk("data/getEngines", async () => {
  try {
    const enginesData = await listValidEngines();
    //console.log("members data is ", membersData);
    return enginesData.data;
  } catch (error) {
    console.error("engines error is ", error);
  }
});


export const enginesSlice = createSlice({
  name: "engines",
  initialState: {
    //engins
    engines: [],
    enginesStatus: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnginesList.pending, (state, action) => {
        state.enginesStatus = "loading";
      })
      .addCase(getEnginesList.fulfilled, (state, action) => {
        state.enginesStatus = "success";
        state.engines = action.payload;
      })
      .addCase(getEnginesList.rejected, (state, action) => {
        state.enginesStatus = "failed";
      })
  }
});

export default enginesSlice.reducer;
