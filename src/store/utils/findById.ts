import { DeskList, DeskListItem } from '@/types/deskListTypes';

export const findById = (
  lists: DeskList[] | DeskListItem[],
  id: number,
): [DeskList | DeskListItem | undefined, null | number] => {
  let listIndex = null;
  const list = (lists as DeskList[]).find((list, index) => {
    if (list.id === id) {
      listIndex = index;
      return true;
    }
  });
  return [list, listIndex];
};
