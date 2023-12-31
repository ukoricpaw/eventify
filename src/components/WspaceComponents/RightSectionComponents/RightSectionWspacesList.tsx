import { WorkingSpacesResponce } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import RightSectionWspaceItem from './RightSectionWspaceItem';
import CompoundButton from '../../FormComponents/CompoundButton';
import Image from 'next/image';
import emptyList from '../../../assets/images/emptyList.png';
import { ModalContext } from '../../GeneralComponents/CreateWspaceModalProvider';
import ContextConsumer from '@/components/GeneralComponents/ContextConsumer';

export default function RightSectionWspacesList({ wspaces }: { wspaces: WorkingSpacesResponce | null }) {
  return (
    <ul className={styles.rightSection__wspacesList}>
      {wspaces && wspaces.count > 0 ? (
        <WspacesList wspaces={wspaces} />
      ) : (
        <div className={styles.rightSection__wspacesListEmpty}>
          <Image src={emptyList} width={250} height={200} alt="emptyList" priority />
          <p className={styles.rightSection__wspacesListEmptyTitle}>У Вас ещё нет рабочих пространств</p>
          <ContextConsumer Context={ModalContext}>
            {value => (
              <CompoundButton variant={'success'} onClick={value.setActiveModal}>
                Создать рабочее пространство
              </CompoundButton>
            )}
          </ContextConsumer>
        </div>
      )}
    </ul>
  );
}

function WspacesList({ wspaces }: { wspaces: WorkingSpacesResponce }) {
  return wspaces.rows.map(wspaceItem => {
    return <RightSectionWspaceItem key={wspaceItem.id} wspace={wspaceItem.id} />;
  });
}
