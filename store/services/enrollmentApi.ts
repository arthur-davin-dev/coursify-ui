// import { baseApi } from "./baseApi";

// export interface Enrollment {
//   id: number;
//   studentId: number;
//   studentUsername: string;
//   courseId: number;
//   courseTitle: string;
//   status: string;
//   enrolledAt: string;
//   progress?: number;
//   completed?: boolean;
//   thumbnail?: string | null;
//   instructorName?: string;
// }

// export interface EnrolledCourse {
//   id: number;
//   title: string;
//   thumbnail: string;      // keep this for the UI
//   instructorName: string;
//   progress: number;
//   completed: boolean;
// }

// const enrollmentApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getMyEnrollments: builder.query<Enrollment[], void>({
//       query: () => "/enrollments/my",
//       providesTags: ["Enrollment"],
//     }),
//     getMyEnrolledCourses: builder.query<EnrolledCourse[], void>({
//       query: () => "/enrollments/my",
//       transformResponse: (response: Enrollment[]) => {
//         const list = Array.isArray(response)
//           ? response
//           : (response as any)?.content ?? [];
//         return list.map((e: Enrollment) => ({
//           id: e.courseId,
//           title: e.courseTitle,
//           thumbnail: e.courseImageUrl ?? fallbackUrl,
//           instructorName: e.instructorName ?? "Instructor",
//           progress: e.progress ?? 0,
//           completed: e.completed ?? false,
//         }));
//       },
//       providesTags: ["Enrollment"],
//     }),
//     enrollCourse: builder.mutation<Enrollment, number>({
//       query: (courseId) => ({
//         url: `/enrollments/${courseId}`,   // → [id]/route.ts POST
//         method: "POST",
//       }),
//       invalidatesTags: ["Enrollment"],
//     }),
//     cancelEnrollment: builder.mutation<void, number>({
//       query: (enrollmentId) => ({
//         url: `/enrollments/${enrollmentId}`, // → [id]/route.ts DELETE
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Enrollment"],
//     }),
//     isEnrolled: builder.query<boolean, number>({
//       query: (courseId) => `/enrollments/check/${courseId}`, // → check/[courseId]
//       providesTags: ["Enrollment"],
//     }),
//     getEnrollmentsByCourse: builder.query<Enrollment[], number>({
//       query: (courseId) => `/enrollments/courses/${courseId}`, // → courses/[courseId]
//       providesTags: ["Enrollment"],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetMyEnrollmentsQuery,
//   useGetMyEnrolledCoursesQuery,
//   useEnrollCourseMutation,
//   useCancelEnrollmentMutation,
//   useIsEnrolledQuery,
//   useGetEnrollmentsByCourseQuery,
// } = enrollmentApi;

import { baseApi } from "./baseApi";
import { Course } from "./courseApi"; // Assuming Course type is exported from there

export interface Enrollment {
  id: number;
  studentId: number;
  studentUsername: string;
  courseId: number;
  courseTitle: string;
  status: string;
  enrolledAt: string;
  progress?: number;
  completed?: boolean;
  thumbnail?: string | null;
  courseImageUrl?: string; // Matching your transformResponse usage
  instructorName?: string;
}

export interface EnrolledCourse {
  id: number;
  title: string;
  thumbnail: string;
  instructorName: string;
  progress: number;
  completed: boolean;
}

const fallbackUrl = "/placeholder-course.png";

const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyEnrollments: builder.query<Enrollment[], void>({
      query: () => "/enrollments/my",
      providesTags: ["Enrollment"],
    }),

    // Detailed view specifically for enrolled students (includes video URLs, etc.)
    getEnrolledCourseDetail: builder.query<Course, number>({
      query: (courseId) => `/enrollments/course/${courseId}/detail`,
      providesTags: (_result, _error, id) => [
        { type: "Course", id },
        "Enrollment",
      ],
    }),

    // getMyEnrolledCourses: builder.query<EnrolledCourse[], void>({
    //   query: () => "/enrollments/my",
    //   transformResponse: (
    //     response: Enrollment[] | { content: Enrollment[] },
    //   ) => {
    //     const list = Array.isArray(response)
    //       ? response
    //       : ((response as any)?.content ?? []);

    //     return list.map((e: Enrollment) => ({
    //       id: e.courseId,
    //       title: e.courseTitle,
    //       thumbnail: e.courseImageUrl ?? e.thumbnail ?? fallbackUrl,
    //       instructorName: e.instructorName ?? "Instructor",
    //       progress: e.progress ?? 0,
    //       completed: e.completed ?? false,
    //     }));
    //   },
    //   providesTags: ["Enrollment"],
    // }),
    getMyEnrolledCourses: builder.query<EnrolledCourse[], void>({
      query: () => "/enrollments/my",
      transformResponse: (response: any) => {
        const list = Array.isArray(response)
          ? response
          : (response?.content ?? []);

        console.log("🔍 Raw enrollment[0]:", list[0]); // Remove after debugging

        return list.map((e: any) => ({
          // Handle both camelCase and snake_case from backend
          id: e.courseId ?? e.course_id ?? e.id,
          title: e.courseTitle ?? e.course_title ?? e.title ?? "Untitled",
          thumbnail:
            e.courseImageUrl ??
            e.course_image_url ??
            e.thumbnail ??
            fallbackUrl,
          instructorName: e.instructorName ?? e.instructor_name ?? "Instructor",
          progress: e.progress ?? e.progressPercent ?? 0,
          completed: e.completed ?? false,
        }));
      },
      providesTags: ["Enrollment"],
    }),

    // enrollmentApi.ts

    enrollCourse: builder.mutation<Enrollment, number>({
      query: (courseId) => ({
        url: `/enrollments/${courseId}`,
        method: "POST",
      }),
      // Before: invalidatesTags: ["Enrollment", "Course"],
      // After ↓ — forces getMyEnrolledCourses AND isEnrolled to both refetch
      invalidatesTags: (_result, _error, courseId) => [
        "Enrollment",
        "Course",
        { type: "Enrollment", id: courseId },
        { type: "Course", id: courseId },
      ],
      // ✅ Optimistic update — course appears instantly before refetch
      async onQueryStarted(courseId, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: newEnrollment } = await queryFulfilled;
          // Force immediate refetch of the enrolled courses list
          dispatch(enrollmentApi.util.invalidateTags(["Enrollment"]));
        } catch {}
      },
    }),

    cancelEnrollment: builder.mutation<void, number>({
      query: (enrollmentId) => ({
        url: `/enrollments/${enrollmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Enrollment", "Course"],
    }),

    isEnrolled: builder.query<{ isEnrolled: boolean }, number>({
      query: (courseId) => `/enrollments/check/${courseId}`,
      providesTags: (_result, _error, id) => [{ type: "Enrollment", id }],
    }),

    getEnrollmentsByCourse: builder.query<Enrollment[], number>({
      query: (courseId) => `/enrollments/courses/${courseId}`,
      providesTags: ["Enrollment"],
    }),
    getTeacherStats: builder.query<{ totalEnrollments: number }, void>({
      query: () => "/enrollments/teacher/stats",
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyEnrollmentsQuery,
  useGetMyEnrolledCoursesQuery,
  useGetEnrolledCourseDetailQuery, // Use this for the "Study" page
  useEnrollCourseMutation,
  useCancelEnrollmentMutation,
  useIsEnrolledQuery,
  useGetEnrollmentsByCourseQuery,
  useGetTeacherStatsQuery,
} = enrollmentApi;
