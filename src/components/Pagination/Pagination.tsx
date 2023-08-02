import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';
import styles from '../../styles/General.module.scss';
import PaginationItem from './PaginationItem';
import { Dispatch, SetStateAction } from 'react';
import getPages from '@/utils/getPages';
import { memo } from 'react';
import { MembersListState } from '../WspaceComponents/RightSectionComponents/MembersInputContainer';
interface PaginationIProps {
  count: number;
  current: number;
  limit: number;
  setPage: Dispatch<SetStateAction<MembersListState>>;
}

export default memo(function Pagination({ count, current, limit, setPage }: PaginationIProps) {
  const pageCount = Math.ceil(count / limit);
  const pages = getPages(pageCount, current);
  const prevPage = () => {
    setPage(prev => ({ ...prev, page: prev.page - 1 }));
  };
  const nextPage = () => {
    setPage(prev => ({ ...prev, page: prev.page + 1 }));
  };
  return (
    <ul className={styles.paginationList}>
      {current !== 1 && <CgArrowLeft color="gray" size={25} onClick={prevPage} cursor={'pointer'} />}
      <ul className={styles.paginationList__items}>
        {pages[0] !== 1 && <PaginationItem value={1}>...</PaginationItem>}
        {pages.map((item, index) => (
          <PaginationItem key={index} value={item} isSelected={current === item ? true : false} />
        ))}
        {pageCount > limit && pages[limit - 1] !== pageCount && '...'}
        {pageCount > limit && pages[limit - 1] !== pageCount && <PaginationItem value={pageCount} />}
      </ul>
      {current !== pageCount && <CgArrowRight color="gray" size={25} onClick={nextPage} cursor={'pointer'} />}
    </ul>
  );
});
