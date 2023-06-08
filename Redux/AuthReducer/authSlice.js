import { createSlice } from "@reduxjs/toolkit";
import { login } from "../operations";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["accessToken"],
};

const initialState = {
  user: { email: null },
  accessToken: null,
  isLoading: false,
  error: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.email = action.payload.userEmail;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
