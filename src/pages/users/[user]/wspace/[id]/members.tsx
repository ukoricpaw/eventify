import WorkingSpaceLayout from '@/components/GeneralComponents/WorkingSpaceLayout';
import styles from '../../../../../styles/WorkingSpace.module.scss';
import MembersInputContainer from '@/components/WspaceComponents/RightSectionComponents/MembersInputContainer';

export default function MembersPage() {
  return (
    <WorkingSpaceLayout>
      <h1 className={styles.wspacePageTitle}>Участники рабочего пространства</h1>
      <p className={styles.membersTitle__description}>
        В рабочем пространстве участники имеют возможность просматривать имеющиеся доски и присоединяться к ним, а также
        имеют право создавать новые доски для общего использования.
      </p>
      <MembersInputContainer />
    </WorkingSpaceLayout>
  );
}
