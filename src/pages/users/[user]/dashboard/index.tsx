import { wrapper } from '@/store';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Error from '@/components/GeneralComponents/Error';
import { wspaceApi } from '@/store/api/wspaceApi';
import getCookies from '@/utils/getCookies';
import { WorkingSpacesResponce } from '@/types/wspaceTypes';
import MainLayout from '../../layout';
import Head from 'next/head';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import styles from '../../../../styles/WorkingSpace.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import LeftSectionWspacesList from '@/components/WspaceComponents/LeftSectionWspacesList';
import RightSectionWspacesList from '@/components/WspaceComponents/RightSectionWspacesList';
import { useGetWorkingSpacesClientQuery } from '@/store/api/wspaceApi';
import { SerializedError } from '@reduxjs/toolkit';
import AddNewWspaceModal from '@/components/WspaceComponents/AddNewWspaceModal';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { createContext } from 'react';
interface WspacePageIProps {
  status: string;
}

export const DashBoardContext = createContext<{ setActiveModal: () => void }>({ setActiveModal: () => {} });

export default function WspacePage({ status }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { userData } = useAppSelector(userSelector);
  const { data, isLoading, isError, error } = useGetWorkingSpacesClientQuery(null);
  const [activeModal, setActive] = useState<boolean>(false);

  const setActiveModal = () => {
    setActive(prev => !prev);
  };

  if (isError) {
    return <Error error={error as SerializedError} />;
  }

  const pageTitle = `${userData.email.slice(0, userData.email.lastIndexOf('@'))} | Рабочее пространство`;
  return (
    <DashBoardContext.Provider value={{ setActiveModal }}>
      <MainLayout>
        <Head>
          <title>{pageTitle}</title>
          <meta title="description" content={`Рабочее пространство пользователя ${userData.email}`} />
        </Head>
        <section className={styles.leftSection} id={'leftSection'}>
          <div className={styles.leftSection__titleContainer}>
            <p className={styles.title}>Рабочие пространства</p>
            <AiOutlinePlus onClick={setActiveModal} cursor={'pointer'} size={18} />
          </div>
          {data && <LeftSectionWspacesList wspaces={data} />}
        </section>
        <section className={styles.rightSection} id={'rightSection'}>
          <h2 className={styles.rightSection__title}>ваши рабочие пространства</h2>
          {data && <RightSectionWspacesList wspaces={data} />}
        </section>
        {activeModal && createPortal(<AddNewWspaceModal setActiveModal={setActiveModal} />, document.body)}
      </MainLayout>
    </DashBoardContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps<WspacePageIProps> = wrapper.getServerSideProps(
  store => async ctx => {
    return {
      props: {
        status: '200',
      },
    };
  },
);
