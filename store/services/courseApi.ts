import { baseApi } from "./baseApi";

export type Lesson = {
  id?: number;
  title: string;
  description: string;
  video_url: string;
  course_id?: number;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  imageUrl?: string;
  price: number;
  isPublished: boolean;
  teacherId?: number;
  teacherName?: string;
  categoryId?: number;
  categoryName?: string;
  category?: { id: number; name: string };
  tags?: string[];
  lessons?: Lesson[];
  rating?: number;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
  teacherImageUrl?: string | null;
};

export type CourseResponse = {
  content: Course[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface CreateCoursePayload {
  title: string;
  description: string;
  category_id: number;
  thumbnail?: string;
 
  price: number;
  isPublished: boolean;
  tags: string[];
  lessons: {
    title: string;
    description: string;
    video_url: string;
  }[];
}

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<CourseResponse | Course[], void>({
      query: () => "/courses",
      providesTags: ["Course"],
    }),
    getCourseById: builder.query<Course, number>({
      query: (id) => `/courses/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Course", id }],
    }),
    getMyCourses: builder.query<Course[], void>({
      query: () => "/courses/my-courses",
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation<Course, CreateCoursePayload>({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
      
    }),
    updateCourse: builder.mutation<
      Course,
      { id: number; body: Partial<CreateCoursePayload> }>
      ({
      query: ({ id, body }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Course", id }],
    }),
    deleteCourse: builder.mutation<void, number>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    publishCourse: builder.mutation<Course, number>({
      query: (id) => ({
        url: `/courses/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: (_r, _e, id) => [{ type: "Course", id }],
    }),
    // getEnrollmentsByCourse: builder.query<any[], number>({
    //   query: (courseId) => `/api/enrollments/course/${courseId}`,
    // }),
  }),
  overrideExisting: true,
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetMyCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  usePublishCourseMutation,
  // useGetEnrollmentsByCourseQuery,
} = courseApi;
