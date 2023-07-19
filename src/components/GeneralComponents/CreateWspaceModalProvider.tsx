import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AddNewWspaceModal from '../WspaceComponents/GeneralWspaceComponents/AddNewWspaceModal';

export const ModalContext = createContext<{ setActiveModal: () => void }>({
  setActiveModal: () => {},
});

export default function CreateWspaceModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActive] = useState<boolean>(false);
  const setActiveModal = useCallback(() => {
    setActive(prev => !prev);
  }, []);

  return (
    <ModalContext.Provider value={{ setActiveModal }}>
      {children}
      {activeModal && createPortal(<AddNewWspaceModal setActiveModal={setActiveModal} />, document.body)}
    </ModalContext.Provider>
  );
}
