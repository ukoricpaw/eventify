import { DeskType } from './deskTypes';
import { UserType } from './userTypes';
export interface WorkingSpacesResponce {
  count: number;
  rows: WorkingSpaceType[];
}

export interface WorkingSpaceType {
  id: number;
  name: string;
  description: string | null;
  private: boolean;
  userId: number;
  inviteLink: string;
  createdAt: string;
  desks: DeskType[];
}

interface SingleWorkingSpace {
  workingSpace: WorkingSpaceType & { user: Pick<UserType, 'id' | 'email' | 'avatar'> };
}

export interface NewWorkingSpaceResponse {
  newWorkingSpace: Omit<WorkingSpaceType, 'desks'> & { updatedAt: string };
  role: Omit<WorkingSpaceRole, 'role'>;
}

export interface SingleWorkingSpaceType extends SingleWorkingSpace {
  workingSpaceRole: {};
}

export interface WorkingSpaceRole {
  workingSpaceId: number;
  userId: number;
  roleId: number;
  role: RoleType;
}

type RoleType = {
  id: number;
  name: 'Owner' | 'Moderator' | 'Reader';
  createdAt: string;
  updatedAt: string;
};
