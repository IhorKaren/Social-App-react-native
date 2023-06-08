import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
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
