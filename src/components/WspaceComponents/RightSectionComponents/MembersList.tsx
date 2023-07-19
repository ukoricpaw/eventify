import { MembersType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import MemberItem from './MemberItem';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { WspaceLayoutContext } from '@/components/GeneralComponents/WorkingSpaceLayout';
import { memo } from 'react';

export default memo(function MembersList({ memberData }: { memberData: MembersType[] }) {
  const { userData } = useAppSelector(userSelector);

  return (
    <ul className={styles.membersList}>
      {memberData &&
        memberData.map(item => (
          <WspaceLayoutContext.Consumer key={item.userId}>
            {val => <MemberItem userId={userData.id} wspaceUserId={val.workingSpace.user.id as number} data={item} />}
          </WspaceLayoutContext.Consumer>
        ))}
    </ul>
  );
});
