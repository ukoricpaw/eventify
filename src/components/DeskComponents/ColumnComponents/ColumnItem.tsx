import styles from '../../../styles/Desk.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { useAppSelector } from '@/hooks/reduxHooks';
import { memo } from 'react';
import ContextConsumer from '@/components/GeneralComponents/ContextConsumer';
import { DeskColumnModalContext } from '../ModalFieldsComponents/DeskColumnModalProvider';
import { EnumModal } from '@/types/modalDeskTypes';
import ColumnItemDeadline from './ColumnItemDeadline';
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
              <p className={styles.columnItem__text}>{item.name}</p>
              {item.deadline && <ColumnItemDeadline deadline={item.deadline} />}
            </li>
          )}
        </ContextConsumer>
      )}
    </Draggable>
  );
});
