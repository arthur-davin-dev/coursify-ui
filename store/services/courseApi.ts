import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Lesson = {
  id: number;
  title: string;
  description: string;
  video_url: string;
  course_id: number;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  isPublished: boolean;
  teacherId?: number;
  teacherName?: string;
  categoryId?: number;
  categoryName?: string;           // ← add this
  category?: { id: number; name: string };
  tags?: string[];
  lessons?: Lesson[];
  rating?: number;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CourseResponse = {
  content: Course[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourses: builder.query<CourseResponse | Course[], void>({
      query: () => "/courses",
      providesTags: ["Course"],
    }),
    getCourseById: builder.query<Course, number>({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Course", id }],
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery } = courseApi;