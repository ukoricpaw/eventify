export type SingleDeskState = {
  status: {
    isLoading: boolean;
    isError: null | string;
  };
  data: SingleDesk;
  lists: DeskList[];
  listItems: DeskListItem[];
  archived: ArchivedList;
};

export interface ArchivedList {
  isLoading: boolean;
  isError: string | null;
  archivedList: DeskList[];
  isFulfilled: boolean;
  deskId: number | null;
}

export interface SingleDesk {
  id: number;
  name: string;
  description: string | null;
  background: string | null;
  workingSpaceId: number;
  createdAt: string;
  updatedAt: string;
  desk_lists: DeskList[];
}

export interface DeskList extends Omit<SingleDesk, 'background' | 'desk_lists' | 'workingSpaceId'> {
  order: number;
  isarchived: boolean;
  deskId: number;
  desk_list_items: DeskListItem[];
}

export interface DeskListItem extends Omit<DeskList, 'isarchived' | 'deskId' | 'desk_list_items'> {
  deadline: string;
  deskListId: number;
}

export type ReloadedDeskData = { desk: SingleDesk };
