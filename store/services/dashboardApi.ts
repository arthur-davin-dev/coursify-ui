import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Already exists — returns Course[]
    getMyCourses: builder.query<any[], void>({
      query: () => "/courses/my-courses",
      providesTags: ["Course"],
    }),
    // Already exists — returns BookResponse
    getMyBooks: builder.query<any, void>({
      query: () => "/books/my-books",
      providesTags: ["Book"],
    }),
    // Add based on your actual endpoint
    getMyEnrollments: builder.query<any, void>({
      query: () => "/enrollments/my-enrollments",
    }),
  }),
});

export const {
  useGetMyCoursesQuery,
  useGetMyBooksQuery,
  useGetMyEnrollmentsQuery,
} = dashboardApi;