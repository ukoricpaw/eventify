import { MembersType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import MemberItem from './MemberItem';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { memo } from 'react';

export default memo(function MembersList({ memberData }: { memberData: MembersType[] }) {
  const { userData } = useAppSelector(userSelector);

  return (
    <ul className={styles.membersList}>
      {memberData && memberData.map(item => <MemberItem key={item.userId} userId={userData.id} memberData={item} />)}
    </ul>
  );
});
