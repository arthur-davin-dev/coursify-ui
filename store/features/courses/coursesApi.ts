import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Lesson {
  title: string;
  description: string;
  video_url: string;
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  category_id: number;
  thumbnail?: string;
  price: number;
  isPublished: boolean;
  tags: string[];
  lessons: Lesson[];
}

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    // ✅ Attach token from localStorage on every request
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation<void, CreateCoursePayload>({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = coursesApi;