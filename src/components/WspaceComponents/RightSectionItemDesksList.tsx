import { DeskType } from '@/types/deskTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import RightSectionDeskItem from './RightSectionDeskItem';
import CompoundButton from '../FormComponents/CompoundButton';

export default function RightSectionDeskList({ desks }: { desks: DeskType[] }) {
  return (
    <ul className={styles.rightSection__desksList}>
      {desks.map(desk => {
        return <RightSectionDeskItem key={desk.id} desk={desk} />;
      })}
      <CompoundButton variant="success" padding={{ y: '60' }}>
        <p className={styles.addNewDeskTitle}>Добавить доску</p>
      </CompoundButton>
    </ul>
  );
}
