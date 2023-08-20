import { WorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import WspaceProvideLink from './WspaceProvideLink';
import ItemTitleWrapper from './ItemTitleWrapper';
import { BiExit } from 'react-icons/bi';
import useDeleteModal from '@/hooks/useConfirmationModal';
import { useRouter } from 'next/router';
import leaveFromWorkingSpace from '@/axios/http/leaveFromWorkingSpace';

type WspaceDescriptionIProps = Pick<WorkingSpaceType, 'name' | 'description' | 'id'> & {
  roleId: number;
  inviteLink: null | string;
};

export default function WspaceDescription({ name, description, roleId, inviteLink, id }: WspaceDescriptionIProps) {
  return (
    <div className={styles.wspaceDescription}>
      {name && (
        <>
          <ItemTitleWrapper wspace={name} ellipsis="350px">
            {roleId !== 0 && roleId <= 2 && <WspaceProvideLink inviteLink={inviteLink} />}
            {roleId !== 0 && roleId !== 1 && <LeaveFromWorkingSpace wspaceName={name} wspaceId={id} />}
          </ItemTitleWrapper>
          {description ? <p className={styles.wspaceDescription__content}>{description}</p> : ''}
        </>
      )}
    </div>
  );
}

function LeaveFromWorkingSpace({ wspaceId, wspaceName }: { wspaceId: number; wspaceName: string }) {
  const router = useRouter();

  const leaveFromWorkingSpaceHandler = async () => {
    alert('hello');
    await leaveFromWorkingSpace({ wspaceId }).then(data => {
      if (data) {
        router.push(`/users/${router.query.user}/dashboard`);
      }
    });
  };

  const [openHandler, isOpen, LeaveModal] = useDeleteModal({
    handler: leaveFromWorkingSpaceHandler,
    title: `Вы действительно хотите покинуть рабочее пространство ${wspaceName}`,
    confirmTitle: 'Покинуть',
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          paddingRight: '20px',
          color: 'red',
          cursor: 'pointer',
        }}
        onClick={openHandler}
      >
        <BiExit size={20} />
        Покинуть рабочее пространство
      </div>
      {isOpen && LeaveModal}
    </>
  );
}
