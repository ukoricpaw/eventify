import type { DeskList } from '@/types/deskListTypes';
import styles from '../../styles/Desk.module.scss';
import ColumnItem from './ColumnItem';
import { Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from '@/hooks/reduxHooks';
import { memo, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface SingleColumnIProps {
  listId: number;
  index: number;
}

export default memo(function SingleColumn({ listId, index }: SingleColumnIProps) {
  const list = useAppSelector(state => state.deskReducer.lists.find(list => list.id == listId));

  if (!list) {
    return;
  }

  console.log(list);

  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {provided => (
        <li ref={provided.innerRef} {...provided.draggableProps} className={styles.column}>
          <div className={styles.column__wrapper}>
            <p className={styles.column__columnName} {...provided.dragHandleProps}>
              {list.name}
            </p>
            <Droppable droppableId={String(list.id)} type="items">
              {provided => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className={styles.itemList}>
                  {list.desk_list_items.filter(Boolean).map((item, index) => {
                    return <ColumnItem key={String(item.id)} itemId={item.id} index={index} />;
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  );
});
