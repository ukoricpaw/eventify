import styles from '../../../styles/WorkingSpace.module.scss';
import { IoIosArrowDropdown } from 'react-icons/io';
import LeftSectionItemSettings from './LeftSectionItemSettings';
import ItemTitleWrapper from '../GeneralWspaceComponents/ItemTitleWrapper';
import { useCallback } from 'react';
interface LeftSectionWspaceItemIProps {
  handleActive: (itemNumber: number) => void;
  active: number | null;
  wspaceId: number;
  roleId: number;
  name: string;
}

export default function LeftSectionWspaceItem({
  wspaceId,
  handleActive,
  active,
  roleId,
  name,
}: LeftSectionWspaceItemIProps) {
  const handler = useCallback(() => handleActive(wspaceId), []);
  return (
    <div onClick={handler} className={styles.leftSectionItem}>
      <div className={styles.itemTitleContainer}>
        <ItemTitleWrapper wspace={name} />
        {active === wspaceId ? (
          <IoIosArrowDropdown className={styles.dropdownIcon} color="gray" />
        ) : (
          <IoIosArrowDropdown color="gray" />
        )}
      </div>
      {active === wspaceId && <LeftSectionItemSettings wspaceRoleId={roleId} wspaceId={wspaceId} />}
    </div>
  );
}
