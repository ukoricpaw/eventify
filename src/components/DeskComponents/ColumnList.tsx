import { useAppSelector } from '@/hooks/reduxHooks';
import { selectAllDeskLists } from '@/store/api/deskApi';
import { SingleDesk } from '@/types/deskListTypes';
import { useRouter } from 'next/router';
import styles from '../../styles/Desk.module.scss';
import SingleColumn from './SingleColumn';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function ColumnList() {
  const { query } = useRouter();

  const data = useAppSelector(
    state => selectAllDeskLists(state, { wspaceId: Number(query.id), deskId: Number(query.deskId) }) as SingleDesk,
  );

  return (
    <ul className={styles.columnList}>
      <DndProvider backend={HTML5Backend}>
        {data.desk_lists.map(list => (
          <SingleColumn list={list} key={list.id} />
        ))}
      </DndProvider>
    </ul>
  );
}
