import { Socket } from 'socket.io-client';
import { MouseEvent, KeyboardEvent } from 'react';
import { DeskWSocketEmitEvents } from '@/types/deskTypes';

export default function deskSocketEmitHandlers({ socket }: { socket: Socket | null }): DeskWSocketEmitEvents {
  const addNewColumn = (name: string) => {
    if (name.trim() === '') return;
    socket?.emit('list:add', name);
  };

  const reorderColumns = (id: number, order: number) => {
    socket?.emit('list:reorder', id, order);
  };

  const addNewItem = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLTextAreaElement>,
    columnId: number,
    name: string,
  ) => {
    e.preventDefault();
    if (name.trim() === '') return;
    socket?.emit('list:newItem', columnId, name);
  };

  const archiveColumn = (listId: number, isarchive: 'false' | 'true') => {
    socket?.emit('list:archive', listId, isarchive === 'false' ? 'false' : 'true');
  };

  const reorderItemInColumns = (listId: number, itemId: number, order: number, secondList: number | null) => {
    socket?.emit('item:reorder', listId, itemId, order, secondList);
  };

  const renameColumn = (listId: number, name: string) => {
    socket?.emit('list:name', listId, name);
  };

  const changeColumnDescription = (listId: number, description: string) => {
    socket?.emit('list:description', listId, description);
  };

  const renameFullDesk = (deskId: number, name: string) => {
    socket?.emit('desk:name', deskId, name);
  };

  const changeDeskDescription = (deskId: number, description: string) => {
    socket?.emit('desk:description', deskId, description);
  };

  const renameItem = (listId: number, itemId: number, name: string) => {
    socket?.emit('item:name', listId, itemId, name);
  };

  const changeDescription = (listId: number, itemId: number, description: string) => {
    socket?.emit('item:description', listId, itemId, description);
  };

  const changeItemDeadline = (listId: number, itemId: number, deadline: string | null) => {
    socket?.emit('item:deadline', listId, itemId, deadline);
  };

  const item_delete = (listId: number, itemId: number) => {
    socket?.emit('item:remove', listId, itemId);
  };

  const desk_delete = (id: number) => {
    socket?.emit('desk:delete', id);
  };

  const col_delete = (id: number) => {
    socket?.emit('list:delete', id);
  };

  return {
    renameFullDesk,
    addNewColumn,
    addNewItem,
    reorderColumns,
    reorderItemInColumns,
    archiveColumn,
    renameColumn,
    renameItem,
    changeDescription,
    changeDeskDescription,
    changeColumnDescription,
    changeItemDeadline,
    item_delete,
    col_delete,
    desk_delete,
  };
}
