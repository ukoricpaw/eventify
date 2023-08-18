import { createContext, useRef, useEffect, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { DeskWSocketContextInterface, DeskWSocketEmitEvents } from '@/types/deskTypes';
import deskSocketEventsHandlers from '@/connection/deskSocketEventsHandlers';
import deskSocketEmitHandlers from '@/connection/deskSocketEmitHandlers';
import eventsHandlers from '@/connection/eventsHandlers';
import { useRouter } from 'next/router';

export const DeskWSocketContext = createContext<null | DeskWSocketContextInterface>(null);

interface DeskWSocketIProps {
  children: ReactNode;
  wspaceId: number;
  deskId: number;
}

export default function DeskWSocketProvider({ children, wspaceId, deskId }: DeskWSocketIProps) {
  const socketRef = useRef<Socket | null>(null);
  const emitHandlersRef = useRef<DeskWSocketEmitEvents | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const eventHandlers = eventsHandlers(dispatch, router);
  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL as string, {
      query: { wspaceId, deskId },
      withCredentials: true,
    });
    deskSocketEventsHandlers({ socket: socketRef.current, eventsHandlers: eventHandlers });
    emitHandlersRef.current = deskSocketEmitHandlers({ socket: socketRef.current });
    return () => {
      eventHandlers.forEach(event => {
        socketRef.current?.off(event.event);
      });
      socketRef.current?.disconnect();
    };
  }, []);
  const emitEvent = <T extends keyof DeskWSocketEmitEvents>(event: T) => {
    return (emitHandlersRef.current as DeskWSocketEmitEvents)[event];
  };

  return <DeskWSocketContext.Provider value={{ emitEvent }}>{children}</DeskWSocketContext.Provider>;
}
