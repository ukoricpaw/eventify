import CompoundButton from '@/components/FormComponents/CompoundButton';
import useDeleteModal from '@/hooks/useConfirmationModal';
import { useDeleteMemberFromWorkingSpaceMutation } from '@/store/api/wspaceApi';
import { createPortal } from 'react-dom';

interface DeleteMemberIProps {
  wspaceId: number;
  memberId: number;
  memberRoleId: number;
  memberName: string;
}

export default function DeleteMember({ memberName, memberId, wspaceId, memberRoleId }: DeleteMemberIProps) {
  const [deleteMemberFromWorkingSpace, { isError, isLoading }] = useDeleteMemberFromWorkingSpaceMutation();
  const [openHandler, isOpen, DeleteModal] = useDeleteModal({
    handler: () => {
      deleteMemberFromWorkingSpace({ wspaceId, userId: memberId });
    },
    title: `Вы действительно хотите удалить пользователя ${memberName}?`,
    confirmTitle: 'Удалить',
  });
  return (
    <>
      <CompoundButton
        onClick={openHandler}
        disabled={memberRoleId === 1 || isLoading}
        variant={'success'}
        padding={{ y: '12' }}
      >
        Удалить пользователя
      </CompoundButton>
      {isOpen && DeleteModal}
    </>
  );
}
