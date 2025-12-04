import { createSlice } from "@reduxjs/toolkit";

interface DashboardSlice {
  loading: boolean;
  error: any;
  stats: any;
  summaryStats: {
    loading: boolean;
    error: boolean;
    data: any;
  };

  graphsStats: {
    data: any;
    loading: boolean;
    error: boolean;
  };
}

const initialState: DashboardSlice = {
  loading: false,
  error: null,
  stats: {},
  summaryStats: {
    data: [],
    loading: false,
    error: false,
  },

  graphsStats: {
    data: {},
    loading: false,
    error: false,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    dahsboardAllRequest: (state) => {
      state.loading = true;
    },

    dashboardAllRequestSuccess: (state) => {
      state.loading = false;
    },

    //Summary stats
    dashboardSummaryStatsRequest: (state) => {
      state.summaryStats.loading = true;
    },
    dashboardSummaryStatsSuccess: (state, action) => {
      state.summaryStats.data = action.payload;
    },
    dashboardSummaryStatsFailure: (state) => {
      state.summaryStats.error = true;
    },


    //graph stats
    dashboardGraphRequest: (state) => {
      state.graphsStats.loading = true;
    },
    dashboardGraphsSuccess: (state, action) => {
      state.graphsStats.data = action.payload;
    },
    dashboardGraphsFailure: (state) => {
      state.graphsStats.error = true;
    },
  },
});

export default dashboardSlice.reducer;
export const {
  dahsboardAllRequest,
  dashboardAllRequestSuccess,

  //Summary stats
  dashboardSummaryStatsRequest,
  dashboardSummaryStatsSuccess,
  dashboardSummaryStatsFailure,

  //graphsStats
  dashboardGraphRequest,
  dashboardGraphsSuccess,
  dashboardGraphsFailure

} = dashboardSlice.actions;
