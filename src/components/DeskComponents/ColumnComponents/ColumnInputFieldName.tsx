import { memo, MouseEvent } from 'react';
import useClickBodyListener from '@/hooks/useClickBodyListener';
import TextInputField from '@/components/DeskComponents/ModalFieldsComponents/TextInputField';

interface ColumnInputFieldNameIProps {
  name: string;
  listId: number;
  activeInput?: number | null;
  setActiveInputHandler?: (column: number | null) => void;
  roleId: number;
}

export default memo(
  function ColumnInputFieldName({
    name,
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
        cursor={roleId !== 0 && roleId <= 2 ? true : false}
        deskListId={null}
        setNull={setNull}
        paragraphHandler={handler}
        condition={activeColumnCondition}
        textVal={name}
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
