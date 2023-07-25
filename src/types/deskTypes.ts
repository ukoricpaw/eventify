import { UserType } from './userTypes';

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
