import styles from '../../styles/WorkingSpace.module.scss';
import { MouseEvent, ReactNode, useEffect } from 'react';

interface ModalLayoutIProps {
  setActiveModal: () => void;
  children: ReactNode;
  wrapperHandler?: () => void;
}

export default function ModalLayout({ setActiveModal, children, wrapperHandler }: ModalLayoutIProps) {
  const stopModalPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    wrapperHandler && wrapperHandler();
  };

  useEffect(() => {
    const onKeyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal();
      }
    };
    document.body.style.overflowY = 'hidden';
    document.body.addEventListener('keydown', onKeyDownHandler);
    return () => {
      document.body.style.overflowY = 'auto';
      document.body.removeEventListener('keydown', onKeyDownHandler);
    };
  }, []);

  return (
    <div className={styles.addNewWspaceModal} onClick={setActiveModal}>
      <div className={styles.modalWrapper} onClick={stopModalPropagation}>
        {children}
      </div>
    </div>
  );
}
