import { createContext, ReactNode, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import DeleteColumnModal from './DeleteColumnModal';
import { ColumnsContextInterface, DeleteColumnModalInterface } from '@/types/deskTypes';

export const ColumnsContext = createContext<ColumnsContextInterface | null>(null);
export const DeleteColumnModalContext = createContext<DeleteColumnModalInterface | null>(null);

const ColumnsContextProvider = ColumnsContext.Provider;
const DeleteColumnModalContextProvider = DeleteColumnModalContext.Provider;

function DeleteColumnModalProvider({ children }: { children: ReactNode }) {
  const [setListIdHandler, openHandler, isOpen, DeleteModal] = DeleteColumnModal();
  return (
    <DeleteColumnModalContextProvider value={{ openDeleteHandler: openHandler, setListIdHandler }}>
      {children}
      {isOpen && createPortal(<DeleteModal />, document.body)}
    </DeleteColumnModalContextProvider>
  );
}

function ColumnsActiveProvider({ children }: { children: ReactNode }) {
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const [activeMoreInfo, setActiveMoreInfo] = useState<number | null>(null);
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const setActiveColumnHandler = useCallback((column: number | null) => {
    setActiveColumn(prev => (column ? (prev === column ? null : column) : null));
  }, []);

  const setActiveMoreInfoHandler = useCallback((column: number | null) => {
    setActiveMoreInfo(prev => (column ? (prev === column ? null : column) : null));
  }, []);

  const setActiveInputHandler = useCallback((column: number | null) => {
    setActiveInput(column);
  }, []);
  return (
    <ColumnsContextProvider
      value={{
        activeColumn,
        setActiveColumnHandler,
        setActiveMoreInfoHandler,
        activeMoreInfo,
        activeInput,
        setActiveInputHandler,
      }}
    >
      {children}
    </ColumnsContextProvider>
  );
}

export default function ColumnProvider({ children }: { children: ReactNode }) {
  return (
    <DeleteColumnModalProvider>
      <ColumnsActiveProvider>{children}</ColumnsActiveProvider>
    </DeleteColumnModalProvider>
  );
}
