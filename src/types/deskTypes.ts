import { UserType } from './userTypes';
import { KeyboardEvent, MouseEvent } from 'react';
export interface DeskType {
  id: number;
  name: string;
  description: string | null;
  background: string | null;
  workingSpaceId: number;
  createdAt: string;
  updatedAt: string;
}

export interface DeskHistoryType {
  count: number;
  rows: DeskHistoryItemType[];
}

export type DeskHistoryItemType = {
  id: number;
  userId: number;
  firstItem: string;
  secondItem: string | null;
  createdAt: string;
  user: Omit<UserType, 'isActivated' | 'role'>;
  desk_act: DeskAct;
};

export type DeskAct = {
  id: number;
  name: string;
};

export interface DeskWSocketEmitEvents {
  addNewColumn: (name: string) => void;
  deleteColumn: (id: number) => void;
  addNewItem: (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLTextAreaElement>,
    columnId: number,
    name: string,
  ) => void;
  reorderColumns: (id: number, order: number) => void;
  reorderItemInColumns: (listId: number, itemId: number, order: number, secondList: number | null) => void;
}

export type DeskWSocketContextInterface = {
  emitEvent: <T extends keyof DeskWSocketEmitEvents>(event: T) => DeskWSocketEmitEvents[T];
};

export interface ColumnsContextInterface {
  activeColumn: number | null;
  activeMoreInfo: number | null;
  setActiveColumnHandler: (column: number | null) => void;
  setActiveMoreInfoHandler: (column: number | null) => void;
}

export interface DeleteColumnModalInterface {
  openDeleteHandler: () => void;
  setListIdHandler: (nameListId: string) => void;
}

export interface ColumnInfoContextInterface {
  listId: number;
  name: string;
  roleId: number;
}
