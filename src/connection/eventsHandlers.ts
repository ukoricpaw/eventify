import { AppDispatch } from '@/store';
import {
  reloadData,
  addNewColumn as newColumnAction,
  addNewItemToColumn,
  changeColumns,
} from '@/store/slices/deskSlice';

import { DeskList, DeskListItem, ReloadedDeskData } from '@/types/deskListTypes';

export type EventsHandlersType = { event: string; handler: (...args: any) => void }[];

export default function eventsHandlers(dispatch: AppDispatch): EventsHandlersType {
  return [
    {
      event: 'desk',
      handler: (data: ReloadedDeskData) => {
        dispatch(reloadData(data));
      },
    },
    {
      event: 'desk:newcol',
      handler: (data: DeskList) => {
        dispatch(newColumnAction(data));
      },
    },
    {
      event: 'list:getItem',
      handler: (data: { listId: number; item: DeskListItem }) => {
        dispatch(addNewItemToColumn(data));
      },
    },
    {
      event: 'errorMessage',
      handler: message => {
        console.log(message);
      },
    },
    {
      event: 'item:getNewOrder',
      handler: (data: { list: DeskList; secondList: DeskList | null }) => {
        dispatch(changeColumns(data));
      },
    },
  ];
}
