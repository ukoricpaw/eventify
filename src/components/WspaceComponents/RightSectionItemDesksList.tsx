import { DeskType } from '@/types/deskTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import CompoundButton from '../FormComponents/CompoundButton';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import AddNewDeskModal from './AddNewDeskModal';
import DesksList from './DesksList';
interface DeskListIProps {
  desks: DeskType[];
  wspaceId: number;
}

export default function RightSectionDeskList({ desks, wspaceId }: DeskListIProps) {
  const [modalActive, setModalActive] = useState<boolean>(false);

  const setActiveModal = () => {
    setModalActive(prev => !prev);
  };

  return (
    <ul className={styles.rightSection__desksList}>
      <DesksList desks={desks} />
      <CompoundButton onClick={setActiveModal} variant="success" padding={{ y: '60' }}>
        <p className={styles.addNewDeskTitle}>Создать доску</p>
      </CompoundButton>
      {modalActive &&
        createPortal(<AddNewDeskModal wspaceId={wspaceId} setActiveModal={setActiveModal} />, document.body)}
    </ul>
  );
}
