import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../config";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fake",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      async queryFn({ postId }) {
        try {
          const userCommentsRef = collection(db, "posts", postId, "comments");
          const querySnapshot = await getDocs(userCommentsRef);
          let comments = [];
          querySnapshot.forEach((doc) => {
            comments.push({ id: doc.id, ...doc.data() });
          });
          return { data: comments };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, postId) => [{ type: "Comments", postId }],
    }),
    addComment: builder.mutation({
      async queryFn({ postId, newComment }) {
        try {
          const userCommentsRef = collection(db, "posts", postId, "comments");
          const docRef = await addDoc(userCommentsRef, newComment);
          return { data: { id: docRef.id, ...newComment } };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", postId },
      ],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi;
