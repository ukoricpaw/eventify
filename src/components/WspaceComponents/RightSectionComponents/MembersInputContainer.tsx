import Pagination from '@/components/Pagination/Pagination';
import MembersList from '@/components/WspaceComponents/RightSectionComponents/MembersList';
import { createContext } from 'react';
import styles from '../../../styles/WorkingSpace.module.scss';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import CompoundInput from '@/components/FormComponents/CompoundInput';
import { MouseEvent, useCallback, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useGetWspaceMembersQuery } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import useFormFields from '@/hooks/useFormFields';

export interface MembersListState {
  page: number;
  search: string;
  resultSearch: string;
}

interface MembersContextInterface {
  setState: Dispatch<SetStateAction<MembersListState>>;
  setPage: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const MembersContext = createContext<MembersContextInterface>({ setPage: () => {}, setState: () => {} });

export default function MembersInputContainer() {
  const { query } = useRouter();
  const { state, onChange, setState } = useFormFields({ search: '', resultSearch: '', page: 1 });
  const { data, isLoading, error, refetch } = useGetWspaceMembersQuery({
    wspaceId: Number(query.id),
    search: state.resultSearch,
    page: state.page,
    limit: 6,
  });

  const setPage = onChange('page');
  const setSearch = onChange('search');

  const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState(prev => ({ ...prev, resultSearch: prev.search }));
  };

  return (
    <>
      <div className={styles.members__inputContainer}>
        <CompoundInput
          value={state.search}
          onChange={setSearch}
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
      {data && <MembersList memberData={data.rows} />}
      <MembersContext.Provider value={{ setPage, setState }}>
        {data && data.count !== 0 && (
          <Pagination setPage={setState} count={data.count} current={state.page} limit={6} />
        )}
      </MembersContext.Provider>
    </>
  );
}
