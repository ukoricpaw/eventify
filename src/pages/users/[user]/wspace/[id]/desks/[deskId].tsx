import DeskLayout from '@/components/DeskComponents/GeneralDeskComponents/DeskLayout';
import ColumnList from '@/components/DeskComponents/ColumnComponents/ColumnList';
import { useAppSelector } from '@/hooks/reduxHooks';
import { layoutSelector } from '@/store/selectors/deskSelectors';
import ColumnProvider from '@/components/DeskComponents/GeneralDeskComponents/ColumnsActiveProvider';

export default function DeskPage() {
  const { isLoading } = useAppSelector(layoutSelector);

  return (
    <DeskLayout>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ColumnProvider>
          <ColumnList />
        </ColumnProvider>
      )}
    </DeskLayout>
  );
}
