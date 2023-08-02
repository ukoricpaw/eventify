import { createContext, useState, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import DeskModal from './DeskModal';
import { EnumModal, ModalGeneralType } from '@/types/modalDeskTypes';

export const DeskColumnModalContext = createContext<{
  setActiveModalHandler: ({ type, content }: ModalGeneralType) => void;
} | null>(null);

const DeskColumnProvider = DeskColumnModalContext.Provider;

interface ActiveModalState {
  type: EnumModal | null;
  status: boolean;
}

interface DeskColumnModalInterface {
  children: ReactElement;
}

export default function DeskColumnModalProvider({ children }: DeskColumnModalInterface) {
  const [activeModal, setActiveModal] = useState<ActiveModalState>({ type: null, status: false });
  const [modalContent, setModalContent] = useState<number | null>(null);

  const setActiveModalHandler = ({ type, content }: ModalGeneralType) => {
    setActiveModal({ type, status: true });
    setModalContent(content);
  };

  const disableModal = () => {
    setActiveModal({ type: null, status: false });
    setModalContent(null);
  };

  return (
    <DeskColumnProvider value={{ setActiveModalHandler }}>
      {children}
      {activeModal.status &&
        createPortal(
          <DeskModal type={activeModal.type} modalContent={modalContent} modalHandler={disableModal} />,
          document.body,
        )}
    </DeskColumnProvider>
  );
}
