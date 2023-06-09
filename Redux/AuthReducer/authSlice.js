import { createSlice } from "@reduxjs/toolkit";
import { logIn, signUp } from "../operations";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["accessToken"],
};

const initialState = {
  user: { name: null, email: null },
  accessToken: null,
  isLoading: false,
  error: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      (state.user.email = null),
        (state.accessToken = null),
        (state.isLoggedIn = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user.email = action.payload.userEmail;
        state.user.name = action.payload.userName;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user.email = action.payload.userEmail;
        state.user.name = action.payload.userName;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { logOut } = authSlice.actions;

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

// .addCase(updateUser.fulfilled, (state, action) => {
//   state.user.name = action.payload.userName;
//   state.error = false;
// })
// .addCase(updateUser.rejected, (state) => {
//   state.error = true;
// });
