import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../lib";
import { userApi } from "../services/userApi";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.current = action.payload;
      })
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      );
  },
});

export const { logout, resetUser } = userSlice.actions;
export default userSlice.reducer;
