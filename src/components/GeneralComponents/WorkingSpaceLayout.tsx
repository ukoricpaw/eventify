import { ReactNode } from 'react';
import SingleWspaceAside from '../WspaceComponents/GeneralWspaceComponents/SingleWspaceAside';
import { useRouter } from 'next/router';
import { useGetSingleWorkingSpaceClientQuery } from '@/store/api/wspaceApi';
import OwnNavbar from './OwnNavbar';
import styles from '../../styles/WorkingSpace.module.scss';
import { createContext } from 'react';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';
import CreateWspaceModalProvider from './CreateWspaceModalProvider';
import WspaceDescription from '../WspaceComponents/GeneralWspaceComponents/WspaceDescription';

export const WspaceLayoutContext = createContext<SingleWorkingSpaceType>({} as SingleWorkingSpaceType);

export default function WorkingSpaceLayout({ children }: { children: ReactNode }) {
  const { query, pathname } = useRouter();
  const { data } = useGetSingleWorkingSpaceClientQuery(Number(query.id));

  return (
    <WspaceLayoutContext.Provider value={data ?? ({} as SingleWorkingSpaceType)}>
      <CreateWspaceModalProvider>
        <OwnNavbar />
        <div className={styles.workingSpaceContainer}>
          <SingleWspaceAside data={data} query={pathname.split('/').reverse()[0] as 'settings' | 'members' | 'desks'} />
          <div className={styles.wspaceLayoutChildren}>
            <WspaceDescription data={data} />
            <div className={styles.wspaceLayoutChildren__elements}>{children}</div>
          </div>
        </div>
      </CreateWspaceModalProvider>
    </WspaceLayoutContext.Provider>
  );
}
