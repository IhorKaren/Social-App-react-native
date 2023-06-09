import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { async } from "@firebase/util";

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

      const { email: userEmail, accessToken } = user;

      return { userEmail, accessToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;
      console.log(userCredential);

      const { email: userEmail, accessToken } = user;

      return { userEmail, accessToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
