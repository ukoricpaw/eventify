import useDeleteModal from '@/hooks/useDeleteModal';
import { useContext, useState, ReactElement } from 'react';
import { DeskWSocketContext } from './DeskWSocketProvider';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { deleteColumn as deleteColumnAction } from '@/store/slices/listsSlice';

type DeleteColumnModalType = [(nameListId: string) => void, () => void, boolean, () => ReactElement];

export default function DeleteColumnModal(): DeleteColumnModalType {
  const value = useContext(DeskWSocketContext);
  const dispatch = useAppDispatch();

  const [listNameId, setListNameId] = useState<string | null>(null);

  const deleteColumn = () => {
    value?.emitEvent('deleteColumn')(Number(listNameId?.split('/')[0]) as number);
    dispatch(deleteColumnAction({ listId: Number(listNameId?.split('/')[0]) }));
  };
  const [openHandler, isOpen, DeleteModal] = useDeleteModal({
    handler: deleteColumn,
    title: `Вы действительно хотите удалить список ${listNameId?.split('/')[1]}?`,
  });

  const setListIdHandler = (namelistId: string) => {
    setListNameId(namelistId);
  };

  return [setListIdHandler, openHandler, isOpen, DeleteModal];
}
