import styles from '../../../styles/WorkingSpace.module.scss';
import CompoundButton from '../../FormComponents/CompoundButton';
import { createPortal } from 'react-dom';
import { useCallback, useState } from 'react';
import AddNewDeskModal from '../GeneralWspaceComponents/AddNewDeskModal';
import DesksList from './DesksList';
import { selectSingleWorkingSpaceResult } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';

export default function RightSectionDeskList({ wspaceId }: { wspaceId?: number }) {
  const { query } = useRouter();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const data = useAppSelector(
    state => selectSingleWorkingSpaceResult(state, wspaceId ?? Number(query.id)) as SingleWorkingSpaceType,
  );
  const setActiveModal = useCallback(() => {
    setModalActive(prev => !prev);
  }, []);

  return (
    <ul className={styles.rightSection__desksList}>
      {data.workingSpace && <DesksList desks={data.workingSpace.desks} />}
      {data.workingSpaceRole && data?.workingSpaceRole.roleId !== 3 ? (
        <CompoundButton onClick={setActiveModal} variant="success" padding={{ y: '60' }}>
          <p className={styles.addNewDeskTitle}>Создать доску</p>
        </CompoundButton>
      ) : data.workingSpace.desks.length === 0 ? (
        <p className={styles.emptyWspaceTitle}>В рабочем пространстве нет досок</p>
      ) : (
        ''
      )}
      {modalActive &&
        createPortal(
          <AddNewDeskModal wspaceId={wspaceId ?? Number(query.id)} setActiveModal={setActiveModal} />,
          document.body,
        )}
    </ul>
  );
}
