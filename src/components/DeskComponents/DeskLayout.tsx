import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Desk.module.scss';
import default_picture from '../../assets/images/default_picture.jpeg';
import Image from 'next/image';
import { useGetWorkingSpacesClientQuery, useGetSingleWorkingSpaceClientQuery } from '@/store/api/wspaceApi';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { getSingleDesk, layoutSelector } from '@/store/slices/deskSlice';
import Head from 'next/head';
import CreateWspaceModalProvider from '../GeneralComponents/CreateWspaceModalProvider';
import OwnNavbar from '../GeneralComponents/OwnNavbar';
import homeStyles from '../../styles/General.module.scss';
import DeskInfo from './DeskInfo';
import DeskAsideInfo from './DeskAsideInfo';
import DeskWSocketProvider from './DeskWSocketProvider';
interface DeskLayoutIProps {
  children: ReactNode;
}

export default function DeskLayout({ children }: DeskLayoutIProps) {
  const { query } = useRouter();
  const { userData } = useAppSelector(userSelector);
  const { name, background, isLoading, isError } = useAppSelector(layoutSelector);
  const dispatch = useAppDispatch();
  const wspaceData = useGetWorkingSpacesClientQuery(userData.id);
  const singleWspace = useGetSingleWorkingSpaceClientQuery(Number(query.id));
  const title = `${name} | Eventify`;
  useEffect(() => {
    dispatch(getSingleDesk({ wspaceId: Number(query.id), deskId: Number(query.deskId) }));
  }, []);

  const render = () => {
    if (wspaceData.isLoading || isLoading || singleWspace.isLoading) {
      return <div>Loading...</div>;
    }

    if (wspaceData.isError || isError || singleWspace.isError) {
      return <div>Error</div>;
    }
    console.log('renderlayout');

    return (
      <DeskWSocketProvider wspaceId={Number(query.id)} deskId={Number(query.deskId)}>
        <Head>
          <title>{title}</title>
        </Head>
        <Image
          draggable={false}
          className={styles.deskBackground}
          alt="background Image"
          loader={({ src, width }) => `${src}?w=${width}`}
          src={background ? `${process.env.NEXT_PUBLIC_API_URL}/api/image/${background}` : default_picture}
          priority
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL={background ? `${process.env.NEXT_PUBLIC_API_URL}/api/image/${background}` : default_picture.src}
        />
        <CreateWspaceModalProvider>
          <OwnNavbar />
          <div className={styles.deskContainer}>
            <DeskAsideInfo />
            <div className={styles.deskWrapper}>
              <DeskInfo />
              <main className={homeStyles.mainContainer}>
                <div className={homeStyles.mainWrapper}>{children}</div>
              </main>
            </div>
          </div>
        </CreateWspaceModalProvider>
      </DeskWSocketProvider>
    );
  };

  return render();
}
