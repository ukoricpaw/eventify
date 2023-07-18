import { wrapper } from '@/store';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Error from '@/components/GeneralComponents/Error';
import MainLayout from '../../../../components/GeneralComponents/MainLayout';
import Head from 'next/head';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import styles from '../../../../styles/WorkingSpace.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import LeftSectionWspacesList from '@/components/WspaceComponents/LeftSectionComponents/LeftSectionWspacesList';
import RightSectionWspacesList from '@/components/WspaceComponents/RightSectionComponents/RightSectionWspacesList';
import { useGetWorkingSpacesClientQuery } from '@/store/api/wspaceApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ModalContext } from '@/components/GeneralComponents/CreateWspaceModalProvider';
interface DashboardPageIProps {
  status: string;
}

export default function DashboardPage({ status }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { userData } = useAppSelector(userSelector);
  const { data, isLoading, isError, error } = useGetWorkingSpacesClientQuery(userData.id);

  if (status !== '200') {
    return <Error error={status} />;
  }

  if (isError) {
    return <Error error={error as FetchBaseQueryError} />;
  }

  const pageTitle = `${userData.email.slice(0, userData.email.lastIndexOf('@'))} | Рабочее пространство`;
  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta title="description" content={`Рабочее пространство пользователя ${userData.email}`} />
      </Head>
      <section className={styles.leftSection} id={'leftSection'}>
        <div className={styles.leftSection__titleContainer}>
          <p className={styles.title}>Рабочие пространства</p>
          <ModalContext.Consumer>
            {ctx => <AiOutlinePlus onClick={ctx.setActiveModal} cursor={'pointer'} size={18} />}
          </ModalContext.Consumer>
        </div>
        {data && <LeftSectionWspacesList wspaces={data} />}
      </section>
      <section className={styles.rightSection} id={'rightSection'}>
        <h2 className={styles.rightSection__title}>ваши рабочие пространства</h2>
        {data && <RightSectionWspacesList wspaces={data} />}
      </section>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardPageIProps> = wrapper.getServerSideProps(
  store => async ctx => {
    const cookieCondition = Boolean(ctx.req.cookies['refreshToken']);
    if (!cookieCondition) {
      return {
        props: {
          status: '401',
        },
      };
    }
    return {
      props: {
        status: '200',
      },
    };
  },
);
