import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
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

      const {
        photoURL: photoUri,
        displayName: userName,
        email: userEmail,
        accessToken,
      } = user;

      return { userEmail, accessToken, userName, photoUri };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, displayName, photoURL }, { rejectWithValue }) => {
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
        photoURL: photoURL,
      });

      const {
        photoURL: photoUri,
        displayName: userName,
        email: userEmail,
        accessToken,
      } = user;

      return { userEmail, accessToken, userName, photoUri };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async ({ photoURL }, { rejectWithValue }) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
