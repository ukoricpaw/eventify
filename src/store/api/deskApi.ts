import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react';
import queryFn from '@/utils/queryFn';
import { SingleDesk } from '@/types/deskListTypes';
import { FullTagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RootState, store } from '..';

export interface DeskRequest {
  wspaceId: number;
  deskId: number;
}

export const deskApi = createApi({
  reducerPath: 'api/deskApi',
  tagTypes: ['desk', 'list', 'item'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL as string }),
  endpoints: builder => ({
    getFullDesk: builder.query<SingleDesk, DeskRequest>({
      queryFn: async ({ wspaceId, deskId }) => {
        return await queryFn(`/api/wspace/desk/${wspaceId}/${deskId}`, 'GET');
      },
      providesTags: desk => {
        const result: FullTagDescription<'desk' | 'item' | 'list'>[] = [{ type: 'desk', id: 'fullDesk' }];
        if (desk) {
          desk.desk_lists.map(list => {
            result.push({ type: 'list', id: String(list.id) });
            if (list.desk_list_items) {
              list.desk_list_items.map(item => {
                result.push({ type: 'item', id: String(item.id) });
              });
            }
          });
        }
        return result;
      },
    }),
  }),
});

export const selectAllDeskLists = (state: RootState, { wspaceId, deskId }: DeskRequest) =>
  deskApi.endpoints.getFullDesk.select({ wspaceId, deskId })(state).data ?? {};

export const { useGetFullDeskQuery } = deskApi;
