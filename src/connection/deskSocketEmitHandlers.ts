import { Socket } from 'socket.io-client';
import { MouseEvent, KeyboardEvent } from 'react';
import { DeskWSocketEmitEvents } from '@/types/deskTypes';

export default function deskSocketEmitHandlers({ socket }: { socket: Socket | null }): DeskWSocketEmitEvents {
  const addNewColumn = (name: string) => {
    if (name.trim() === '') return;
    socket?.emit('list:add', name);
  };

  const deleteColumn = (id: number) => {
    socket?.emit('list:delete', id);
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

  const reorderItemInColumns = (listId: number, itemId: number, order: number, secondList: number | null) => {
    socket?.emit('item:reorder', listId, itemId, order, secondList);
  };

  return { addNewColumn, addNewItem, reorderColumns, reorderItemInColumns, deleteColumn };
}
