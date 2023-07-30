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
import ColumnsActiveProvider from './ColumnsActiveProvider';
import { selectSingleWorkingSpaceResult } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';

export default function ColumnList() {
  const dispatch = useAppDispatch();
  const deskWSocketData = useContext(DeskWSocketContext);
  const { query } = useRouter();
  const data = useAppSelector(deskDataSelectorResult);
  const wspace = useAppSelector(
    state => selectSingleWorkingSpaceResult(state, Number(query.id)) as SingleWorkingSpaceType,
  );
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
      if (result.type === 'columns' && result.destination.index !== result.source.index) {
        deskWSocketData?.emitEvent('reorderColumns')(Number(result.draggableId), result.destination.index);
      } else if (result.type === 'items') {
        let secondList = null;
        if (result.destination.droppableId !== result.source.droppableId) {
          secondList = result.destination.droppableId;
        }
        if (secondList === null && result.source.index === result.destination.index) {
          return;
        }
        deskWSocketData?.emitEvent('reorderItemInColumns')(
          Number(result.source.droppableId),
          Number(result.draggableId),
          Number(result.destination.index),
          Number(secondList),
        );
      }
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

  return (
    <ColumnsActiveProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" type="columns" direction="horizontal">
          {provided => (
            <ul ref={provided.innerRef} {...provided.droppableProps} className={styles.columnList}>
              {data.map((list, index) => (
                <SingleColumn
                  roleId={wspace.workingSpaceRole ? wspace.workingSpaceRole.roleId : 0}
                  index={index}
                  listId={list.id}
                  key={String(list.id)}
                />
              ))}
              {provided.placeholder}
              {wspace.workingSpaceRole && wspace.workingSpaceRole.roleId <= 2 && <AddNewColumnButton />}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </ColumnsActiveProvider>
  );
}
