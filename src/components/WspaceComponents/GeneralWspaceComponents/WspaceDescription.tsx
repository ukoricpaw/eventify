import { WorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import WspaceProvideLink from './WspaceProvideLink';
import ItemTitleWrapper from './ItemTitleWrapper';

type WspaceDescriptionIProps = Pick<WorkingSpaceType, 'name' | 'description'> & {
  roleId: number;
  inviteLink: null | string;
};

export default function WspaceDescription({ name, description, roleId, inviteLink }: WspaceDescriptionIProps) {
  return (
    <div className={styles.wspaceDescription}>
      {name && (
        <>
          <ItemTitleWrapper wspace={name} ellipsis="350px">
            {roleId !== 0 && roleId <= 2 && <WspaceProvideLink inviteLink={inviteLink} />}
            <div>Покинуть рабочее пространство</div>
          </ItemTitleWrapper>
          {description ? <p className={styles.wspaceDescription__content}>{description}</p> : ''}
        </>
      )}
    </div>
  );
}
