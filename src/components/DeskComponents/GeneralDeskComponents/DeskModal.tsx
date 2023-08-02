import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import useProvideModalContent from '@/hooks/useProvideModalContent';
import { EnumModal, ModalGeneralType } from '@/types/modalDeskTypes';

interface DeskModalIProps {
  modalHandler: () => void;
  type: EnumModal | null;
  modalContent: Omit<ModalGeneralType, 'type'>['content'] | null;
}

export default function DeskModal({ modalHandler, type, modalContent }: DeskModalIProps) {
  const data = useProvideModalContent({ type, content: modalContent });
  console.log(data);
  return (
    <ModalLayout setActiveModal={modalHandler}>
      <p></p>
    </ModalLayout>
  );
}
