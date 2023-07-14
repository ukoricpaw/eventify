import { WorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import { IoIosArrowDropdown } from 'react-icons/io';
import LeftSectionItemSettings from './LeftSectionItemSettings';
import ItemTitleWrapper from './ItemTitleWrapper';

interface LeftSectionWspaceItemIProps {
  handleActive: (itemNumber: number) => void;
  active: number | null;
  wspace: WorkingSpaceType;
}

export default function LeftSectionWspaceItem({ wspace, handleActive, active }: LeftSectionWspaceItemIProps) {
  const handler = () => handleActive(wspace.id);
  return (
    <div onClick={handler} className={styles.leftSectionItem}>
      <div className={styles.itemTitleContainer}>
        <ItemTitleWrapper wspace={wspace.name} />
        {active === wspace.id ? (
          <IoIosArrowDropdown className={styles.dropdownIcon} color="gray" />
        ) : (
          <IoIosArrowDropdown color="gray" />
        )}
      </div>
      {active === wspace.id && <LeftSectionItemSettings wspaceId={wspace.id} />}
    </div>
  );
}
