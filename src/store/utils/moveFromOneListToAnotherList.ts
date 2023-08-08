import { DeskListItem } from '@/types/deskListTypes';

export const moveFromOnListToAnotherList = (
  firstList: DeskListItem[],
  secondList: DeskListItem[],
  sourceIndex: number,
  destinationIndex: number,
) => {
  const [movedItem] = firstList.splice(sourceIndex, 1) as DeskListItem[];
  secondList.splice(destinationIndex, 0, movedItem);
  return movedItem;
};
