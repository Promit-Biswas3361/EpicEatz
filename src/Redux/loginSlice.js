import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  role: null,
  restaurantId: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.email;
      state.error = null;
      state.role = action.payload.role;
      state.restaurantId = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.restaurantId = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.role = null;
      state.restaurantId = null;
      localStorage.removeItem("token");
    },
    setRestaurant: (state, action) => {
      state.restaurantId = action.payload.restaurantId;
    }
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;
export default loginSlice.reducer;
