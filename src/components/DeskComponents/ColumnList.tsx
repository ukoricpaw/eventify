import { useAppSelector } from '@/hooks/reduxHooks';
import styles from '../../styles/Desk.module.scss';
import SingleColumn from './SingleColumn';
import { deskDataSelectorResult } from '@/store/slices/deskSlice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { reorderItem } from '@/store/slices/deskSlice';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useCallback, useContext } from 'react';
import { DeskWSocketContext } from './DeskWSocketProvider';
import AddNewColumnButton from './AddNewColumnButton';

export default function ColumnList() {
  const dispatch = useAppDispatch();
  const deskWSocketData = useContext(DeskWSocketContext);

  const onDragEnd = useCallback((result: DropResult) => {
    const source = {
      id: Number(result.source.droppableId),
      index: result.source.index,
    };
    let destination = null;
    if (result.destination) {
      destination = {
        id: Number(result.destination?.droppableId),
        index: result.destination.index,
      };
      deskWSocketData?.reorderColumns(Number(result.draggableId), result.destination.index + 1);
    }
    dispatch(
      reorderItem({
        draggableId: Number(result.draggableId),
        source,
        destination,
        type: result.type as 'columns' | 'items',
      }),
    );
  }, []);

  const data = useAppSelector(deskDataSelectorResult);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" type="columns" direction="horizontal">
        {provided => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className={styles.columnList}>
            {data.map((list, index) => (
              <SingleColumn index={index} listId={list.id} key={String(list.id)} />
            ))}
            {provided.placeholder}
            {<AddNewColumnButton />}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
