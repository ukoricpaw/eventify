import useDeleteModal from '@/hooks/useConfirmationModal';
import { useContext, useState, ReactPortal } from 'react';
import { DeskWSocketContext } from './DeskWSocketProvider';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { ColDeleteType, deleteColumnAndUpdateStore } from '@/utils/deleteColumnAndUpdateStore';

type DeleteColumnModalType = [(nameListId: string) => void, () => void, boolean, ReactPortal];

export default function DeleteColumnModal(): DeleteColumnModalType {
  const value = useContext(DeskWSocketContext);
  const dispatch = useAppDispatch();

  const [listNameId, setListNameId] = useState<string | null>(null);

  const deleteColumn = () => {
    deleteColumnAndUpdateStore({
      emitEvent: value?.emitEvent('col_delete') as ColDeleteType['col_delete'],
      listId: Number(listNameId?.split('/')[0]),
      dispatch,
    });
  };

  const [openHandler, isOpen, DeleteModal] = useDeleteModal({
    confirmTitle: 'Удалить',
    handler: deleteColumn,
    title: `Вы действительно хотите удалить список ${listNameId?.split('/')[1]}?`,
  });

  const setListIdHandler = (namelistId: string) => {
    setListNameId(namelistId);
  };

  return [setListIdHandler, openHandler, isOpen, DeleteModal];
}
