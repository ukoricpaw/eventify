import { $privateApi } from '@/axios/config';
import { DeskList, DeskListItem, ReloadedDeskData, SingleDesk, SingleDeskState } from '@/types/deskListTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';
import { Reorder, sourceDest } from '@/types/deskItemTypes';

const initialState: SingleDeskState = {
  status: {
    isLoading: false,
    isError: null,
  },
  data: {} as SingleDesk,
  listItems: [],
  lists: [],
};

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

const deskSlice = createSlice({
  name: 'deskSlice',
  initialState,
  reducers: {
    changeColumns(state, action: PayloadAction<{ list: DeskList; secondList: null | DeskList }>) {
      const list = state.lists.find(list => list.id === action.payload.list.id);
      if (!list) return;
      list.desk_list_items = action.payload.list.desk_list_items;
      if (action.payload.secondList) {
        const secondList = state.lists.find(list => list.id === action.payload.secondList?.id);
        (secondList as DeskList).desk_list_items = action.payload.secondList.desk_list_items;
      }
    },
    addNewItemToColumn(state, action: PayloadAction<{ listId: number; item: DeskListItem }>) {
      const list = state.lists.find(list => list.id === action.payload.listId);
      if (!list) return;
      list.desk_list_items.push(action.payload.item);
      state.listItems.push(action.payload.item);
    },
    addNewColumn(state, action: PayloadAction<DeskList>) {
      action.payload.desk_list_items = [];
      state.lists.push(action.payload);
    },
    reloadData(state, action: PayloadAction<ReloadedDeskData>) {
      state.lists = action.payload.desk.desk_lists;
    },
    reorderItem(state, action: PayloadAction<Reorder>) {
      if (action.payload.type === 'items') {
        if (action.payload.destination) {
          if (
            action.payload.destination.id === action.payload.source.id &&
            action.payload.source.index === action.payload.destination.index
          )
            return;

          const startList = state.lists.find(item => item.id === action.payload.source.id);
          if (action.payload.destination.id === action.payload.source.id) {
            const [movedItem] = startList?.desk_list_items.splice(action.payload.source.index, 1) as DeskListItem[];
            startList?.desk_list_items.splice(action.payload.destination.index, 0, movedItem);
          } else {
            const endList = state.lists.find(item => item.id === (action.payload.destination as sourceDest).id);
            const [movedItem] = startList?.desk_list_items.splice(action.payload.source.index, 1) as DeskListItem[];
            endList?.desk_list_items.splice(action.payload.destination.index, 0, movedItem);
          }
        }
      } else if (action.payload.type === 'columns') {
        if (action.payload.destination) {
          const [movedItem] = state.lists.splice(action.payload.source.index, 1);
          state.lists.splice((action.payload.destination as sourceDest).index, 0, movedItem);
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getSingleDesk.pending, state => {
      state.status.isError = null;
      state.status.isLoading = true;
      state.data = {} as SingleDesk;
      state.lists = [];
    });
    builder.addCase(getSingleDesk.fulfilled, (state, action) => {
      state.data = action.payload.deskLists;
      state.lists = action.payload.deskLists.desk_lists;
      state.listItems = action.payload.listItems;
      state.status.isLoading = false;
    });
    builder.addCase(getSingleDesk.rejected, (state, action) => {
      state.status.isError = action.error.message as string;
      state.status.isLoading = false;
    });
  },
});

export default deskSlice.reducer;
export const { reorderItem, reloadData, addNewColumn, addNewItemToColumn, changeColumns } = deskSlice.actions;

export const deskSelector = (state: RootState) => state.deskReducer.data;
export const statusSelector = (state: RootState) => state.deskReducer.status;
export const deskDataSelector = (state: RootState) => state.deskReducer.lists;

export const getDeskInfo = createSelector(deskSelector, res => res);

export const deskDataSelectorResult = createSelector(deskDataSelector, res => res);

export const layoutSelector = createSelector([deskSelector, statusSelector], (desk, status) => ({
  name: desk.name,
  background: desk.background,
  isLoading: status.isLoading,
  isError: status.isError,
}));
