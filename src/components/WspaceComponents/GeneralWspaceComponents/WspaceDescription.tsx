import { WorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import ItemTitleWrapper from './ItemTitleWrapper';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import { BiUserPlus } from 'react-icons/bi';

type WspaceDescriptionIProps = Pick<WorkingSpaceType, 'name' | 'description'> & { roleId: number };

export default function WspaceDescription({ name, description, roleId }: WspaceDescriptionIProps) {
  return (
    <div className={styles.wspaceDescription}>
      {name && (
        <>
          <ItemTitleWrapper wspace={name as string} ellipsis="350px">
            {roleId !== 0 && roleId <= 2 && (
              <div className={styles.wspaceEditInvite}>
                <CompoundButton variant="success" padding={{ x: '12', y: '4' }}>
                  <BiUserPlus size={18} />
                  Пригласить пользователя в рабочее пространств
                </CompoundButton>
              </div>
            )}
          </ItemTitleWrapper>
          {description ? <p className={styles.wspaceDescription__content}>{description}</p> : ''}
        </>
      )}
    </div>
  );
}
