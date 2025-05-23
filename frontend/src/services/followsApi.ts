import { api } from "./api";

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: (follow) => ({
        url: "/follow",
        method: "POST",
        body: follow,
      }),
    }),

    unFollowUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/unfollow/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFollowUserMutation, useUnFollowUserMutation } = followApi;

export const {
  endpoints: { followUser, unFollowUser },
} = followApi;
