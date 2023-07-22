import { ReactNode } from 'react';
import MainLayout from '../GeneralComponents/MainLayout';
import { useGetFullDeskQuery } from '@/store/api/deskApi';
import { useRouter } from 'next/router';
import styles from '../../styles/Desk.module.scss';
import default_picture from '../../assets/images/default_picture.jpeg';
import Image from 'next/image';
import { useGetWorkingSpacesClientQuery } from '@/store/api/wspaceApi';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';

interface DeskLayoutIProps {
  children: ReactNode;
}

export default function DeskLayout({ children }: DeskLayoutIProps) {
  const { query } = useRouter();
  const { userData } = useAppSelector(userSelector);
  const { data, isLoading } = useGetFullDeskQuery({ wspaceId: Number(query.id), deskId: Number(query.deskId) });
  const wspaceData = useGetWorkingSpacesClientQuery(userData.id);

  const render = () => {
    if (isLoading || wspaceData.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <Image
          draggable={false}
          className={styles.deskBackground}
          alt="background Image"
          loader={({ src, width }) => `${src}?w=${width}`}
          src={
            data && data.background
              ? `${process.env.NEXT_PUBLIC_API_URL}/api/image/${data.background}`
              : default_picture
          }
          priority
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL={
            data && data.background
              ? `${process.env.NEXT_PUBLIC_API_URL}/api/image/${data.background}`
              : default_picture.src
          }
        />
        <MainLayout>{children}</MainLayout>
      </>
    );
  };

  return render();
}
