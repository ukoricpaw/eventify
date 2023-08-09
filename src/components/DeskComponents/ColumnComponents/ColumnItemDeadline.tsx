import { getLocaleDateWithoutTimeString } from '@/utils/getLocaleDateString';
import styles from '../../../styles/Desk.module.scss';
import { FaClock } from 'react-icons/fa';
import getBackgroundColorByDayDiff from '@/utils/getBackgroundColorByDayDiff';
import { memo } from 'react';

export default memo(function ColumnItemDeadline({ deadline }: { deadline: string }) {
  const [localedDeadline, dayDiff] = getLocaleDateWithoutTimeString(deadline);
  const styleOfBackground = getBackgroundColorByDayDiff(dayDiff);
  return (
    <div className={`${styles.deadlineContainer} ${styleOfBackground}`}>
      <FaClock size={12} color={'white'} />
      {localedDeadline}
    </div>
  );
});
