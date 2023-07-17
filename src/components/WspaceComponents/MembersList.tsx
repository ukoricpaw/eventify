import { MembersType } from '@/types/wspaceTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import MemberItem from './MemberItem';
import CompoundInput from '../FormComponents/CompoundInput';

export default function MembersList({ data }: { data: MembersType[] }) {
  return (
    <ul className={styles.membersList}>
      <CompoundInput variant="success" padding={{ x: '10', y: '12' }} placeholder="Найти участника..."></CompoundInput>
      {data &&
        data.map(item => {
          return <MemberItem key={item.userId} data={item} />;
        })}
    </ul>
  );
}
