import { AiOutlinePlus } from 'react-icons/ai';
import styles from '../../../styles/Desk.module.scss';
import { memo } from 'react';
import AddNewItemTextInput from './AddNewItemTextInput';
import useClickBodyListener from '@/hooks/useClickBodyListener';

interface AddNewItemButtonIProps {
  columnId: number;
  activeColumn?: number | null;
  setActiveColumnHandler?: (column: number | null) => void;
}

export default memo(
  function AddNewItemButton({ activeColumn, setActiveColumnHandler, columnId }: AddNewItemButtonIProps) {
    const [activeColumnCondition, setActiveColumnNull] = useClickBodyListener({
      activeCol: activeColumn,
      colId: columnId,
      setActiveHandler: setActiveColumnHandler,
    });

    return (
      <section
        className={styles.addNewItemContainer}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {!activeColumnCondition && (
          <div
            style={!activeColumnCondition ? { cursor: 'pointer' } : {}}
            className={styles.addNewItemButton}
            onClick={() => {
              setActiveColumnHandler && setActiveColumnHandler(columnId);
            }}
          >
            <AiOutlinePlus size={16} />
            Добавить карточку
          </div>
        )}
        {activeColumnCondition && (
          <AddNewItemTextInput setActiveColumnNull={setActiveColumnNull} columnId={columnId} />
        )}
      </section>
    );
  },
  (prevProps: Readonly<AddNewItemButtonIProps>, nextProps: Readonly<AddNewItemButtonIProps>) => {
    if (prevProps.activeColumn === null && nextProps.activeColumn !== prevProps.columnId) {
      return true;
    } else if (
      prevProps.activeColumn !== null &&
      prevProps.activeColumn !== prevProps.columnId &&
      nextProps.activeColumn !== nextProps.columnId
    ) {
      return true;
    } else if (prevProps.activeColumn === prevProps.columnId && nextProps.activeColumn === nextProps.columnId) {
      return true;
    }
    return false;
  },
);
