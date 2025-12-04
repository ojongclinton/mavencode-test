import { createSlice } from "@reduxjs/toolkit";
import type { CommitActivity, LineChartItem } from "./types";

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
    data: {
      pieChart:any;
      doughnutChart:any;
    }
    loading: boolean;
    error: boolean;
  };

  lineChart: {
    data: {
      usersData: CommitActivity[];
      points: LineChartItem[];
    };
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
    data: {
      pieChart:null,
      doughnutChart:null
    },
    loading: false,
    error: false,
  },

  lineChart: {
    data: {
      points:[],
      usersData:[]
    },
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
      state.graphsStats.loading = true;
      state.lineChart.loading = true;
      state.summaryStats.loading = true;
    },

    dashboardAllRequestSuccess: (state) => {
      state.loading = false;
      state.graphsStats.loading = false;
      state.lineChart.loading = false;
      state.summaryStats.loading = false;
    },

    //Summary stats
    dashboardSummaryStatsRequest: (state) => {
      state.summaryStats.loading = true;
    },
    dashboardSummaryStatsSuccess: (state, action) => {
      state.summaryStats.data = action.payload;
      state.summaryStats.loading = false
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

    //Line chart data
    dashboardLineChartRequest: (state) => {
      state.lineChart.loading = true;
    },
    dashboardLineChartSuccess: (state, action) => {
      state.lineChart.data = action.payload;
      state.lineChart.loading = false;
    },
    dashboardLineChartFailure: (state) => {
      state.lineChart.error = true;
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
  dashboardGraphsFailure,

  //lineCHart
  dashboardLineChartRequest,
  dashboardLineChartSuccess,
  dashboardLineChartFailure,
} = dashboardSlice.actions;
