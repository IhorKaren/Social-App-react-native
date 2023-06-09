import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;

      const { displayName: userName, email: userEmail, accessToken } = user;

      return { userEmail, accessToken, userName };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );

      const { user } = userCredential;

      await updateProfile(user, {
        displayName: displayName,
      });

      const { displayName: userName, email: userEmail, accessToken } = user;

      return { userEmail, accessToken, userName };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
