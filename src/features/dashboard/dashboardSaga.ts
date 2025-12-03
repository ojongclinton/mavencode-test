
import {put,call, takeLatest} from "redux-saga/effects";
import { fetchDashboardStatsFailure, fetchDashboardStatsSuccess,dahsboardStatsRequest } from "./dashboardSlice";
import { getFakeDashboardStats } from "../auth/mockApi";

function* fetchDashboardStatsSaga(): Generator<any, void, any> {
  try {
    const stats = yield call(getFakeDashboardStats);
    yield put(fetchDashboardStatsSuccess(stats));
  } catch (err) {
    yield put(fetchDashboardStatsFailure("Failed to load stats"));
  }
}


export function* watchDashboard() {
  yield takeLatest(dahsboardStatsRequest.type, fetchDashboardStatsSaga);
}
