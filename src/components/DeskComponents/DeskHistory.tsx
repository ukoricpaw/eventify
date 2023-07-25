import { useGetHistoryQuery } from '@/store/api/deskApi';
import { useRouter } from 'next/router';
import { ActType } from '@/utils/defineHistoryAction';
import DeskActItem from './DeskActItem';
import styles from '../../styles/Desk.module.scss';

export default function DeskHistory() {
  const { query } = useRouter();
  const { data, isLoading } = useGetHistoryQuery({ wspaceId: Number(query.id), deskId: Number(query.deskId) });
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className={styles.deskAct__list}>
      {data?.rows.map(item => {
        const deskAct: ActType = {
          act: item.desk_act,
          firstItem: item.firstItem,
          secondItem: item.secondItem,
          userEmail: item.user.email,
        };
        return <DeskActItem createdAt={item.createdAt} key={item.id} deskAct={deskAct} user={item.user} />;
      })}
    </div>
  );
}
