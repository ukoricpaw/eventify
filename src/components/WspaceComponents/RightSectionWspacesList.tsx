import { WorkingSpacesResponce } from '@/types/wspaceTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import RightSectionWspaceItem from './RightSectionWspaceItem';

export default function RightSectionWspacesList({ wspaces }: { wspaces: WorkingSpacesResponce | null }) {
  return (
    <ul className={styles.rightSection__wspacesList}>
      {wspaces && wspaces.count > 0
        ? wspaces.rows.map(wspaceItem => {
            return <RightSectionWspaceItem key={wspaceItem.id} wspace={wspaceItem} />;
          })
        : 'Нету)'}
    </ul>
  );
}
