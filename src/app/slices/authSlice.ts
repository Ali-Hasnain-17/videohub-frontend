import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: Boolean(JSON.parse(localStorage.getItem("user")!)),
  user: JSON.parse(localStorage.getItem("user")!) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    unAuthenticate: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authenticate, unAuthenticate } = authSlice.actions;
export default authSlice.reducer;
