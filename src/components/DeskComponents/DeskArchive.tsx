import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { getArchivedLists } from '@/store/thunks/fetchSingleDeskThunks';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useRouter } from 'next/router';
import ArchiveColumnsList from './ArchiveColumnsList';
import { archiveStatusSelector } from '@/store/selectors/deskSelectors';

export default function DeskArchive() {
  const dispatch = useAppDispatch();
  const { isError, isLoading, isFulfilled, deskId } = useAppSelector(archiveStatusSelector);
  const { query } = useRouter();
  useEffect(() => {
    if (!isFulfilled || (isFulfilled && deskId !== Number(query.deskId))) {
      dispatch(getArchivedLists({ wspaceId: Number(query.id), deskId: Number(query.deskId) }));
    }
  }, []);

  if (isLoading) {
    return <>Загрузка...</>;
  }
  if (isError) {
    return <>{isError}</>;
  }

  return <ArchiveColumnsList />;
}
