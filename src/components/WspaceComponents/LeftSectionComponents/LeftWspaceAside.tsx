import SingleWspaceAside from '../GeneralWspaceComponents/SingleWspaceAside';
import LeftSectionItemSettings from './LeftSectionItemSettings';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';

interface LeftWspaceAsideIProps {
  data?: SingleWorkingSpaceType;
}

export default function LeftWspaceAside({ data }: LeftWspaceAsideIProps) {
  return (
    <SingleWspaceAside data={data}>
      <LeftSectionItemSettings
        wspaceRoleId={data?.workingSpaceRole ? data.workingSpaceRole.roleId : 0}
        margin="15px 0"
      />
    </SingleWspaceAside>
  );
}
