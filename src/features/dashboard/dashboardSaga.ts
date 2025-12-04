import { put, call, takeLatest, all } from "redux-saga/effects";
import {
  dahsboardAllRequest,
  dashboardSummaryStatsFailure,
  dashboardSummaryStatsSuccess,
  dashboardSummaryStatsRequest,
  dashboardAllRequestSuccess,
  dashboardGraphsSuccess,
  dashboardGraphsFailure,
} from "./dashboardSlice";
import { getFakeGraphsStats, getFakeSummaryStats } from "../mockApi";

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
    const stats = yield call(getFakeGraphsStats);
    yield put(dashboardGraphsSuccess(stats));
  } catch (e) {
    yield put(dashboardGraphsFailure());
  }
}

function* fetchAllDashboardSaga() {
  yield all([
    call(fetchDashboardSummaryStatsSaga),
    call(fetchDashboardgraphsSaga),
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
