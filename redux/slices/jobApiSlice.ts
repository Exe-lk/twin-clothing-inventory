import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobApiSlice = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    // Fetch all jobs
    getJobs: builder.query({
      query: () => 'job/route',
      providesTags: ['Job'],
    }),
    // Fetch a single job by ID
    getJobById: builder.query({
      query: (id) => `job/${id}`,
      providesTags: ['Job'],
    }),
    // Fetch deleted jobs (status = false)
    getDeletedJobs: builder.query({
      query: () => 'job/bin',
      providesTags: ['Job'],
    }),
    // Add a new job
    addJob: builder.mutation({
      query: (newJob) => ({
        url: 'job/route',
        method: 'POST',
        body: newJob,
      }),
      invalidatesTags: ['Job'],
    }),
    // Update an existing job
    updateJob: builder.mutation({
      query: (updatedJob) => ({
        url: `job/${updatedJob.id}`,
        method: 'PUT',
        body: updatedJob,
      }),
      invalidatesTags: ['Job'],
    }),
    // Soft delete a job
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `job/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Job'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useGetDeletedJobsQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApiSlice;
