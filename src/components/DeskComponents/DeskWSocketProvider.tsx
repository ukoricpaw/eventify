import { ReloadedDeskData } from '@/types/deskListTypes';
import { createContext, useRef, useCallback, useEffect, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { reloadData } from '@/store/slices/deskSlice';

interface DeskWSocketContextInterface {
  addNewColumn: (name: string) => void;
  deleteColumn: (id: number) => void;
  reorderColumns: (id: number, order: number) => void;
}

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

  return (
    <DeskWSocketContext.Provider value={{ addNewColumn, deleteColumn, reorderColumns }}>
      {children}
    </DeskWSocketContext.Provider>
  );
}
