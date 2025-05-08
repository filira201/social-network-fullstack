import type { Like } from "../lib";
import { api } from "./api";

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: (like) => ({
        url: "/likes",
        method: "POST",
        body: like,
      }),
    }),

    unlikePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likeApi;

export const {
  endpoints: { likePost, unlikePost },
} = likeApi;
