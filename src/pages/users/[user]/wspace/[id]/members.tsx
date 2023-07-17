import WorkingSpaceLayout from '@/components/GeneralComponents/WorkingSpaceLayout';
import { useGetWspaceMembersQuery } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import styles from '../../../../../styles/WorkingSpace.module.scss';
import MemberItem from '@/components/WspaceComponents/MemberItem';
import MembersList from '@/components/WspaceComponents/MembersList';

export default function MembersPage() {
  const { query } = useRouter();
  const { data, isLoading, error } = useGetWspaceMembersQuery(Number(query.id));
  return (
    <WorkingSpaceLayout>
      <h1 className={styles.desksTitle}>Участники рабочего пространства</h1>
      <p className={styles.membersTitle__description}>
        В рабочем пространстве участники имеют возможность просматривать имеющиеся доски и присоединяться к ним, а также
        имеют право создавать новые доски для общего использования.
      </p>
      {data && <MembersList data={data.rows} />}
    </WorkingSpaceLayout>
  );
}
