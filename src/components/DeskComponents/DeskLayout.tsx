import { ReactNode, useEffect, useMemo } from 'react';
import MainLayout from '../GeneralComponents/MainLayout';
import { useGetFullDeskQuery } from '@/store/api/deskApi';
import { useRouter } from 'next/router';
import styles from '../../styles/Desk.module.scss';
import default_picture from '../../assets/images/default_picture.jpeg';
import Image from 'next/image';
import { useGetWorkingSpacesClientQuery } from '@/store/api/wspaceApi';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { getSingleDesk, layoutSelector } from '@/store/slices/deskSlice';
import Head from 'next/head';

interface DeskLayoutIProps {
  children: ReactNode;
}

export default function DeskLayout({ children }: DeskLayoutIProps) {
  const { query } = useRouter();
  const { userData } = useAppSelector(userSelector);
  const { background } = useAppSelector(layoutSelector);
  // const { data, isLoading } = useGetFullDeskQuery({ wspaceId: Number(query.id), deskId: Number(query.deskId) });
  const dispatch = useAppDispatch();
  const wspaceData = useGetWorkingSpacesClientQuery(userData.id);
  useEffect(() => {
    dispatch(getSingleDesk({ wspaceId: Number(query.id), deskId: Number(query.deskId) }));
  }, []);

  const render = () => {
    if (wspaceData.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Head>
          <title>Доска</title>
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
        <MainLayout>{children}</MainLayout>
      </>
    );
  };

  return render();
}
