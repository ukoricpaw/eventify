import { createContext, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import AddNewWspaceModal from '../WspaceComponents/AddNewWspaceModal';

export const ModalContext = createContext<{ setActiveModal: () => void; activeModal: boolean }>({
  setActiveModal: () => {},
  activeModal: false,
});

export default function CreateWspaceModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActive] = useState<boolean>(false);
  const setActiveModal = () => {
    setActive(prev => !prev);
  };

  return (
    <ModalContext.Provider value={{ setActiveModal, activeModal }}>
      {children}
      {activeModal && createPortal(<AddNewWspaceModal setActiveModal={setActiveModal} />, document.body)}
    </ModalContext.Provider>
  );
}
