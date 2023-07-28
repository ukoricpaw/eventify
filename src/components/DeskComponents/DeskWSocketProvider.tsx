import { DeskList, DeskListItem, ReloadedDeskData } from '@/types/deskListTypes';
import { createContext, useRef, useEffect, ReactNode, MouseEvent, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAppDispatch } from '@/hooks/reduxHooks';
import {
  reloadData,
  addNewColumn as newColumnAction,
  addNewItemToColumn,
  changeColumns,
} from '@/store/slices/deskSlice';
import { DeskWSocketContextInterface } from '@/types/deskTypes';

export const DeskWSocketContext = createContext<null | DeskWSocketContextInterface>(null);

interface DeskWSocketIProps {
  children: ReactNode;
  wspaceId: number;
  deskId: number;
}

export default function DeskWSocketProvider({ children, wspaceId, deskId }: DeskWSocketIProps) {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL as string, {
      query: { wspaceId, deskId },
      withCredentials: true,
    });

    socketRef.current.on('desk', (data: ReloadedDeskData) => {
      dispatch(reloadData(data));
    });

    socketRef.current.on('desk:newcol', (data: DeskList) => {
      dispatch(newColumnAction(data));
    });

    socketRef.current.on('list:getItem', (data: { listId: number; item: DeskListItem }) => {
      dispatch(addNewItemToColumn(data));
    });

    socketRef.current.on('errorMessage', message => {
      console.log(message);
    });

    socketRef.current.on('item:getNewOrder', (data: { list: DeskList; secondList: DeskList | null }) => {
      dispatch(changeColumns(data));
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const addNewColumn = useCallback((name: string) => {
    if (name.trim() === '') return;
    socketRef.current?.emit('list:add', name);
  }, []);

  const deleteColumn = useCallback((id: number) => {
    socketRef.current?.emit('list:delete', id);
  }, []);

  const reorderColumns = useCallback((id: number, order: number) => {
    socketRef.current?.emit('list:reorder', id, order);
  }, []);

  const addNewItem = useCallback((e: MouseEvent<HTMLButtonElement>, columnId: number, name: string) => {
    e.preventDefault();
    if (name.trim() === '') return;
    socketRef.current?.emit('list:newItem', columnId, name);
  }, []);

  const reorderItemInColumns = useCallback(
    (listId: number, itemId: number, order: number, secondList: number | null) => {
      console.log('reorder');
      socketRef.current?.emit('item:reorder', listId, itemId, order, secondList);
    },
    [],
  );

  return (
    <DeskWSocketContext.Provider
      value={{ addNewColumn, deleteColumn, reorderColumns, addNewItem, reorderItemInColumns }}
    >
      {children}
    </DeskWSocketContext.Provider>
  );
}
