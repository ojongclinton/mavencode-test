import { put, call, takeLatest, all } from "redux-saga/effects";
import {
  dahsboardAllRequest,
  dashboardSummaryStatsFailure,
  dashboardSummaryStatsSuccess,
  dashboardSummaryStatsRequest,
  dashboardAllRequestSuccess,
} from "./dashboardSlice";
import { getFakeSummaryStats } from "../mockApi";

function* fetchDashboardSummaryStatsSaga(): Generator<any, void, any> {
  try {
    // yield put(dashboardSummaryStatsRequest());

    const stats = yield call(getFakeSummaryStats);
    yield put(dashboardSummaryStatsSuccess(stats));
  } catch (e) {
    yield put(dashboardSummaryStatsFailure());
  }
}

function* fetchAllDashboardSaga() {
  yield all([call(fetchDashboardSummaryStatsSaga)]);

  yield put(dashboardAllRequestSuccess());
}

export function* watchDashboard() {
  yield takeLatest(dahsboardAllRequest.type, fetchAllDashboardSaga);

  yield takeLatest(
    dashboardSummaryStatsRequest.type,
    fetchDashboardSummaryStatsSaga
  );
}
