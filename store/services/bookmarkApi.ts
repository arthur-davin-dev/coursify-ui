
import { baseApi } from "./baseApi";

export const bookmarkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ── BOOKS ──
    getMyBookmarkedBooks: builder.query<any[], void>({
      query: () => "/bookmarks/books",
      providesTags: ["BookmarkBooks"],
    }),
    bookmarkBook: builder.mutation<void, string>({
      query: (bookId) => ({
        url: `/bookmarks/books/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["BookmarkBooks"],
    }),
    removeBookmarkBook: builder.mutation<void, string>({
      query: (bookId) => ({
        url: `/bookmarks/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BookmarkBooks"],
    }),
    checkBookBookmark: builder.query<{ bookmarked: boolean }, string>({
      query: (bookId) => `/bookmarks/books/${bookId}/check`,
    }),

    // ── COURSES ──
    getMyBookmarkedCourses: builder.query<any[], void>({
      query: () => "/bookmarks/courses",
      providesTags: ["BookmarkCourses"],
    }),
    bookmarkCourse: builder.mutation<void, string>({
      query: (courseId) => ({
        url: `/bookmarks/courses/${courseId}`,
        method: "POST",
      }),
      invalidatesTags: ["BookmarkCourses"],
    }),
    removeBookmarkCourse: builder.mutation<void, string>({
      query: (courseId) => ({
        url: `/bookmarks/courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BookmarkCourses"],
    }),
    checkCourseBookmark: builder.query<{ bookmarked: boolean }, string>({
      query: (courseId) => `/bookmarks/courses/${courseId}/check`,
    }),

  }),
});

export const {
  useGetMyBookmarkedBooksQuery,
  useBookmarkBookMutation,
  useRemoveBookmarkBookMutation,
  useCheckBookBookmarkQuery,
  useGetMyBookmarkedCoursesQuery,
  useBookmarkCourseMutation,
  useRemoveBookmarkCourseMutation,
  useCheckCourseBookmarkQuery,
} = bookmarkApi;