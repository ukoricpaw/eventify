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

interface WspacePageIProps {
  status: string;
  wspaces: WorkingSpacesResponce | null;
}

export default function WspacePage({ status, wspaces }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useAppSelector(userSelector);
  if (status !== '200') {
    return <Error status={status} />;
  }
  const pageTitle = `${data.email.slice(0, data.email.lastIndexOf('@'))} | Рабочее пространство`;
  return (
    <MainLayout>
      <Head>
        <title>{pageTitle}</title>
        <meta title="description" content={`Рабочее пространство пользователя ${data.email}`} />
      </Head>
      <section className={styles.leftSection} id={'leftSection'}>
        <div className={styles.leftSection__titleContainer}>
          <p className={styles.title}>Рабочие пространства</p>
          <AiOutlinePlus cursor={'pointer'} size={18} />
        </div>
        <LeftSectionWspacesList wspaces={wspaces} />
      </section>
      <section className={styles.rightSection} id={'rightSection'}>
        <h2 className={styles.rightSection__title}>ваши рабочие пространства</h2>
        <RightSectionWspacesList wspaces={wspaces} />
      </section>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<WspacePageIProps> = wrapper.getServerSideProps(
  store => async ctx => {
    const cookies = ctx.req.cookies;
    const headers = {
      Cookie: getCookies(cookies),
    };
    await store.dispatch(
      wspaceApi.endpoints.getAllWorkingSpaces.initiate({
        headers,
      }),
    );

    const response = wspaceApi.endpoints.getAllWorkingSpaces.select({ headers })(store.getState());
    if (response.error) {
      return {
        props: {
          status: String(response.error?.status),
          wspaces: null,
        },
      };
    }
    return {
      props: {
        status: '200',
        wspaces: response.data,
      },
    };
  },
);
