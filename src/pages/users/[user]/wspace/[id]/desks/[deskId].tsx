import DeskLayout from '@/components/DeskComponents/DeskLayout';
import ColumnList from '@/components/DeskComponents/ColumnList';
import { useAppSelector } from '@/hooks/reduxHooks';
import { layoutSelector } from '@/store/slices/deskSlice';

export default function DeskPage() {
  const { isLoading } = useAppSelector(layoutSelector);

  return <DeskLayout>{isLoading ? <p>Loading...</p> : <ColumnList />}</DeskLayout>;
}
