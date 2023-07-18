import WorkingSpaceLayout from '@/components/GeneralComponents/WorkingSpaceLayout';
import styles from '../../../../../styles/WorkingSpace.module.scss';
import EditWspace from '@/components/WspaceComponents/GeneralWspaceComponents/EditWspace';
import { WspaceLayoutContext } from '@/components/GeneralComponents/WorkingSpaceLayout';

export default function SettingsPage() {
  return (
    <WorkingSpaceLayout>
      <h1 className={styles.wspacePageTitle}>Настройки рабочего пространства</h1>
      <WspaceLayoutContext.Consumer>
        {value => {
          return value.workingSpace ? <EditWspace data={value} /> : <></>;
        }}
      </WspaceLayoutContext.Consumer>
    </WorkingSpaceLayout>
  );
}
