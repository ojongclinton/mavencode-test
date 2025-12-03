import { createSlice } from "@reduxjs/toolkit";


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { 
      loading: false,
      error: null,
      stats: {}
   },
  reducers: {
    dahsboardStatsRequest: (state) => {
      state.loading = true;
    },
    fetchDashboardStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    },
    fetchDashboardStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});


export default dashboardSlice.reducer;
export const { fetchDashboardStatsFailure, fetchDashboardStatsSuccess,dahsboardStatsRequest } = dashboardSlice.actions;
