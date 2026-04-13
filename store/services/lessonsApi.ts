import { baseApi } from "./baseApi";

export interface LessonPayload {
  title: string;
  description?: string;
  video_url: string;
}

export interface AddLessonsArgs {
  courseId: number;
  lessons: LessonPayload[];
}

export const lessonsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addLessons: builder.mutation<void, AddLessonsArgs>({
      query: ({ courseId, lessons }) => ({
        url: "/lessons/batch",
        method: "POST",
        body: { courseId, lessons },
      }),
      invalidatesTags: ["Course"],
    }),
    getLessonsByCourse: builder.query<any[], number>({
      query: (courseId) => `/lessons?courseId=${courseId}`,
    }),
    deleteLesson: builder.mutation<void, number>({
      query: (lessonId) => ({
        url: `/lessons/${lessonId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useAddLessonsMutation,
  useGetLessonsByCourseQuery,
  useDeleteLessonMutation,
} = lessonsApi;