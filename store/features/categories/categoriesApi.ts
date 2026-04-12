// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface Category {
//   id: number;
//   name: string;
//   description?: string;
// }

// export const categoriesApi = createApi({
//   reducerPath: "categoriesApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   endpoints: (builder) => ({
//     getCategories: builder.query<Category[], void>({
//       query: () => "/categories",
//     }),
//   }),
// });

// export const { useGetCategoriesQuery } = categoriesApi;


import { baseApi } from "@/store/services/baseApi"; // ✅ correct path

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;