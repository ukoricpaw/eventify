import styles from '../../styles/Desk.module.scss';
import { FaArchive } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useContext } from 'react';
import { ColumnsContext } from './GeneralDeskComponents/ColumnsActiveProvider';
import { DeleteColumnModalContext } from './GeneralDeskComponents/ColumnsActiveProvider';

export default function MoreInfoPrivateList({ name, listId }: { name: string; listId: number }) {
  const columnData = useContext(ColumnsContext);
  const modalColumnData = useContext(DeleteColumnModalContext);

  return (
    <ul className={styles.moreInfoPrivateList}>
      <li className={styles.moreInfoList__item}>
        <FaArchive size={12} /> Архивировать...
      </li>
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
