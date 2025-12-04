import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "./types";

interface authState {
  isAuthenticated: boolean;
  user: UserType | null;
  loading: boolean;
  error: any;
}

const userStillLoggedIn = () => {
  let userObject = localStorage.getItem("LoggedInUser");

  if (userObject) {
    const realUser = JSON.parse(userObject);
    if (new Date(realUser.expireAt) > new Date()) {
      return realUser;
    } else {
      localStorage.removeItem("LoggedInUser");
      return null;
    }
  }
  return null;
};
const loggedUser = userStillLoggedIn();

let initialState: authState = {
  isAuthenticated: Boolean(loggedUser),
  user: loggedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("LoggedInUser");
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { loginRequest, logout, loginSuccess, loginFailure } =
  authSlice.actions;
