import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionHistoryApiSlice = createApi({
  reducerPath: 'transactionHistoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://twinclothinginventory.netlify.app/api/' }),
  tagTypes: ['TransactionHistory'],
  endpoints: (builder) => ({
    // Fetch all active transactions
    getTransactions: builder.query({
      query: () => 'transactionHistory/route',
      providesTags: ['TransactionHistory'],
    }),
    // Fetch a single transaction by ID
    getTransactionById: builder.query({
      query: (id) => `transactionHistory/${id}`,
      providesTags: ['TransactionHistory'],
    }),
    // Fetch deleted transactions (status = false)
    getDeletedTransactions: builder.query({
      query: () => 'transactionHistory/bin',
      providesTags: ['TransactionHistory'],
    }),
    // Add a new transaction
    addTransaction: builder.mutation({
      query: (newTransaction) => ({
        url: 'transactionHistory/route',
        method: 'POST',
        body: newTransaction,
      }),
      invalidatesTags: ['TransactionHistory'],
    }),
    // Update an existing transaction
    updateTransaction: builder.mutation({
      query: (updatedTransaction) => ({
        url: `transactionHistory/${updatedTransaction.id}`,
        method: 'PUT',
        body: updatedTransaction,
      }),
      invalidatesTags: ['TransactionHistory'],
    }),
    // Delete a transaction
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `transactionHistory/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TransactionHistory'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetDeletedTransactionsQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionHistoryApiSlice;
