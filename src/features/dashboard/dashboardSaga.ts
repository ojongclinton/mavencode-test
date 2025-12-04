import { put, call, takeLatest, all } from "redux-saga/effects";
import {
  dahsboardAllRequest,
  dashboardSummaryStatsFailure,
  dashboardSummaryStatsSuccess,
  dashboardSummaryStatsRequest,
  dashboardAllRequestSuccess,
  dashboardGraphsSuccess,
  dashboardGraphsFailure,
  dashboardLineChartSuccess,
  dashboardLineChartFailure,
} from "./dashboardSlice";
import { getFakeChartGraphsStats, getFakeLinearChartData, getFakeSummaryStats } from "../mockApi";

function* fetchDashboardSummaryStatsSaga(): Generator<any, void, any> {
  try {
    const stats = yield call(getFakeSummaryStats);
    yield put(dashboardSummaryStatsSuccess(stats));
  } catch (e) {
    yield put(dashboardSummaryStatsFailure());
  }
}

function* fetchDashboardgraphsSaga(): Generator<any, void, any> {
  try {
    const stats = yield call(getFakeChartGraphsStats);
    console.log("them stats")
    console.log(stats)
    yield put(dashboardGraphsSuccess(stats));
  } catch (e) {
    yield put(dashboardGraphsFailure());
  }
}

function* fetchDashboardLineChartSaga(): Generator<any, void, any> {
  try {
    const stats = yield call(getFakeLinearChartData);
    yield put(dashboardLineChartSuccess(stats));
  } catch (e) {
    yield put(dashboardLineChartFailure());
  }
}

function* fetchAllDashboardSaga() {
  yield all([
    call(fetchDashboardSummaryStatsSaga),
    call(fetchDashboardgraphsSaga),
    call(fetchDashboardLineChartSaga),
  ]);

  yield put(dashboardAllRequestSuccess());
}

export function* watchDashboard() {
  yield takeLatest(dahsboardAllRequest.type, fetchAllDashboardSaga);

  yield takeLatest(
    dashboardSummaryStatsRequest.type,
    fetchDashboardSummaryStatsSaga
  );
}
