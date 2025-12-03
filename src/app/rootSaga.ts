import { all } from "redux-saga/effects";
import { watchAuth } from "../features/auth/authSaga";
import { watchDashboard } from "../features/dashboard/dashboardSaga";

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchDashboard()
  ])
}
