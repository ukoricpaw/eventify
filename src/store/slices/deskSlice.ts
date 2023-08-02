import { $privateApi } from '@/axios/config';
import {
  ArchivedList,
  DeskList,
  DeskListItem,
  ReloadedDeskData,
  SingleDesk,
  SingleDeskState,
} from '@/types/deskListTypes';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { Reorder, sourceDest } from '@/types/deskItemTypes';

const initialState: SingleDeskState = {
  status: {
    isLoading: true,
    isError: null,
  },
  data: {} as SingleDesk,
  listItems: [],
  lists: [],
  archived: {
    isLoading: true,
    isError: null,
    archivedList: [],
    isFulfilled: false,
    deskId: null,
  } as ArchivedList,
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

const deskSlice = createSlice({
  name: 'deskSlice',
  initialState,
  reducers: {
    renameDesk(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
    },
    renameColumn(state, action: PayloadAction<{ listId: number; name: string }>) {
      const list = state.lists.find(list => list.id === action.payload.listId);
      if (!list) return;
      list.name = action.payload.name;
    },
    rearchiveColumn(state, action: PayloadAction<{ listId: number; type: 'toArchive' | 'fromArchive' }>) {
      let listIndex = null;
      let lists = state.lists;
      let secondLists = state.archived.archivedList;
      if (action.payload.type === 'fromArchive') {
        lists = state.archived.archivedList;
        secondLists = state.lists;
      }
      const list = lists.find((list, index) => {
        if (list.id === action.payload.listId) {
          listIndex = index;
          return true;
        }
      });
      if (!list || listIndex === null) return;
      lists.splice(listIndex, 1);
      secondLists.push(list);
    },
    deleteColumn(state, action: PayloadAction<{ listId: number }>) {
      let listIndex = null;
      const list = state.lists.find((list, index) => {
        if (list.id === action.payload.listId) {
          listIndex = index;
          return true;
        }
      });
      if (!list || listIndex === null) return;
      state.listItems = state.listItems.filter(item => item.deskListId !== list.id);

      state.lists.splice(listIndex, 1);
    },
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
    clearArchive(state) {
      state.archived.isFulfilled = false;
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
    builder.addCase(getArchivedLists.fulfilled, (state, action) => {
      state.archived.isFulfilled = true;
      state.archived.isLoading = false;
      state.archived.archivedList = action.payload.archivedDeskLists.desk_lists;
      state.archived.deskId = action.payload.archivedDeskLists.id;
    });
    builder.addCase(getArchivedLists.pending, state => {
      state.archived.isLoading = true;
      state.archived.isError = null;
      state.archived.archivedList = [];
    });
    builder.addCase(getArchivedLists.rejected, (state, action) => {
      state.archived.isError = action.error.message as string;
      state.status.isLoading = false;
    });
  },
});

export default deskSlice.reducer;
export const {
  renameDesk,
  renameColumn,
  clearArchive,
  rearchiveColumn,
  deleteColumn,
  reorderItem,
  reloadData,
  addNewColumn,
  addNewItemToColumn,
  changeColumns,
} = deskSlice.actions;
