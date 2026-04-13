// import { baseApi } from "../../services/baseApi";

// export type UserInfo = {
//   id: number;
//   username: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   role: "STUDENT" | "TEACHER" | "ADMIN";
//   imageUrl: string;       // ← not profile_url
//   createdAt: string;
// };

// export const userSlice = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getTeacherInfo: builder.query<UserInfo, number | undefined>({
//       query: (id) => `/users/${id}`,
//       providesTags: ["User"],
//     }),
//     getUserInfo: builder.query<UserInfo, void>({
//       query: () => "/users/me",
//       providesTags: ["User"],
//     }),
//   }),
// });

// export const { useGetTeacherInfoQuery, useGetUserInfoQuery } = userSlice;



import { baseApi } from "../../services/baseApi";

export type UserInfo = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  imageUrl: string;
  bgImageUrl: string | null;
  bio: string | null;
  createdAt: string;
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