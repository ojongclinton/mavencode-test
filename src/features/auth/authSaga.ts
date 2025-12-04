import { loginFailure, loginRequest, loginSuccess } from "./authSlice";
import { put, call, takeLatest } from "redux-saga/effects";
import { fakeLoginApi } from "../mockApi";

type LoginAction = {
  type: "LOGIN_REQUEST";
  payload: {
    email: string;
    password: string;
  };
};

function* loginSaga(action: LoginAction): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;
    const response = yield call(fakeLoginApi, email, password);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure("Invalid credentials"));
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, loginSaga);
}
