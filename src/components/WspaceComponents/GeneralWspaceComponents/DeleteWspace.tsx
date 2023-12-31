import { createPortal } from 'react-dom';
import styles from '../../../styles/WorkingSpace.module.scss';
import { useDeleteWspaceMutation } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { memo } from 'react';
import useDeleteModal from '@/hooks/useConfirmationModal';

export default memo(function DeleteWspace({ wspaceId }: { wspaceId: number }) {
  const { userData } = useAppSelector(userSelector);
  const [deleteWspace, { isLoading }] = useDeleteWspaceMutation();
  const router = useRouter();

  const deleteWspaceHandler = async () => {
    await deleteWspace(wspaceId);
    router.push(`/users/${userData.id}/dashboard`);
  };

  const [openHandler, isOpen, DeleteModal] = useDeleteModal({
    confirmTitle: 'Удалить',
    handler: deleteWspaceHandler,
    title: 'Вы уверены что хотите удалить рабочее пространство?',
  });

  return (
    <div>
      <span onClick={openHandler} className={styles.settings__deleteWspaceTitle}>
        Удалить рабочее пространство
      </span>
      {isOpen && DeleteModal}
    </div>
  );
});
