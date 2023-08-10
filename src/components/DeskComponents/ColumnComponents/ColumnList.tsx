import { useAppSelector } from '@/hooks/reduxHooks';
import styles from '../../../styles/Column.module.scss';
import SingleColumn from './SingleColumn';
import { deskListsSelector } from '@/store/selectors/deskSelectors';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useContext } from 'react';
import { DeskWSocketContext } from '../GeneralDeskComponents/DeskWSocketProvider';
import AddNewColumnButton from './AddNewColumnButton';
import { selectSingleWorkingSpaceResult } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';
import onDragEndHandler from '@/utils/onDragEndHandler';

export default function ColumnList() {
  const dispatch = useAppDispatch();
  const deskWSocketData = useContext(DeskWSocketContext);
  const { query } = useRouter();
  const data = useAppSelector(deskListsSelector);
  const wspace = useAppSelector(
    state => selectSingleWorkingSpaceResult(state, Number(query.id)) as SingleWorkingSpaceType,
  );

  const onDragEnd = onDragEndHandler(dispatch, deskWSocketData);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" type="columns" direction="horizontal">
        {provided => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className={styles.columnList}>
            {data.map((list, index) => (
              <SingleColumn
                roleId={wspace.workingSpaceRole ? wspace.workingSpaceRole.roleId : 0}
                index={index}
                listId={list}
                key={String(list)}
              />
            ))}
            {provided.placeholder}
            {wspace.workingSpaceRole && wspace.workingSpaceRole.roleId <= 2 && <AddNewColumnButton />}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
