import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../config";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fake",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn({ userId }) {
        try {
          const userPostsRef = collection(db, "users", userId, "posts");
          const querySnapshot = await getDocs(userPostsRef);
          let posts = [];
          querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
          });
          return { data: posts };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, userId) => [{ type: "Posts", userId }],
    }),
    addPost: builder.mutation({
      async queryFn({ userId, newPost }) {
        try {
          const userPostsRef = collection(db, "users", userId, "posts");
          const docRef = await addDoc(userPostsRef, newPost);
          return { data: { id: docRef.id, ...newPost } };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: "Posts", userId },
      ],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = postsApi;
