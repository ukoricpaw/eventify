import { DeskType } from '@/types/deskTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import CompoundButton from '../../FormComponents/CompoundButton';
import { createPortal } from 'react-dom';
import { useCallback, useState } from 'react';
import AddNewDeskModal from '../GeneralWspaceComponents/AddNewDeskModal';
import DesksList from './DesksList';
interface DeskListIProps {
  desks: DeskType[];
  wspaceId: number;
  userWspaceRole: number;
}

export default function RightSectionDeskList({ desks, wspaceId, userWspaceRole }: DeskListIProps) {
  const [modalActive, setModalActive] = useState<boolean>(false);

  const setActiveModal = useCallback(() => {
    setModalActive(prev => !prev);
  }, []);

  return (
    <ul className={styles.rightSection__desksList}>
      {desks && <DesksList desks={desks} />}
      {userWspaceRole !== 3 && (
        <CompoundButton onClick={setActiveModal} variant="success" padding={{ y: '60' }}>
          <p className={styles.addNewDeskTitle}>Создать доску</p>
        </CompoundButton>
      )}
      {modalActive &&
        createPortal(<AddNewDeskModal wspaceId={wspaceId} setActiveModal={setActiveModal} />, document.body)}
    </ul>
  );
}
