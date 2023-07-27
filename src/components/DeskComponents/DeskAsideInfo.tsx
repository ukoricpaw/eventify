import SingleWspaceAside from '../WspaceComponents/GeneralWspaceComponents/SingleWspaceAside';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectSingleWorkingSpaceResult } from '@/store/api/wspaceApi';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';
import { useRouter } from 'next/router';
import LeftAsideSettings from './LeftAsideSettings';

export default function DeskAsideInfo() {
  const { query } = useRouter();
  const data = useAppSelector(state =>
    selectSingleWorkingSpaceResult(state, Number(query.id)),
  ) as SingleWorkingSpaceType;
  return (
    <SingleWspaceAside noBorder={true} data={data}>
      <LeftAsideSettings wspaceId={data.workingSpace.id} wspaceRoleId={data.workingSpaceRole.roleId} />
    </SingleWspaceAside>
  );
}
