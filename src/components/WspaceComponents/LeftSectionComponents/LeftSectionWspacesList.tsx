import { WorkingSpacesResponce } from '@/types/wspaceTypes';
import { useState, useCallback } from 'react';
import LeftSectionWspaceItem from './LeftSectionWspaceItem';
import styles from '../../../styles/WorkingSpace.module.scss';

export default function LeftSectionWspacesList({ wspaces }: { wspaces: WorkingSpacesResponce | null }) {
  const [active, setActive] = useState<number | null>(null);

  const handleActive = useCallback((itemNumber: number) => {
    setActive(prev => (prev === itemNumber ? null : itemNumber));
  }, []);

  return (
    <ul className={styles.leftSectionWspacesList}>
      {wspaces && wspaces.count > 0 ? (
        wspaces.rows.map(wspaceItem => (
          <LeftSectionWspaceItem
            roleId={wspaceItem.working_space_roles[0].roleId}
            name={wspaceItem.name}
            key={wspaceItem.id}
            handleActive={handleActive}
            active={active}
            wspaceId={wspaceItem.id}
          />
        ))
      ) : (
        <p>У вас ещё нет рабочих пространств</p>
      )}
    </ul>
  );
}
