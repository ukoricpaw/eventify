import { DeskType } from '@/types/deskTypes';
import {
  MembersResponse,
  MessageType,
  NewWorkingSpaceResponse,
  SingleWorkingSpaceType,
  UpdatedWspace,
  WorkingSpacesResponce,
} from '@/types/wspaceTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import queryFn from '@/utils/queryFn';

export interface PostNewDesk {
  id: number;
  body: {
    name: string;
    background?: Blob;
  };
}

export interface UploadedWspaceInfo {
  wspaceId: number;
  wspaceBody: {
    name?: string;
    isPrivate?: string;
    description?: string;
  };
}

export interface PostNewWS {
  name: string;
  description?: string;
}

export const wspaceApi = createApi({
  reducerPath: 'api/wspace',
  tagTypes: ['wspace', 'members'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
  }),
  endpoints: builder => ({
    getWorkingSpacesClient: builder.query<WorkingSpacesResponce, number>({
      queryFn: async userId => {
        return await queryFn('/api/wspace/get/all', 'GET');
      },
      providesTags: ['wspace'],
    }),
    getSingleWorkingSpaceClient: builder.query<SingleWorkingSpaceType, number>({
      queryFn: async wspaceId => {
        return await queryFn(`/api/wspace/${wspaceId}`, 'GET');
      },
      providesTags: wspace => [{ type: 'wspace', id: wspace?.workingSpace.id }],
    }),
    postNewWorkingSpace: builder.mutation<NewWorkingSpaceResponse, PostNewWS>({
      queryFn: async body => {
        return await queryFn('/api/wspace', 'POST', body);
      },
      invalidatesTags: ['wspace'],
    }),
    postNewDeskInWorkingSpace: builder.mutation<DeskType, PostNewDesk>({
      queryFn: async wspaceBody => {
        const newBody = new FormData();
        newBody.append('name', wspaceBody.body.name);
        if (wspaceBody.body.background) {
          newBody.append('background', wspaceBody.body.background);
        }
        return await queryFn(`/api/wspace/desk/${wspaceBody.id}`, 'POST', newBody);
      },
      invalidatesTags: desk => [{ type: 'wspace', id: desk?.workingSpaceId }],
    }),
    getWspaceMembers: builder.query<MembersResponse, { wspaceId: number; search: string; page: number; limit: number }>(
      {
        queryFn: async ({ wspaceId, search, page, limit }) => {
          return await queryFn(`/api/wspace/members/${wspaceId}?search=${search}&page=${page}&limit=${limit}`, 'GET');
        },
        providesTags: ['members'],
      },
    ),
    updateWspace: builder.mutation<UpdatedWspace, UploadedWspaceInfo>({
      queryFn: async ({ wspaceId, wspaceBody }) => {
        return await queryFn(`/api/wspace/${wspaceId}`, 'PUT', wspaceBody);
      },
      invalidatesTags: wspace => [{ type: 'wspace', id: wspace?.id }],
    }),
    deleteWspace: builder.mutation<MessageType, number>({
      queryFn: async wspaceId => {
        return await queryFn(`/api/wspace/${wspaceId}`, 'DELETE');
      },
      invalidatesTags: ['wspace'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

export const {
  useDeleteWspaceMutation,
  useUpdateWspaceMutation,
  useGetWspaceMembersQuery,
  usePostNewWorkingSpaceMutation,
  useGetSingleWorkingSpaceClientQuery,
  useGetWorkingSpacesClientQuery,
  usePostNewDeskInWorkingSpaceMutation,
} = wspaceApi;
