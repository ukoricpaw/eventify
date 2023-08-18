import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import styles from '../styles/WorkingSpace.module.scss';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import { useCallback, useState, ReactElement } from 'react';

interface useDeleteModalIProps {
  handler: (...args: any) => void;
  title: string;
  confirmTitle: string;
}

export default function useDeleteModal({
  handler,
  title,
  confirmTitle,
}: useDeleteModalIProps): [() => void, boolean, () => ReactElement] {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  function DeleteModal() {
    return (
      <ModalLayout setActiveModal={openHandler}>
        <h2 className={styles.deleteWpaceQ}>{title}</h2>
        <div className={styles.deleteWspace__buttons}>
          <CompoundButton
            onClick={() => {
              handler();
              openHandler();
            }}
            className={styles.deleteButton}
            padding={{ y: '8' }}
            variant="light"
          >
            {confirmTitle}
          </CompoundButton>
          <CompoundButton padding={{ y: '8' }} onClick={openHandler} variant="success">
            Отмена
          </CompoundButton>
        </div>
      </ModalLayout>
    );
  }

  return [openHandler, isOpen, DeleteModal];
}
