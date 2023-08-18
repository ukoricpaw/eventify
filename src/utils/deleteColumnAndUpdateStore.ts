import { AppDispatch } from '@/store';
import { DeskWSocketEmitEvents } from '@/types/deskTypes';
import { deleteColumn } from '@/store/slices/listsSlice';
export type ColDeleteType = Pick<DeskWSocketEmitEvents, 'col_delete'>;

interface DeleteColumnAndUpdateStoreIProps {
  emitEvent: Pick<DeskWSocketEmitEvents, 'col_delete'>['col_delete'];
  listId: number;
  dispatch: AppDispatch;
}

export const deleteColumnAndUpdateStore = ({ emitEvent, dispatch, listId }: DeleteColumnAndUpdateStoreIProps) => {
  emitEvent(listId);
  dispatch(deleteColumn({ listId }));
};
