import type { DeskListItem } from '@/types/deskListTypes';
import styles from '../../styles/Desk.module.scss';

interface ColumnItemIProps {
  item: DeskListItem;
}

export default function ColumnItem({ item }: ColumnItemIProps) {
  return (
    <li className={styles.columnItem} key={item.id}>
      {item.name}
    </li>
  );
}
