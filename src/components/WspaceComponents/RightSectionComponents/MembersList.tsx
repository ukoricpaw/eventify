import { MembersType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import MemberItem from './MemberItem';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { useContext } from 'react';
import { WspaceLayoutContext } from '../../GeneralComponents/WorkingSpaceLayout';

export default function MembersList({ memberData }: { memberData: MembersType[] }) {
  const { userData } = useAppSelector(userSelector);
  const data = useContext(WspaceLayoutContext);
  return (
    <ul className={styles.membersList}>
      {memberData &&
        memberData.map(item => {
          return (
            <MemberItem
              userId={userData.id}
              wspaceUserId={data?.workingSpace.user.id as number}
              key={item.userId}
              data={item}
            />
          );
        })}
    </ul>
  );
}
