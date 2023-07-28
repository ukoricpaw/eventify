import { AiOutlinePlus } from 'react-icons/ai';
import styles from '../../styles/Desk.module.scss';
import { useEffect, useCallback, memo } from 'react';
import AddNewItemTextInput from './AddNewItemTextInput';

interface AddNewItemButtonIProps {
  columnId: number;
  activeColumn?: number | null;
  setActiveColumnHandler?: (column: number | null) => void;
}

export default memo(function AddNewItemButton({
  activeColumn,
  setActiveColumnHandler,
  columnId,
}: AddNewItemButtonIProps) {
  const activeColumnCondition = activeColumn === columnId;
  useEffect(() => {
    if (activeColumnCondition) {
      document.body.addEventListener('click', setActiveColumnNull);
    } else {
      document.body.removeEventListener('click', setActiveColumnNull);
    }
  }, [activeColumn]);

  const setActiveColumnNull = useCallback(() => {
    setActiveColumnHandler && setActiveColumnHandler(null);
  }, []);

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
      {activeColumnCondition && <AddNewItemTextInput setActiveColumnNull={setActiveColumnNull} columnId={columnId} />}
    </section>
  );
});
