import { ListsState } from '@/types/deskListTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArchivedList } from '@/types/deskListTypes';
import { DeskList, ReloadedDeskData, DeskListItem } from '@/types/deskListTypes';
import { Reorder, sourceDest } from '@/types/deskItemTypes';
import { getArchivedLists, getSingleDesk } from '../thunks/fetchSingleDeskThunks';
import { ActionPaylodForInfo, changeInfoForItemOrColumn } from '../utils/changeInfoForItemOrColumn';
import { findAndRemoveListIndexByListId } from '../utils/findAndRemoveListIndexByListId';
import { findById } from '../utils/findById';
import { reorderForItems } from '../utils/reorderForItems';

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
    changeInfoItem(state, action: PayloadAction<ActionPaylodForInfo>) {
      changeInfoForItemOrColumn(state, action.payload, 'listItems');
    },
    changeInfoColumn(
      state,
      action: PayloadAction<{ listId: number; info: string; payloadType: 'description' | 'name' }>,
    ) {
      changeInfoForItemOrColumn(state, action.payload, 'lists');
    },
    rearchiveColumn(state, action: PayloadAction<{ listId: number; type: 'toArchive' | 'fromArchive' }>) {
      let lists = state.lists;
      let secondLists = state.archived.archivedList;
      if (action.payload.type === 'fromArchive') {
        lists = state.archived.archivedList;
        secondLists = state.lists;
      }
      const [list, listIndex] = findById(lists, action.payload.listId);
      if (!list || listIndex === null) return;
      lists.splice(listIndex, 1);
      secondLists.push(list as DeskList);
      if (action.payload.type === 'fromArchive') {
        state.listIndexes.push(list.id);
      } else {
        findAndRemoveListIndexByListId(state.listIndexes, list.id);
      }
    },
    deleteColumn(state, action: PayloadAction<{ listId: number }>) {
      const [list, listIndex] = findById(state.lists, action.payload.listId);
      if (!list || listIndex === null) return;
      state.lists.splice(listIndex, 1);
      findAndRemoveListIndexByListId(state.listIndexes, list.id);
    },
    changeColumns(state, action: PayloadAction<{ list: DeskList; secondList: null | DeskList }>) {
      const [list] = findById(state.lists, action.payload.list.id);
      if (!list) return;
      (list as DeskList).desk_list_items = action.payload.list.desk_list_items;
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
      const [list] = findById(state.lists, action.payload.listId);
      if (!list) return;
      (list as DeskList).desk_list_items.push(action.payload.item);
      state.listItems.push(action.payload.item);
    },
    setDeadlineToItem(state, action: PayloadAction<{ itemId: number; deadline: string }>) {
      const [item] = findById(state.listItems, action.payload.itemId);
      if (!item) return;
      (item as DeskListItem).deadline = action.payload.deadline;
    },
    reorderItem: (state, action: PayloadAction<Reorder>) => {
      if (action.payload.type === 'items') {
        reorderForItems(state, action.payload);
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
