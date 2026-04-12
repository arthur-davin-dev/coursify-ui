// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const baseApi = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: '/api', // This matches the rewrite source
//     prepareHeaders: (headers, { getState }) => {
//       // Logic to grab token from authSlice
//       const token = (getState() as any).auth.token;
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      
      // Try every possible source
      const token =
        state.auth?.token ??
        localStorage.getItem("user_token") ??
        localStorage.getItem("token") ??
        localStorage.getItem("accessToken") ??
        localStorage.getItem("jwt");

      console.log("=== prepareHeaders ===");
      console.log("state.auth.token:", state.auth?.token);
      console.log("localStorage user_token:", localStorage.getItem("user_token"));
      console.log("final token:", token ? token.slice(0, 20) + "..." : "NONE");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        console.log("✅ Header set!");
      } else {
        console.log("❌ No token anywhere!");
      }
      return headers;
    },
  }),
  tagTypes: ["Course", "Book", "Category", "User"],
  endpoints: () => ({}),
});