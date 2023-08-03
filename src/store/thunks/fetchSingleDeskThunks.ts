import { createAsyncThunk } from '@reduxjs/toolkit';
import { $privateApi } from '@/axios/config';
import { SingleDesk, DeskListItem } from '@/types/deskListTypes';
import { isAxiosError } from 'axios';

export const getArchivedLists = createAsyncThunk(
  'archivedList',
  async ({ wspaceId, deskId }: { wspaceId: number; deskId: number }, { rejectWithValue }) => {
    try {
      const archivedLists = await $privateApi.get<SingleDesk>(`/api/wspace/desk/${wspaceId}/${deskId}?archive=true`);
      return { archivedDeskLists: archivedLists.data };
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message);
      }
      return rejectWithValue('Произошла ошибка');
    }
  },
);

export const getSingleDesk = createAsyncThunk(
  'singleDesk',
  async ({ wspaceId, deskId }: { wspaceId: number; deskId: number }, { rejectWithValue }) => {
    try {
      const [deskLists, listItems] = await Promise.all([
        $privateApi.get<SingleDesk>(`/api/wspace/desk/${wspaceId}/${deskId}`),
        $privateApi.get<DeskListItem[]>(`/api/wspace/desk/${wspaceId}/${deskId}/items`),
      ]);
      return { deskLists: deskLists.data, listItems: listItems.data };
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message as string);
      }
      return rejectWithValue('Произошла ошибка');
    }
  },
);
