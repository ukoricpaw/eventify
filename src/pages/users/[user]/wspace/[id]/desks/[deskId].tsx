import MainLayout from '@/components/GeneralComponents/MainLayout';
import { useRouter } from 'next/router';

export default function DeskPage() {
  const { query } = useRouter();
  return <MainLayout>{query.deskId}</MainLayout>;
}
