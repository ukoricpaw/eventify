import type { DeskListItem } from '@/types/deskListTypes';
import styles from '../../styles/Desk.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { useAppSelector } from '@/hooks/reduxHooks';
import { memo } from 'react';
interface ColumnItemIProps {
  itemId: number;
  index: number;
}

export default memo(function ColumnItem({ itemId, index }: ColumnItemIProps) {
  const item = useAppSelector(state => state.deskReducer.listItems.find(item => item.id === itemId));
  if (!item) {
    return;
  }
  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {provided => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.columnItem}
        >
          {item.name}
        </li>
      )}
    </Draggable>
  );
});