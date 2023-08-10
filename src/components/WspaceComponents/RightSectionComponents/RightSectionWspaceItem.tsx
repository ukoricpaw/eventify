import styles from '../../../styles/WorkingSpace.module.scss';
import RightSectionItemSettings from './RightSectionItemSettings';
import RightSectionDeskList from './RightSectionItemDesksList';
import { useGetSingleWorkingSpaceClientQuery } from '@/store/api/wspaceApi';

export default function RightSectionWspaceItem({ wspace }: { wspace: number }) {
  const { data, isLoading } = useGetSingleWorkingSpaceClientQuery(wspace);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.rightSection__wspaceItem}>
      {data && (
        <RightSectionItemSettings
          deskCount={data.workingSpace.desks.length}
          wspaceRoleId={data.workingSpaceRole ? data.workingSpaceRole.roleId : 0}
          wspaceName={data?.workingSpace.name}
          wspaceId={data.workingSpace.id}
        />
      )}
      {data && <RightSectionDeskList wspaceId={data.workingSpace.id} />}
    </div>
  );
}
