import { ListsState } from '@/types/deskListTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArchivedList } from '@/types/deskListTypes';
import { DeskList, ReloadedDeskData, DeskListItem } from '@/types/deskListTypes';
import { Reorder, sourceDest } from '@/types/deskItemTypes';
import { getArchivedLists, getSingleDesk } from '../thunks/fetchSingleDeskThunks';

const initialState: ListsState = {
  lists: [],
  listIndexes: [],
  archived: {
    isLoading: true,
    isError: null,
    archivedList: [],
    isFulfilled: false,
    deskId: null,
  } as ArchivedList,
  listItems: [],
};

const listsSlice = createSlice({
  name: 'listsSlice',
  initialState,
  reducers: {
    changeInfoItem(
      state,
      action: PayloadAction<{ itemId: number; info: string; payloadType: 'description' | 'name' }>,
    ) {
      const item = state.listItems.find(item => item.id === action.payload.itemId);
      if (!item) return;
      if (action.payload.payloadType === 'name') {
        item.name = action.payload.info;
      } else {
        item.description = action.payload.info;
      }
    },
    changeInfoColumn(
      state,
      action: PayloadAction<{ listId: number; info: string; payloadType: 'description' | 'name' }>,
    ) {
      const list = state.lists.find(list => list.id === action.payload.listId);
      if (!list) return;
      if (action.payload.payloadType === 'name') {
        list.name = action.payload.info;
      } else {
        list.description = action.payload.info;
      }
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
      if (action.payload.type === 'fromArchive') {
        state.listIndexes.push(list.id);
      } else {
        state.listIndexes.splice(listIndex, 1);
      }
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

      state.lists.splice(listIndex, 1);
      state.listIndexes.splice(listIndex, 1);
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
    addNewColumn(state, action: PayloadAction<DeskList>) {
      action.payload.desk_list_items = [];
      state.listIndexes.push(action.payload.id);
      state.lists.push(action.payload);
    },
    reloadData(state, action: PayloadAction<ReloadedDeskData>) {
      state.listIndexes = action.payload.desk.desk_lists.map(list => list.id);
    },
    clearArchive(state) {
      state.archived.isFulfilled = false;
    },
    addNewItemToColumn(state, action: PayloadAction<{ listId: number; item: DeskListItem }>) {
      const list = state.lists.find(list => list.id === action.payload.listId);
      if (!list) return;
      list.desk_list_items.push(action.payload.item);
      state.listItems.push(action.payload.item);
    },
    setDeadlineToItem(state, action: PayloadAction<{ itemId: number; deadline: string }>) {
      const item = state.listItems.find(item => item.id === action.payload.itemId);
      if (!item) return;
      item.deadline = action.payload.deadline;
    },
    reorderItem: (state, action: PayloadAction<Reorder>) => {
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
            const item = state.listItems.find(item => item.id === movedItem.id);
            if (!item) return;
            item.deskListId = action.payload.destination.id;
          }
        }
      } else if (action.payload.type === 'columns') {
        if (action.payload.destination) {
          const [movedItem] = state.listIndexes.splice(action.payload.source.index, 1);
          state.listIndexes.splice((action.payload.destination as sourceDest).index, 0, movedItem);
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getSingleDesk.pending, state => {
      state.lists = [];
      state.listItems = [];
    });
    builder.addCase(getSingleDesk.fulfilled, (state, action) => {
      state.lists = action.payload.deskLists.desk_lists;
      state.listItems = action.payload.listItems;
      state.listIndexes = action.payload.deskLists.desk_lists.map(list => list.id);
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
      state.archived.isLoading = false;
    });
  },
});

export const {
  addNewItemToColumn,
  reorderItem,
  changeInfoColumn,
  rearchiveColumn,
  reloadData,
  deleteColumn,
  changeColumns,
  clearArchive,
  addNewColumn,
  changeInfoItem,
  setDeadlineToItem,
} = listsSlice.actions;
export default listsSlice.reducer;
