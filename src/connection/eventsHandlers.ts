import { AppDispatch } from '@/store';
import {
  reloadData,
  addNewColumn as newColumnAction,
  addNewItemToColumn,
  changeColumns,
  rearchiveColumn,
  changeInfoColumn,
  changeInfoItem,
  setDeadlineToItem,
  deleteItem,
} from '@/store/slices/listsSlice';
import { changeDescription, renameDesk } from '@/store/slices/deskSlice';

import { DeskList, DeskListItem, ReloadedDeskData } from '@/types/deskListTypes';
import { notifyWithError, notifyWithSuccess } from '@/utils/notificationsFromToastify';
import { MessageType } from '@/types/wspaceTypes';
import { NextRouter } from 'next/router';

export type EventsHandlersType = { event: string; handler: (...args: any) => void }[];

export default function eventsHandlers(dispatch: AppDispatch, router: NextRouter): EventsHandlersType {
  return [
    {
      event: 'item:newDescription',
      handler: ({ itemId, description }: { itemId: number; description: string }) => {
        dispatch(changeInfoItem({ itemId, info: description, payloadType: 'description' }));
      },
    },
    {
      event: 'item:newDeadline',
      handler: ({ itemId, deadline }: { itemId: number; deadline: string }) => {
        dispatch(setDeadlineToItem({ itemId, deadline }));
      },
    },
    {
      event: 'item:newName',
      handler: ({ itemId, name }: { itemId: number; name: string }) => {
        dispatch(changeInfoItem({ itemId, info: name, payloadType: 'name' }));
      },
    },

    {
      event: 'list:newDescription',
      handler: ({ listId, description }: { listId: number; description: string }) => {
        dispatch(changeInfoColumn({ listId, info: description, payloadType: 'description' }));
      },
    },
    {
      event: 'desk:newDescription',
      handler: (description: string) => {
        dispatch(changeDescription(description));
      },
    },
    {
      event: 'desk:newName',
      handler: (name: string) => {
        dispatch(renameDesk(name));
      },
    },
    {
      event: 'desk:deleted',
      handler: (message: MessageType) => {
        notifyWithSuccess(message.message);
        router.push(`/users/${router.query.user}/dashboard`);
      },
    },
    {
      event: 'list:newName',
      handler: ({ listId, name }: { listId: number; name: string }) => {
        dispatch(changeInfoColumn({ listId, info: name, payloadType: 'name' }));
      },
    },
    {
      event: 'list:archiveList',
      handler: ({ listId, type }: { listId: number; type: 'toArchive' | 'fromArchive' }) => {
        dispatch(rearchiveColumn({ listId, type }));
      },
    },
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
        if (message.includes('255')) {
          notifyWithError('Слишком большое количество символов');
        } else {
          notifyWithError(message);
        }
      },
    },
    {
      event: 'item:getNewOrder',
      handler: (data: { list: DeskList; secondList: DeskList | null }) => {
        dispatch(changeColumns(data));
      },
    },
    {
      event: 'item:removeInList',
      handler: (data: { listId: number; itemId: number }) => {
        dispatch(deleteItem({ listId: data.listId, itemId: data.itemId }));
      },
    },
  ];
}
