import { ReactNode } from 'react';
import SingleWspaceAside from '../WspaceComponents/GeneralWspaceComponents/SingleWspaceAside';
import { useRouter } from 'next/router';
import { useGetSingleWorkingSpaceClientQuery, useGetWorkingSpacesClientQuery } from '@/store/api/wspaceApi';
import OwnNavbar from './OwnNavbar';
import styles from '../../styles/WorkingSpace.module.scss';
import CreateWspaceModalProvider from './CreateWspaceModalProvider';
import WspaceDescription from '../WspaceComponents/GeneralWspaceComponents/WspaceDescription';
import Error from './Error';
import Head from 'next/head';
import getWspacePath, { SinglePath } from '@/utils/getWspacePath';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';

export default function WorkingSpaceLayout({ children }: { children: ReactNode }) {
  const { query, pathname } = useRouter();
  const { data, isLoading, isError, error } = useGetSingleWorkingSpaceClientQuery(Number(query.id));
  const { userData } = useAppSelector(userSelector);
  const wspaceData = useGetWorkingSpacesClientQuery(userData.id);
  if (isLoading && wspaceData.isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || wspaceData.isError) {
    return <Error error={'400'} />;
  }

  return (
    <CreateWspaceModalProvider>
      <Head>
        <title>
          {data?.workingSpace.name} | {getWspacePath(pathname.split('/').reverse()[0] as SinglePath)}
        </title>
      </Head>
      <OwnNavbar />
      <div className={styles.workingSpaceContainer}>
        <SingleWspaceAside data={data} />
        <div className={styles.wspaceLayoutChildren}>
          <WspaceDescription data={data} />
          <div className={styles.wspaceLayoutChildren__elements}>{children}</div>
        </div>
      </div>
    </CreateWspaceModalProvider>
  );
}
