// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     // baseUrl: "http://localhost:8080/api",
//     baseUrl: "/api",
//     // baseUrl: `${process.env.NEXT_PUBLIC_API}/api`,
//     prepareHeaders: (headers, { getState }) => {
//       const state = getState() as any;
      
//       // Try every possible source
//       const token =
//         state.auth?.token ??
//         localStorage.getItem("user_token") ??
//         localStorage.getItem("token") ??
//         localStorage.getItem("accessToken") ??
//         localStorage.getItem("jwt");

//       console.log("=== prepareHeaders ===");
//       console.log("state.auth.token:", state.auth?.token);
//       console.log("localStorage user_token:", localStorage.getItem("user_token"));
//       console.log("final token:", token ? token.slice(0, 20) + "..." : "NONE");

//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//         console.log("✅ Header set!");
//       } else {
//         console.log("❌ No token anywhere!");
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Course", "Book", "Category", "User","Enrollment","BookmarkBooks","BookmarkCourses","Progress"],
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
  tagTypes: ["Course", "Book", "Category", "User","Enrollment","BookmarkBooks","BookmarkCourses","Progress"],
  endpoints: () => ({}),
});