import styles from '../../styles/General.module.scss';
import { ReactNode, useContext } from 'react';
import { MembersContext } from '../WspaceComponents/RightSectionComponents/MembersInputContainer';

interface PaginationItemIProps {
  isSelected?: boolean;
  value: number;
  children?: ReactNode;
}

export default function PaginationItem({ isSelected, value, children }: PaginationItemIProps) {
  const { setState } = useContext(MembersContext);
  return (
    <>
      <p
        onClick={isSelected ? () => null : () => setState(prev => ({ ...prev, page: value }))}
        className={`${styles.paginationItem} ${isSelected ? styles.paginationItemSelected : ''}`}
      >
        {value}
      </p>
      {children}
    </>
  );
}
