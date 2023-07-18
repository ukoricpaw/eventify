import { WorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import { IoIosArrowDropdown } from 'react-icons/io';
import LeftSectionItemSettings from './LeftSectionItemSettings';
import ItemTitleWrapper from '../GeneralWspaceComponents/ItemTitleWrapper';
import { useGetSingleWorkingSpaceClientQuery } from '@/store/api/wspaceApi';

interface LeftSectionWspaceItemIProps {
  handleActive: (itemNumber: number) => void;
  active: number | null;
  wspaceId: number;
}

export default function LeftSectionWspaceItem({ wspaceId, handleActive, active }: LeftSectionWspaceItemIProps) {
  const { data } = useGetSingleWorkingSpaceClientQuery(wspaceId);
  const handler = () => handleActive(wspaceId);
  return (
    <div onClick={handler} className={styles.leftSectionItem}>
      <div className={styles.itemTitleContainer}>
        {data && <ItemTitleWrapper wspace={data.workingSpace.name} />}
        {active === wspaceId ? (
          <IoIosArrowDropdown className={styles.dropdownIcon} color="gray" />
        ) : (
          <IoIosArrowDropdown color="gray" />
        )}
      </div>
      {active === wspaceId && <LeftSectionItemSettings wspaceId={wspaceId} />}
    </div>
  );
}
