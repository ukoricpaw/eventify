import { DeskType } from './deskTypes';
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
