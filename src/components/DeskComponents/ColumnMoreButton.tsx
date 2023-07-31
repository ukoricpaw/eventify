import { AiOutlineMore } from 'react-icons/ai';
import styles from '../../styles/Desk.module.scss';
import { memo } from 'react';
import useClickBodyListener from '@/hooks/useClickBodyListener';
import MoreInfoWrapper from './MoreInfoWrapper';

interface ColumnMoreButtonIProps {
  activeMoreInfo?: number | null;
  setActiveMoreInfoHandler?: (columnId: number | null) => void;
  columnId: number;
  roleId: number;
}

export default memo(
  function ColumnMoreButton({ columnId, activeMoreInfo, setActiveMoreInfoHandler, roleId }: ColumnMoreButtonIProps) {
    const [activeColumnCondition, setActiveColumnNull] = useClickBodyListener({
      activeCol: activeMoreInfo,
      colId: columnId,
      setActiveHandler: setActiveMoreInfoHandler,
    });

    return (
      <div className={styles.moreInfo}>
        <div
          className={styles.moreButtonContainer}
          onClick={e => {
            e.stopPropagation();
            setActiveMoreInfoHandler && setActiveMoreInfoHandler(columnId);
          }}
        >
          <AiOutlineMore size={25} className={styles.moreButton} />
        </div>
        {activeColumnCondition && <MoreInfoWrapper setActiveColumnNull={setActiveColumnNull} />}
      </div>
    );
  },
  (prevProps: Readonly<ColumnMoreButtonIProps>, nextProps: Readonly<ColumnMoreButtonIProps>) => {
    if (
      (prevProps.activeMoreInfo !== null &&
        nextProps.activeMoreInfo !== nextProps.columnId &&
        prevProps.activeMoreInfo !== prevProps.columnId) ||
      prevProps.activeMoreInfo === nextProps.activeMoreInfo
    ) {
      return true;
    } else if (prevProps.activeMoreInfo === null && nextProps.activeMoreInfo !== prevProps.columnId) {
      return true;
    }
    return false;
  },
);
