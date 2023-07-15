import { DeskType } from '@/types/deskTypes';
import {
  NewWorkingSpaceResponse,
  SingleWorkingSpaceType,
  WorkingSpaceType,
  WorkingSpacesResponce,
} from '@/types/wspaceTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export interface PostNewDesk {
  id: number;
  body: {
    name: string;
    background?: File;
  };
}

export interface PostNewWS {
  name: string;
  description?: string;
}

export const wspaceApi = createApi({
  reducerPath: 'api/wspace',
  tagTypes: ['wspace'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
  }),
  endpoints: builder => ({
    getWorkingSpacesClient: builder.query<WorkingSpacesResponce, null>({
      query: () => ({
        url: '/api/wspace/get/all',
        credentials: 'include',
      }),
      providesTags: ['wspace'],
    }),
    getSingleWorkingSpaceClient: builder.query<SingleWorkingSpaceType, number>({
      query: wspaceId => ({
        url: `/api/wspace/${wspaceId}`,
        credentials: 'include',
      }),
      providesTags: wspace => [{ type: 'wspace', id: wspace?.workingSpace.id }],
    }),
    postNewWorkingSpace: builder.mutation<NewWorkingSpaceResponse, PostNewWS>({
      query: body => ({
        url: '/api/wspace',
        credentials: 'include',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['wspace'],
    }),
    postNewDeskInWorkingSpace: builder.mutation<DeskType, PostNewDesk>({
      query: wspaceBody => {
        const newBody = new FormData();
        newBody.append('name', wspaceBody.body.name);
        if (wspaceBody.body.background) {
          newBody.append('background', wspaceBody.body.background);
        }
        return {
          url: `/api/wspace/desk/${wspaceBody.id}`,
          method: 'POST',
          credentials: 'include',
          body: newBody,
          formData: true,
        };
      },
      invalidatesTags: desk => [{ type: 'wspace', id: desk?.workingSpaceId }],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

export const {
  usePostNewWorkingSpaceMutation,
  useGetSingleWorkingSpaceClientQuery,
  useGetWorkingSpacesClientQuery,
  usePostNewDeskInWorkingSpaceMutation,
} = wspaceApi;
