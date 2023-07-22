import type { DeskList } from '@/types/deskListTypes';
import styles from '../../styles/Desk.module.scss';
import ColumnItem from './ColumnItem';
import { useDrag } from 'react-dnd/dist/hooks';

interface SingleColumnIProps {
  list: DeskList;
}

export default function SingleColumn({ list }: SingleColumnIProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'col',
    item: { id: list.id, order: list.order },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li ref={drag} className={styles.column}>
      <p className={styles.column__columnName}>{list.name}</p>
      <ul className={styles.itemList}>
        {list.desk_list_items.map(item => {
          return <ColumnItem key={item.id} item={item} />;
        })}
      </ul>
    </li>
  );
}
