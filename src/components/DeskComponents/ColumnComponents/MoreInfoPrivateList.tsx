import styles from '../../../styles/Desk.module.scss';
import { FaArchive } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useContext } from 'react';
import { ColumnsContext } from '../GeneralDeskComponents/ColumnsActiveProvider';
import { DeleteColumnModalContext } from '../GeneralDeskComponents/ColumnsActiveProvider';
import ContextConsumer from '@/components/GeneralComponents/ContextConsumer';
import { DeskWSocketContext } from '../GeneralDeskComponents/DeskWSocketProvider';

interface MoreInfoPrivateListIProps {
  name: string;
  listId: number;
}

export default function MoreInfoPrivateList({ name, listId }: MoreInfoPrivateListIProps) {
  const columnData = useContext(ColumnsContext);
  const modalColumnData = useContext(DeleteColumnModalContext);

  return (
    <ul className={styles.moreInfoPrivateList}>
      <ContextConsumer Context={DeskWSocketContext}>
        {value => (
          <li className={styles.moreInfoList__item} onClick={() => value?.emitEvent('archiveColumn')(listId, 'true')}>
            <FaArchive size={12} /> Архивировать...
          </li>
        )}
      </ContextConsumer>
      <li
        onClick={() => {
          columnData?.setActiveMoreInfoHandler(null);
          modalColumnData?.setListIdHandler(`${listId}/${name}`);
          modalColumnData?.openDeleteHandler();
        }}
        className={`${styles.moreInfoList__item} ${styles.moreInfoList__delete}`}
      >
        <AiFillDelete size={12} /> Удалить...
      </li>
    </ul>
  );
}
