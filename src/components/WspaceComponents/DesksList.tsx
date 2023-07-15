import RightSectionDeskItem from './RightSectionDeskItem';
import { DeskType } from '@/types/deskTypes';
import { memo } from 'react';

export default memo(function DesksList({ desks }: { desks: DeskType[] }) {
  return (
    <>
      {desks.map(desk => {
        return <RightSectionDeskItem key={desk.id} desk={desk} />;
      })}
    </>
  );
});
