import { createContext, ReactNode, useState, useCallback } from 'react';

interface ColumnsContextInterface {
  activeColumn: number | null;
  activeMoreInfo: number | null;
  setActiveColumnHandler: (column: number | null) => void;
  setActiveMoreInfoHandler: (column: number | null) => void;
}

export const ColumnsContext = createContext<ColumnsContextInterface | null>(null);

export default function ColumnsActiveProvider({ children }: { children: ReactNode }) {
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const [activeMoreInfo, setActiveMoreInfo] = useState<number | null>(null);
  const setActiveColumnHandler = useCallback((column: number | null) => {
    setActiveColumn(prev => (column ? (prev === column ? null : column) : null));
  }, []);

  const setActiveMoreInfoHandler = useCallback((column: number | null) => {
    setActiveMoreInfo(prev => (column ? (prev === column ? null : column) : null));
  }, []);
  return (
    <ColumnsContext.Provider value={{ activeColumn, setActiveColumnHandler, setActiveMoreInfoHandler, activeMoreInfo }}>
      {children}
    </ColumnsContext.Provider>
  );
}
