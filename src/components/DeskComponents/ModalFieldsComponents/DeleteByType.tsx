import { useContext } from 'react';
import { DeskWSocketContext } from '../GeneralDeskComponents/DeskWSocketProvider';
import useDeleteModal from '@/hooks/useConfirmationModal';
import { FaTrash } from 'react-icons/fa';
import { EnumModal } from '@/types/modalDeskTypes';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { deleteHandlerForModalEntity } from '@/utils/deleteHandlerForModalEntity';
import { DeskWSocketContextInterface } from '@/types/deskTypes';

interface DeleteByTypeIProps {
  type: EnumModal;
  id: number;
  listId: number;
}

export default function DeleteByType({ listId, id, type }: DeleteByTypeIProps) {
  const dispatch = useAppDispatch();
  const value = useContext(DeskWSocketContext);
  const deleteHandler = () => {
    deleteHandlerForModalEntity({ dispatch, listId, id, value: value as DeskWSocketContextInterface, type });
  };

  const [openHandler, isOpen, DeleteModal] = useDeleteModal({
    confirmTitle: 'Удалить',
    handler: deleteHandler,
    title: `${type}`,
  });

  return (
    <>
      <FaTrash cursor={'pointer'} onClick={openHandler} size={15} color="red" />
      {isOpen && DeleteModal}
    </>
  );
}
