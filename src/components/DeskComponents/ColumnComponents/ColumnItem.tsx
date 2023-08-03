import styles from '../../../styles/Desk.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { useAppSelector } from '@/hooks/reduxHooks';
import { memo } from 'react';
import ContextConsumer from '@/components/GeneralComponents/ContextConsumer';
import { DeskColumnModalContext } from '../GeneralDeskComponents/DeskColumnModalProvider';
import { EnumModal } from '@/types/modalDeskTypes';
interface ColumnItemIProps {
  itemId: number;
  index: number;
  roleId: number;
}

export default memo(function ColumnItem({ itemId, index, roleId }: ColumnItemIProps) {
  const item = useAppSelector(state => state.listReducer.listItems.find(item => item.id === itemId));
  if (!item) {
    return;
  }
  return (
    <Draggable isDragDisabled={roleId === 3 || roleId === 0} draggableId={String(item.id)} index={index}>
      {provided => (
        <ContextConsumer Context={DeskColumnModalContext}>
          {value => (
            <li
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={styles.columnItem}
              onClick={() => value?.setActiveModalHandler({ type: EnumModal.ITEM, content: itemId })}
            >
              {item.name}
            </li>
          )}
        </ContextConsumer>
      )}
    </Draggable>
  );
});
