import { FieldsActionTypes } from './defineFieldsModalType';
import { DeskWSocketContextInterface } from '@/types/deskTypes';

interface EmitModalEventInterface {
  debouncedValue: string;
  emitFunction: FieldsActionTypes;
  deskListId: number | null;
  socket: DeskWSocketContextInterface | null;
  id: number;
}

export default function EmitModalEvent({
  debouncedValue,
  deskListId,
  emitFunction,
  socket,
  id,
}: EmitModalEventInterface) {
  if (debouncedValue.trim().length > 0) {
    if (emitFunction === 'renameItem' || emitFunction === 'changeDescription') {
      if (deskListId) {
        socket?.emitEvent(emitFunction)(deskListId, id, debouncedValue);
      }
    } else {
      socket?.emitEvent(emitFunction)(id, debouncedValue);
    }
  } else if (
    emitFunction === 'changeColumnDescription' ||
    emitFunction === 'changeDeskDescription' ||
    emitFunction === 'changeDescription'
  ) {
    if (emitFunction === 'changeDescription') {
      if (deskListId) {
        socket?.emitEvent(emitFunction)(deskListId, id, debouncedValue);
      }
    } else {
      socket?.emitEvent(emitFunction)(id, debouncedValue);
    }
  }
}
