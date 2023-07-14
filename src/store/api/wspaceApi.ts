import { WorkingSpacesResponce } from '@/types/wspaceTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const wspaceApi = createApi({
  reducerPath: 'api/wspace',
  tagTypes: ['wspace'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
  }),
  endpoints: builder => ({
    getAllWorkingSpaces: builder.query<WorkingSpacesResponce, { headers: any }>({
      query: ({ headers }) => ({
        url: '/api/wspace/get/all',
        headers,
      }),
      providesTags: ['wspace'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

export const { useGetAllWorkingSpacesQuery } = wspaceApi;
