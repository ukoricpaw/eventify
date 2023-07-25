import { DeskHistoryType } from '@/types/deskTypes';
import queryFn from '@/utils/queryFn';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deskApi = createApi({
  reducerPath: 'api/deskApi',
  tagTypes: ['history'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: builder => ({
    getHistory: builder.query<DeskHistoryType, { wspaceId: number; deskId: number }>({
      queryFn: async ({ wspaceId, deskId }) => {
        return await queryFn(`/api/wspace/desk/story/${wspaceId}/${deskId}`, 'GET');
      },
      providesTags: [{ type: 'history', id: 'LIST' }],
    }),
  }),
});

export const { useGetHistoryQuery } = deskApi;
