import { createContext, ReactNode } from 'react';
import { ColumnInfoContextInterface } from '@/types/deskTypes';

export const ColumnInfoContext = createContext<ColumnInfoContextInterface | null>(null);
const ColumnInfoProvider = ColumnInfoContext.Provider;

interface ColumnInfoContextProviderIProps {
  children: ReactNode;
}

export default function ColumnInfoContextProvider({
  children,
  roleId,
  name,
  listId,
  isarchived,
}: ColumnInfoContextProviderIProps & ColumnInfoContextInterface) {
  return <ColumnInfoProvider value={{ isarchived, roleId, name, listId }}>{children}</ColumnInfoProvider>;
}
