import { DropResult } from 'react-beautiful-dnd';
import { reorderItem } from '@/store/slices/listsSlice';
import { AppDispatch } from '@/store';
import { DeskWSocketContextInterface } from '@/types/deskTypes';

const onDragEndHandler =
  (dispatch: AppDispatch, deskWSocketData: DeskWSocketContextInterface | null) => (result: DropResult) => {
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
  };

export default onDragEndHandler;
