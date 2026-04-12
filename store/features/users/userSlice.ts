// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export type UserInfo = {
//   id: number;
//   full_name: string;
//   profile_url: string;
//   role: string;
// };

// export const userSlice = createApi({
//   reducerPath: "userApi",
//   // Ensure this also uses the proxy path to hide localhost:8080
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   endpoints: (builder) => ({
//     getTeacherInfo: builder.query<UserInfo, number | undefined>({
//       query: (id) => `/users/${id}`,
//     }),
//     getUserInfo: builder.query<UserInfo, void>({
//       query: () => "/users/me",
//     }),
//   }),
// });

// export const { useGetTeacherInfoQuery, useGetUserInfoQuery } = userSlice;



import { baseApi } from "../../services/baseApi";

export type UserInfo = {
  id: number;
  full_name: string;
  profile_url: string;
  role: string;
};

export const userSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherInfo: builder.query<UserInfo, number | undefined>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    getUserInfo: builder.query<UserInfo, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetTeacherInfoQuery, useGetUserInfoQuery } = userSlice;