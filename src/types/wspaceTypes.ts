import { DeskType } from './deskTypes';
import { UserType } from './userTypes';
export interface WorkingSpacesResponce {
  count: number;
  rows: (Omit<WorkingSpaceType, 'desks' | 'private' | 'description' | 'inviteLink' | 'createdAt'> & {
    working_space_roles: Pick<WorkingSpaceRole, 'roleId'>[];
  })[];
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
  workingSpaceRole: WorkingSpaceRole;
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

export interface MembersResponse {
  count: number;
  rows: MembersType[];
}

export type MembersType = Omit<WorkingSpaceRole, 'role'> & { role: Omit<RoleType, 'createdAt' | 'updatedAt'> } & {
  user: Omit<UserType, 'isActivated' | 'role'>;
};

export type MessageType = {
  message: string;
};

export interface UpdatedWspace extends Omit<WorkingSpaceType, 'desks'> {}

export interface PaginationListState {
  page: number;
  search: string;
  resultSearch: string;
}
