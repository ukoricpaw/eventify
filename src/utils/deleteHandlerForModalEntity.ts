import { EnumModal } from '@/types/modalDeskTypes';
import { DeskWSocketContextInterface } from '@/types/deskTypes';
import { deleteColumnAndUpdateStore } from './deleteColumnAndUpdateStore';
import { ColDeleteType } from './deleteColumnAndUpdateStore';
import { AppDispatch } from '@/store';

interface DeleteHandlerForModalEntityIProps {
  value: DeskWSocketContextInterface;
  type: EnumModal;
  listId: number;
  id: number;
  dispatch: AppDispatch;
}

export const deleteHandlerForModalEntity = ({
  dispatch,
  listId,
  id,
  value,
  type,
}: DeleteHandlerForModalEntityIProps) => {
  if (type === EnumModal.ITEM) {
    value?.emitEvent(`${type}_delete`)(listId, id);
  } else if (type === EnumModal.COLUMN) {
    deleteColumnAndUpdateStore({
      emitEvent: value?.emitEvent('col_delete') as ColDeleteType['col_delete'],
      listId: id,
      dispatch,
    });
  } else {
    value?.emitEvent(`${type}_delete`)(id);
  }
};
