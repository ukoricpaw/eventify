import { EnumModal } from '@/types/modalDeskTypes';
import { useAppSelector } from './reduxHooks';
import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { deskSelector } from '@/store/selectors/deskSelectors';
import { DeskList, DeskListItem, SingleDesk } from '@/types/deskListTypes';

interface UseProvideModalContentIProps<U> {
  type: U | null;
  content: number | null;
}

interface DeskSelectorType {
  background: SingleDesk['background'];
  name: SingleDesk['name'];
  id: SingleDesk['id'];
  createdAt: SingleDesk['createdAt'];
  description: SingleDesk['description'];
}

type ResultOfSelector = {
  col: DeskList | undefined;
  item: DeskListItem | undefined;
  desk: DeskSelectorType;
};

export default function useProvideModalContent<T extends ResultOfSelector, U extends keyof ResultOfSelector>({
  type,
  content,
}: UseProvideModalContentIProps<U>): T[U] {
  let modalContent: ((...args: any) => any) | null = null;
  switch (type) {
    case EnumModal.COLUMN:
      modalContent = (state: RootState) => state.deskReducer.lists.find(list => list.id === content);
      break;
    case EnumModal.ITEM:
      modalContent = (state: RootState) => state.deskReducer.listItems.find(item => item.id === content);
      break;
    case EnumModal.DESK:
      modalContent = createSelector(deskSelector, desk => ({
        background: desk.background,
        name: desk.name,
        id: desk.id,
        createdAt: desk.createdAt,
        description: desk.description,
      }));
      break;
    default:
      modalContent = (state: RootState) => state.deskReducer.data;
      break;
  }
  const data = useAppSelector(modalContent);
  return data;
}
