import { SingleWorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import ItemTitleWrapper from './ItemTitleWrapper';
import CompoundButton from '../FormComponents/CompoundButton';
import { BiUserPlus } from 'react-icons/bi';

interface WspaceDescriptionIProps {
  data?: Pick<SingleWorkingSpaceType, 'workingSpace'>;
}

export default function WspaceDescription({ data }: WspaceDescriptionIProps) {
  return (
    <div className={styles.wspaceDescription}>
      {data && (
        <ItemTitleWrapper wspace={data?.workingSpace.name as string} ellipsis="350px">
          <div className={styles.wspaceEditInvite}>
            <CompoundButton variant="success" padding={{ x: '12', y: '4' }}>
              <BiUserPlus size={18} />
              Пригласить пользователя в рабочее пространств
            </CompoundButton>
          </div>
        </ItemTitleWrapper>
      )}
    </div>
  );
}
