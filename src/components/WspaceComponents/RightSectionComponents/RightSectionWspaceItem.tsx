import styles from '../../../styles/WorkingSpace.module.scss';
import RightSectionItemSettings from './RightSectionItemSettings';
import RightSectionDeskList from './RightSectionItemDesksList';
import { useGetSingleWorkingSpaceClientQuery } from '@/store/api/wspaceApi';

export default function RightSectionWspaceItem({ wspace }: { wspace: number }) {
  const { data } = useGetSingleWorkingSpaceClientQuery(wspace);
  return (
    <div className={styles.rightSection__wspaceItem}>
      {data && <RightSectionItemSettings wspaceName={data?.workingSpace.name} wspaceId={data.workingSpace.id} />}
      {data && (
        <RightSectionDeskList
          userWspaceRole={data.workingSpaceRole.roleId}
          desks={data.workingSpace.desks}
          wspaceId={data.workingSpace.id}
        />
      )}
    </div>
  );
}
