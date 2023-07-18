import styles from '../../styles/General.module.scss';
import { ReactNode, useContext } from 'react';
import { MembersContext } from '@/pages/users/[user]/wspace/[id]/members';

interface PaginationItemIProps {
  isSelected?: boolean;
  value: number;
  children?: ReactNode;
}

export default function PaginationItem({ isSelected, value, children }: PaginationItemIProps) {
  const { setPage } = useContext(MembersContext);
  return (
    <>
      <p
        onClick={isSelected ? () => null : () => setPage(value)}
        className={`${styles.paginationItem} ${isSelected ? styles.paginationItemSelected : ''}`}
      >
        {value}
      </p>
      {children}
    </>
  );
}
