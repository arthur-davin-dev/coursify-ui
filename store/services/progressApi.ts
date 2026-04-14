import { baseApi } from "./baseApi";

// Matches your ProgressResponse exactly
export interface ProgressResponse {
  id: number;
  studentId: number;
  courseId: number;
  courseTitle: string;
  progressPercent: number;        // 0-100 — only field backend stores
  lastAccessedAt: string;
}

// Matches your UpdateProgressRequest
export interface UpdateProgressRequest {
  progressPercent: number;        // only send this to backend
}

export const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET /api/progress/course/{courseId}
    // getCourseProgress: builder.query<ProgressResponse, string>({
    //   query: (courseId) => `/progress/course/${courseId}`,
    //   providesTags: (_r, _e, courseId) => [{ type: "Progress", id: courseId }],
    // }),

    getCourseProgress: builder.query<ProgressResponse | null, string>({
  query: (courseId) => `/progress/course/${courseId}`,
  transformResponse: (res: any) => res ?? null,
  // ✅ Don't crash on 404/empty — return null
  transformErrorResponse: () => null,
  providesTags: (_r, _e, courseId) => [{ type: "Progress", id: courseId }],
}),

    // PUT /api/progress/course/{courseId}
    updateCourseProgress: builder.mutation<ProgressResponse, {
      courseId: string;
      progressPercent: number;    // only field your backend accepts
    }>({
      query: ({ courseId, progressPercent }) => ({
        url: `/progress/course/${courseId}`,
        method: "PUT",
        body: { progressPercent },  // matches UpdateProgressRequest record
      }),
      invalidatesTags: (_r, _e, { courseId }) => [
        { type: "Progress", id: courseId },
        "Progress",
      ],
    }),

    // GET /api/progress/my-progress
    getMyProgress: builder.query<ProgressResponse[], void>({
      query: () => `/progress/my-progress`,
      providesTags: ["Progress"],
    }),

  }),
});

export const {
  useGetCourseProgressQuery,
  useUpdateCourseProgressMutation,
  useGetMyProgressQuery,
} = progressApi;