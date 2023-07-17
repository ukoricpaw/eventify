import Image from 'next/image';
import { MembersType } from '@/types/wspaceTypes';
import styles from '../../styles/WorkingSpace.module.scss';

interface MemberItemIProps {
  data: MembersType;
}

export default function MemberItem({ data }: MemberItemIProps) {
  return (
    <div className={styles.membersList__memberItem}>
      <div className={styles.membersItem__userInfo}>{/* <Image loader={} /> */}</div>
    </div>
  );
}
