import { createPortal } from 'react-dom';
import styles from '../../../styles/WorkingSpace.module.scss';
import { useState, useCallback } from 'react';
import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import { useDeleteWspaceMutation } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { memo } from 'react';

export default memo(function DeleteWspace({ wspaceId }: { wspaceId: number }) {
  const { userData } = useAppSelector(userSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteWspace, { isLoading }] = useDeleteWspaceMutation();
  const router = useRouter();

  const openHandler = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const deleteWspaceHandler = useCallback(async () => {
    await deleteWspace(wspaceId);
    router.push(`/users/${userData.id}/dashboard`);
  }, []);

  return (
    <div>
      <span onClick={openHandler} className={styles.settings__deleteWspaceTitle}>
        Удалить рабочее пространство
      </span>
      {isOpen &&
        createPortal(
          <ModalLayout setActiveModal={openHandler}>
            <h2 className={styles.deleteWpaceQ}>Вы уверены что хотите удалить рабочее пространство?</h2>
            <div className={styles.deleteWspace__buttons}>
              <CompoundButton
                onClick={deleteWspaceHandler}
                className={styles.deleteButton}
                padding={{ y: '8' }}
                variant="light"
              >
                Удалить
              </CompoundButton>
              <CompoundButton padding={{ y: '8' }} onClick={openHandler} variant="success">
                Отмена
              </CompoundButton>
            </div>
          </ModalLayout>,
          document.body,
        )}
    </div>
  );
});
