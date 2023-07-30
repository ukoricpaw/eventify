import { Socket } from 'socket.io-client';
import { EventsHandlersType } from './eventsHandlers';

interface DeskSocketEventsHandlersIProps {
  socket: Socket;
  eventsHandlers: EventsHandlersType;
}

export default function deskSocketEventsHandlers({ socket, eventsHandlers }: DeskSocketEventsHandlersIProps) {
  if (!socket) return;

  eventsHandlers.forEach(eventHandler => {
    socket.on(eventHandler.event, eventHandler.handler);
  });
}
