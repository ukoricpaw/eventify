import Image from 'next/image';
import { MembersType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import { FaUser } from 'react-icons/fa';
import getRole from '@/utils/getRole';
import { ChangeEvent } from 'react';
import changeRole from '@/axios/http/changeRole';
interface MemberItemIProps {
  data: MembersType;
  wspaceUserId: number;
  userId: number;
}

export default function MemberItem({ data, wspaceUserId, userId }: MemberItemIProps) {
  const changeRoleHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    changeRole(data.workingSpaceId, Number(e.target.value), data.userId);
  };
  return (
    <div className={styles.membersList__memberItem}>
      <div className={styles.membersItem__userInfo}>
        {data.user.avatar ? (
          <Image
            className={styles.memberImage}
            priority
            alt="userImage"
            width={60}
            height={60}
            loader={({ src, width }) => `${src}?w=${width}`}
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/image/${data.user.avatar}`}
          />
        ) : (
          <FaUser color="gray" size={60} />
        )}
        <p className={styles.memberTitle}>@{data.user.email.slice(0, data.user.email.indexOf('@'))}</p>
      </div>
      {userId !== wspaceUserId ? (
        <p className={styles.membersRole}>{getRole(data.roleId)}</p>
      ) : data.userId !== wspaceUserId ? (
        <select onChange={changeRoleHandler} className={styles.memberSelectRole} defaultValue={data.roleId}>
          <option value={'2'}>Модератор</option>
          <option value={'3'}>Только чтение</option>
        </select>
      ) : (
        <p className={styles.membersRole}>{getRole(data.roleId)}</p>
      )}
    </div>
  );
}
