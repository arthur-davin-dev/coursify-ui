// // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // export type Book = {
// //   id: number;
// //   title: string;
// //   description: string;
// //   file_url: string;
// //   thumbnail: string;
// //   uploadedById?: number;
// //   uploadedByName?: string;
// //   categories?: string[];
// //   createdAt?: string;
// //   updatedAt?: string;
// // };

// // export type BookResponse = {
// //   content: Book[];
// //   totalElements: number;
// //   totalPages: number;
// //   number: number;
// //   size: number;
// // };

// // export const bookApi = createApi({
// //   reducerPath: "bookApi",
// //   baseQuery: fetchBaseQuery({
// //     baseUrl: "/api", // Uses the proxy defined in next.config
// //   }),
// //   tagTypes: ["Book"],
// //   endpoints: (builder) => ({
// //     getBooks: builder.query<BookResponse, void>({
// //       query: () => "/books",
// //       providesTags: ["Book"],
// //     }),
// //     getBookById: builder.query<Book, string | number>({
// //       query: (id) => `/books/${id}`,
// //       providesTags: (result, error, id) => [{ type: "Book", id }],
// //     }),
// //   }),
// // });

// // export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;

// import { baseApi } from "./baseApi";

// export type Book = {
//   id: number;
//   title: string;
//   description: string;
//   file_url: string;
//   thumbnail: string;
//   uploadedById?: number;
//   uploadedByName?: string;
//   categories?: string[];
//   createdAt?: string;
//   updatedAt?: string;
// };

// export type BookResponse = {
//   content: Book[];
//   totalElements: number;
//   totalPages: number;
//   number: number;
//   size: number;
// };

// export const bookApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getBooks: builder.query<BookResponse, void>({
//       query: () => "/books",
//       providesTags: ["Book"],
//     }),
//     getBookById: builder.query<Book, string | number>({
//       query: (id) => `/books/${id}`,
//       providesTags: (_result, _error, id) => [{ type: "Book", id }],
//     }),
//   }),
// });

// export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;

import { baseApi } from "./baseApi";

export type Book = {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  thumbnail: string;
  uploadedById?: number;
  uploadedByName?: string;
  category_ids?: number[];
  categories?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type BookResponse = {
  content: Book[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export interface CreateBookPayload {
  title: string;
  description: string;
  file_url: string;
  thumbnail: string;
  category_ids: number[];
}

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<BookResponse, void>({
      query: () => "/books",
      providesTags: ["Book"],
    }),
    getBookById: builder.query<Book, string | number>({
      query: (id) => `/books/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation<Book, CreateBookPayload>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<
      Book,
      { id: number } & Partial<CreateBookPayload>
    >({
      query: ({ id, ...body }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Book", id }],
    }),
    deleteBook: builder.mutation<void, number>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    getMyBooks: builder.query<BookResponse, void>({
      query: () => "/books/my-books",
      providesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetMyBooksQuery,
} = bookApi;
