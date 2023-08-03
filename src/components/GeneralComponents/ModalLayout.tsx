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
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
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
