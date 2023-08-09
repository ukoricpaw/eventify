import { WorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import WspaceProvideLink from './WspaceProvideLink';

type WspaceDescriptionIProps = Pick<WorkingSpaceType, 'name' | 'description'> & {
  roleId: number;
  inviteLink: null | string;
};

export default function WspaceDescription({ name, description, roleId, inviteLink }: WspaceDescriptionIProps) {
  return (
    <div className={styles.wspaceDescription}>
      {name && (
        <>
          <WspaceProvideLink inviteLink={inviteLink} name={name as string} roleId={roleId} />
          {description ? <p className={styles.wspaceDescription__content}>{description}</p> : ''}
        </>
      )}
    </div>
  );
}
