import { useAppSelector } from '@/hooks/reduxHooks';
import { archiveDataSelector } from '@/store/selectors/deskSelectors';
import styles from '../../styles/Desk.module.scss';
import ArchiveListItem from './ArchiveListItem';

export default function ArchiveColumnsList() {
  const { lists } = useAppSelector(archiveDataSelector);

  return (
    <ul className={styles.archiveList}>
      {lists.length > 0 ? (
        <>
          <p className={styles.archiveList__qty}>Количество колонн в архиве: {lists.length}</p>
          {lists.map(list => (
            <ArchiveListItem key={list.id} listId={list.id} name={list.name} />
          ))}
        </>
      ) : (
        <p className={styles.archiveList__archiveEmptyTitle}>Архив пуст</p>
      )}
    </ul>
  );
}
