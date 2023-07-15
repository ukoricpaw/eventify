import styles from '../../styles/WorkingSpace.module.scss';
import { MouseEvent, ReactNode } from 'react';

interface ModalLayoutIProps {
  setActiveModal: () => void;
  children: ReactNode;
}

export default function ModalLayout({ setActiveModal, children }: ModalLayoutIProps) {
  const stopModalPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.addNewWspaceModal} onClick={setActiveModal}>
      <div className={styles.modalWrapper} onClick={stopModalPropagation}>
        {children}
      </div>
    </div>
  );
}
