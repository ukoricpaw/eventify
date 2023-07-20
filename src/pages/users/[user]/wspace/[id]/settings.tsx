import WorkingSpaceLayout from '@/components/GeneralComponents/WorkingSpaceLayout';
import styles from '../../../../../styles/WorkingSpace.module.scss';
import EditWspace from '@/components/WspaceComponents/GeneralWspaceComponents/EditWspace';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectSingleWorkingSpaceResult } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';

export default function SettingsPage() {
  const { query } = useRouter();
  const data = useAppSelector(
    state => selectSingleWorkingSpaceResult(state, Number(query.id)) as SingleWorkingSpaceType,
  );

  return (
    <WorkingSpaceLayout>
      <h1 className={styles.wspacePageTitle}>Настройки рабочего пространства</h1>
      {data && <EditWspace data={data} />}
    </WorkingSpaceLayout>
  );
}
