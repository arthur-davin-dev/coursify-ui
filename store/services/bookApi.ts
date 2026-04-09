import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Book = {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  thumbnail: string;
  uploadedById?: number;
  uploadedByName?: string;
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

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Uses the proxy defined in next.config
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<BookResponse, void>({
      query: () => "/books",
      providesTags: ["Book"],
    }),
    getBookById: builder.query<Book, string | number>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;