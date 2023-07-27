import { ActType } from '@/utils/defineHistoryAction';
import { DeskHistoryItemType } from '@/types/deskTypes';
import styles from '../../styles/Desk.module.scss';
import UserAvatar from '../WspaceComponents/GeneralWspaceComponents/UserAvatar';
import { FaUser } from 'react-icons/fa';
import defineHistoryAction from '@/utils/defineHistoryAction';
import getDate from '@/utils/getDate';

interface DeskActItemIProps {
  deskAct: ActType;
  createdAt: string;
}

export default function DeskActItem({
  deskAct,
  createdAt,
  user,
}: DeskActItemIProps & Pick<DeskHistoryItemType, 'user'>) {
  return (
    <div className={styles.deskAct__item}>
      {user.avatar ? <UserAvatar noCursor={true} src={user.avatar} size={45} /> : <FaUser size={45} />}
      <div className={styles.deskAct__itemInfo}>
        <p className={styles.actDescription}>{defineHistoryAction(deskAct)}</p>
        <p className={styles.actCreatedAt}>{getDate(createdAt)}</p>
      </div>
    </div>
  );
}
