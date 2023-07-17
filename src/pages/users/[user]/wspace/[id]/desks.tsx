import WorkingSpaceLayout from '@/components/GeneralComponents/WorkingSpaceLayout';
import { WspaceLayoutContext } from '@/components/GeneralComponents/WorkingSpaceLayout';
import RightSectionDeskList from '@/components/WspaceComponents/RightSectionItemDesksList';
import { DeskType } from '@/types/deskTypes';
import styles from '../../../../../styles/WorkingSpace.module.scss';

export default function DesksPage() {
  return (
    <WorkingSpaceLayout>
      <h1 className={styles.desksTitle}>Доски</h1>
      <WspaceLayoutContext.Consumer>
        {ctx => (
          <RightSectionDeskList desks={ctx?.workingSpace.desks as DeskType[]} wspaceId={Number(ctx?.workingSpace.id)} />
        )}
      </WspaceLayoutContext.Consumer>
    </WorkingSpaceLayout>
  );
}
