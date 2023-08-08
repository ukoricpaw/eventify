import { DeskList, DeskListItem, ListsState } from '@/types/deskListTypes';

export type ActionPaylodForInfo = {
  itemId?: number;
  listId?: number;
  info: string;
  payloadType: 'description' | 'name';
};

export const changeInfoForItemOrColumn = (
  state: ListsState,
  payload: ActionPaylodForInfo,
  type: 'listItems' | 'lists',
) => {
  const itemId = payload.itemId ?? payload.listId;
  const item = (state[type] as DeskList[]).find((item: DeskList | DeskListItem) => item.id === itemId);
  if (!item) return;
  if (payload.payloadType === 'name') {
    item.name = payload.info;
  } else {
    item.description = payload.info;
  }
};
