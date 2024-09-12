// redux/slices/categoryApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApiSlice = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    // Read: Fetch all categories
    getCategories: builder.query({
      query: () => 'category/route',
      providesTags: ['Category'], // The endpoint to fetch all categories
    }),
    // Create: Add a new category
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: 'category/route',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    // Update: Update an existing category
    updateCategory: builder.mutation({
      query: ({ id, ...updatedCategory }) => ({
        url: `category/route/${id}`,
        method: 'PUT',
        body: updatedCategory,
      }),
    }),
    // Delete: Delete a category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/route/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
