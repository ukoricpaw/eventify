import styles from '../../../styles/Desk.module.scss';
import ColumnItem from './ColumnItem';
import { Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from '@/hooks/reduxHooks';
import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { selectSingleWorkingSpaceResult } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';
import ContextConsumer from '@/components/GeneralComponents/ContextConsumer';
import AddNewItemButton from './AddNewItemButton';
import { ColumnsContext } from '../GeneralDeskComponents/ColumnsActiveProvider';
import ColumnMoreButton from './ColumnMoreButton';
import ColumnInfoContextProvider from '../GeneralDeskComponents/ColumnInfoProvider';
import ColumnInputFieldName from './ColumnInputFieldName';

interface SingleColumnIProps {
  listId: number;
  index: number;
  roleId: number;
}

export default memo(function SingleColumn({ listId, index, roleId }: SingleColumnIProps) {
  const list = useAppSelector(state => state.listReducer.lists.find(list => list.id == listId));

  const { query } = useRouter();
  const wspace = useAppSelector(
    state => selectSingleWorkingSpaceResult(state, Number(query.id)) as SingleWorkingSpaceType,
  );

  if (!list) {
    return;
  }

  return (
    <Draggable
      isDragDisabled={!wspace.workingSpaceRole || wspace.workingSpaceRole.roleId === 3}
      draggableId={String(list.id)}
      index={index}
    >
      {provided => (
        <li ref={provided.innerRef} {...provided.draggableProps} className={styles.column}>
          <div className={styles.column__wrapper}>
            <ContextConsumer Context={ColumnsContext}>
              {value => (
                <div className={styles.column__nameWrapper} {...provided.dragHandleProps}>
                  <ColumnInputFieldName
                    roleId={roleId}
                    listId={list.id}
                    activeInput={value?.activeInput}
                    setActiveInputHandler={value?.setActiveInputHandler}
                    name={list.name}
                  />
                  <ColumnInfoContextProvider
                    isarchived={list.isarchived}
                    roleId={roleId}
                    name={list.name}
                    listId={list.id}
                  >
                    <ColumnMoreButton
                      roleId={roleId}
                      columnId={listId}
                      activeMoreInfo={value?.activeMoreInfo}
                      setActiveMoreInfoHandler={value?.setActiveMoreInfoHandler}
                    />
                  </ColumnInfoContextProvider>
                </div>
              )}
            </ContextConsumer>
            <Droppable droppableId={String(list.id)} type="items">
              {provided => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className={styles.itemList}>
                  {list.desk_list_items &&
                    list.desk_list_items.filter(Boolean).map((item, index) => {
                      return (
                        <ColumnItem
                          roleId={wspace.workingSpaceRole ? wspace.workingSpaceRole.roleId : 0}
                          key={String(item.id)}
                          itemId={item.id}
                          index={index}
                        />
                      );
                    })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            {roleId !== 0 && roleId <= 2 && (
              <ContextConsumer Context={ColumnsContext}>
                {value => (
                  <AddNewItemButton
                    columnId={listId}
                    activeColumn={value?.activeColumn}
                    setActiveColumnHandler={value?.setActiveColumnHandler}
                  />
                )}
              </ContextConsumer>
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
});
