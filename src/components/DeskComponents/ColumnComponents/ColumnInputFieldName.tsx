import { memo, MouseEvent } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import useClickBodyListener from '@/hooks/useClickBodyListener';
import TextInputField from '@/hooks/TextInputField';

interface ColumnInputFieldNameIProps {
  name: string;
  listId: number;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null;
  activeInput?: number | null;
  setActiveInputHandler?: (column: number | null) => void;
  roleId: number;
}

export default memo(
  function ColumnInputFieldName({
    name,
    dragHandleProps,
    listId,
    activeInput,
    roleId,
    setActiveInputHandler,
  }: ColumnInputFieldNameIProps) {
    const [activeColumnCondition, setNull] = useClickBodyListener({
      activeCol: activeInput,
      colId: listId,
      setActiveHandler: setActiveInputHandler,
    });

    const handler = (e: MouseEvent<HTMLParagraphElement>) => {
      if (roleId !== 0 && roleId <= 2) {
        e.stopPropagation();
        setActiveInputHandler && setActiveInputHandler(listId);
      }
    };

    return (
      <TextInputField
        deskListId={null}
        setNull={setNull}
        paragraphHandler={handler}
        condition={activeColumnCondition}
        textVal={name}
        dragProps={dragHandleProps}
        emitFunction="renameColumn"
        id={listId}
      />
    );
  },
  (prevProps: Readonly<ColumnInputFieldNameIProps>, nextProps: Readonly<ColumnInputFieldNameIProps>) => {
    if (
      prevProps.activeInput === null &&
      prevProps.name === nextProps.name &&
      nextProps.activeInput !== nextProps.listId
    ) {
      return true;
    } else if (
      prevProps.activeInput !== null &&
      prevProps.name === nextProps.name &&
      prevProps.activeInput !== prevProps.listId &&
      nextProps.activeInput !== nextProps.listId
    ) {
      return true;
    } else if (
      prevProps.activeInput === prevProps.listId &&
      prevProps.name === nextProps.name &&
      nextProps.activeInput === nextProps.listId
    ) {
      return true;
    }
    return false;
  },
);
