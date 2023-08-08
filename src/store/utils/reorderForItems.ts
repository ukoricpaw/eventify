import { ListsState } from '@/types/deskListTypes';
import { DeskListItem } from '@/types/deskListTypes';
import { moveFromOnListToAnotherList } from './moveFromOneListToAnotherList';
import { Reorder, sourceDest } from '@/types/deskItemTypes';

export const reorderForItems = (state: ListsState, payload: Reorder) => {
  if (payload.destination) {
    if (payload.destination.id === payload.source.id && payload.source.index === payload.destination.index) return;

    const startList = state.lists.find(item => item.id === payload.source.id);
    if (payload.destination.id === payload.source.id) {
      moveFromOnListToAnotherList(
        startList?.desk_list_items as DeskListItem[],
        startList?.desk_list_items as DeskListItem[],
        payload.source.index,
        payload.destination.index,
      );
    } else {
      const endList = state.lists.find(item => item.id === (payload.destination as sourceDest).id);
      const movedItem = moveFromOnListToAnotherList(
        startList?.desk_list_items as DeskListItem[],
        endList?.desk_list_items as DeskListItem[],
        payload.source.index,
        payload.destination.index,
      );
      const item = state.listItems.find(item => item.id === movedItem.id);
      if (!item) return;
      item.deskListId = payload.destination.id;
    }
  }
};
