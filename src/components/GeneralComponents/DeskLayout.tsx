import { ReactNode } from 'react';
import MainLayout from './MainLayout';
import { useGetFullDeskQuery } from '@/store/api/deskApi';
import { useRouter } from 'next/router';

interface DeskLayoutIProps {
  children: ReactNode;
}

export default function DeskLayout({ children }: DeskLayoutIProps) {
  const { query } = useRouter();
  const { data, isLoading } = useGetFullDeskQuery({ wspaceId: Number(query.id), deskId: Number(query.deskId) });

  const render = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    console.log(data);
    return <MainLayout>{children}</MainLayout>;
  };

  return render();
}
