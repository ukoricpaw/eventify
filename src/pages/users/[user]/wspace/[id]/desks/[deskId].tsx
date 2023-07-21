import DeskLayout from '@/components/GeneralComponents/DeskLayout';
import { useRouter } from 'next/router';

export default function DeskPage() {
  const { query } = useRouter();
  return <DeskLayout>{query.deskId}</DeskLayout>;
}
