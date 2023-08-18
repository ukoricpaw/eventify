import getNameByModaltype from '@/utils/getNameByModalType';
import styles from '../../../styles/Modal.module.scss';
import { EnumModal } from '@/types/modalDeskTypes';
import DeleteByType from './DeleteByType';
import { DeskEntities } from '@/types/deskTypes';
import { DeskListItem } from '@/types/deskListTypes';

interface ModalTitleIProps {
  type: EnumModal;
  createdAt: string;
  data: DeskEntities;
  roleCondition: boolean;
}

export default function ModalTitle({ createdAt, type, data, roleCondition }: ModalTitleIProps) {
  const nameOfModal = getNameByModaltype(type, createdAt);
  return (
    <div className={styles.modal__title}>
      <div className={styles.modal__iconTitle}>
        {nameOfModal[0]({ size: 25 })}
        <span className={styles.nameOfModal}>{nameOfModal[1]}</span>
      </div>
      <span className={styles.modal__createdAt}>{nameOfModal[2]}</span>
      {roleCondition && <DeleteByType listId={(data as DeskListItem).deskListId} id={data.id} type={type} />}
    </div>
  );
}
