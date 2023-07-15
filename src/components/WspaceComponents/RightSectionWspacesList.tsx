import { WorkingSpacesResponce } from '@/types/wspaceTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import RightSectionWspaceItem from './RightSectionWspaceItem';
import CompoundButton from '../FormComponents/CompoundButton';
import Image from 'next/image';
import emptyList from '../../assets/images/emptyList.png';

export default function RightSectionWspacesList({ wspaces }: { wspaces: WorkingSpacesResponce | null }) {
  return (
    <ul className={styles.rightSection__wspacesList}>
      {wspaces && wspaces.count > 0 ? (
        wspaces.rows.map(wspaceItem => {
          return <RightSectionWspaceItem key={wspaceItem.id} wspace={wspaceItem} />;
        })
      ) : (
        <div className={styles.rightSection__wspacesListEmpty}>
          <Image src={emptyList} width={250} height={200} alt="emptyList" priority />
          <p className={styles.rightSection__wspacesListEmptyTitle}>У Вас ещё нет рабочих пространств</p>
          <CompoundButton variant={'success'}>Создать рабочее пространство</CompoundButton>
        </div>
      )}
    </ul>
  );
}
