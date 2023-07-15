import { WorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import RightSectionItemSettings from './RightSectionItemSettings';
import RightSectionDeskList from './RightSectionItemDesksList';
import { useGetSingleWorkingSpaceClientQuery } from '@/store/api/wspaceApi';

export default function RightSectionWspaceItem({ wspace }: { wspace: WorkingSpaceType }) {
  const { data } = useGetSingleWorkingSpaceClientQuery(wspace.id);
  return (
    <div className={styles.rightSection__wspaceItem}>
      <RightSectionItemSettings wspaceName={wspace.name} />
      {data && <RightSectionDeskList desks={data.workingSpace.desks} wspaceId={data.workingSpace.id} />}
    </div>
  );
}
