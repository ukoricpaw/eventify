import { createPortal } from 'react-dom';
import styles from '../../../styles/WorkingSpace.module.scss';
import { useState, useCallback, MouseEvent } from 'react';
import ModalLayout from '@/components/GeneralComponents/ModalLayout';
export default function DeleteWspace() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div>
      <span onClick={openHandler} className={styles.settings__deleteWspaceTitle}>
        Удалить рабочее пространство
      </span>
      {isOpen && createPortal(<ModalLayout setActiveModal={openHandler}>Hello</ModalLayout>, document.body)}
    </div>
  );
}
