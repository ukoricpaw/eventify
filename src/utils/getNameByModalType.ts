import { EnumModal } from '@/types/modalDeskTypes';
import { IconType } from 'react-icons/lib';
import { BiCard } from 'react-icons/bi';
import { BiColumns } from 'react-icons/bi';
import { CgList } from 'react-icons/cg';

import getDate from './getDate';
export default function getNameByModaltype(type: EnumModal, createdAt: string): [IconType, string, string] {
  const date = getDate(createdAt);
  switch (type) {
    case EnumModal.COLUMN:
      return [CgList, 'Колонна', `Создано: ${date}`];
    case EnumModal.DESK:
      return [BiColumns, 'Доска', `Создано: ${date}`];
    case EnumModal.ITEM:
      return [BiCard, 'Карточка', `Создано: ${date}`];
  }
}
