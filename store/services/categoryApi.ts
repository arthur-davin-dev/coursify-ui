import { baseApi } from "@/store/services/baseApi";

export interface Category {
  id: number | string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/categories
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    // GET /api/categories/:id
    getCategoryById: builder.query<Category, number | string>({
      query: (id) => `/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Category", id }],
    }),

    // POST /api/categories
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    // PUT /api/categories/:id
    updateCategory: builder.mutation<
      Category,
      { id: number | string; body: Partial<Category> }
    >({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Category", id },
        "Category",
      ],
    }),

    // DELETE /api/categories/:id
    deleteCategory: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Category", id },
        "Category",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;