import { WorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import RightSectionItemSettings from './RightSectionItemSettings';
import RightSectionDeskList from './RightSectionItemDesksList';

export default function RightSectionWspaceItem({ wspace }: { wspace: WorkingSpaceType }) {
  return (
    <div className={styles.rightSection__wspaceItem}>
      <RightSectionItemSettings wspaceName={wspace.name} />
      <RightSectionDeskList desks={wspace.desks} />
    </div>
  );
}
