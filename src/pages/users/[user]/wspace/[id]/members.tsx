import WorkingSpaceLayout from '@/components/GeneralComponents/WorkingSpaceLayout';
import { useGetWspaceMembersQuery } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import styles from '../../../../../styles/WorkingSpace.module.scss';
import MembersList from '@/components/WspaceComponents/RightSectionComponents/MembersList';
import { useState, ChangeEvent, MouseEvent, SetStateAction, Dispatch } from 'react';
import CompoundInput from '@/components/FormComponents/CompoundInput';
import Pagination from '@/components/Pagination/Pagination';
import { createContext } from 'react';
import CompoundButton from '@/components/FormComponents/CompoundButton';

export const MembersContext = createContext<{ setPage: Dispatch<SetStateAction<number>> }>({ setPage: () => {} });

export default function MembersPage() {
  const { query } = useRouter();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error, refetch } = useGetWspaceMembersQuery({
    wspaceId: Number(query.id),
    search,
    page,
    limit: 6,
  });

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    refetch();
  };

  return (
    <WorkingSpaceLayout>
      <h1 className={styles.wspacePageTitle}>Участники рабочего пространства</h1>
      <p className={styles.membersTitle__description}>
        В рабочем пространстве участники имеют возможность просматривать имеющиеся доски и присоединяться к ним, а также
        имеют право создавать новые доски для общего использования.
      </p>
      <div className={styles.members__inputContainer}>
        <CompoundInput
          value={search}
          onChange={changeSearch}
          variant="success"
          padding={{ x: '10', y: '12' }}
          placeholder="Найти участника..."
          width="300px"
        ></CompoundInput>
        <CompoundButton onClick={submitHandler} variant="light" padding={{ x: '10', y: '12' }}>
          Искать
        </CompoundButton>
        {data && <p>Результаты поиска ({data.count})</p>}
      </div>
      {data && <MembersList memberData={data.rows} />}{' '}
      <MembersContext.Provider value={{ setPage }}>
        {data && data.count !== 0 && <Pagination setPage={setPage} count={data.count} current={page} limit={6} />}
      </MembersContext.Provider>
    </WorkingSpaceLayout>
  );
}
