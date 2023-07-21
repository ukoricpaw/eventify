import Image from 'next/image';
import { MembersType, SingleWorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import { FaUser } from 'react-icons/fa';
import getRole from '@/utils/getRole';
import { ChangeEvent } from 'react';
import changeRole from '@/axios/http/changeRole';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectSingleWorkingSpaceResult } from '@/store/api/wspaceApi';

interface MemberItemIProps {
  memberData: MembersType;
  userId: number;
}

export default function MemberItem({ memberData, userId }: MemberItemIProps) {
  const changeRoleHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    changeRole(memberData.workingSpaceId, Number(e.target.value), memberData.userId);
  };
  const data = useAppSelector(
    state => selectSingleWorkingSpaceResult(state, memberData.workingSpaceId) as SingleWorkingSpaceType,
  );
  return (
    <div className={styles.membersList__memberItem}>
      <div className={styles.membersItem__userInfo}>
        {memberData.user.avatar ? (
          <Image
            className={styles.memberImage}
            placeholder="blur"
            blurDataURL={`${process.env.NEXT_PUBLIC_API_URL}/api/image/${memberData.user.avatar}`}
            alt="userImage"
            width={60}
            height={60}
            loader={({ src, width }) => `${src}?w=${width}`}
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/image/${memberData.user.avatar}`}
          />
        ) : (
          <FaUser color="gray" size={60} />
        )}
        <p className={styles.memberTitle}>@{memberData.user.email.slice(0, memberData.user.email.indexOf('@'))}</p>
      </div>
      {userId !== data?.workingSpaceRole.roleId ? (
        <p className={styles.membersRole}>{getRole(memberData.roleId)}</p>
      ) : memberData.userId !== data?.workingSpaceRole.roleId ? (
        <select onChange={changeRoleHandler} className={styles.memberSelectRole} defaultValue={memberData.roleId}>
          <option value={'2'}>Модератор</option>
          <option value={'3'}>Только чтение</option>
        </select>
      ) : (
        <p className={styles.membersRole}>{getRole(memberData.roleId)}</p>
      )}
    </div>
  );
}
