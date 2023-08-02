export enum EnumModal {
  DESK = 'desk',
  COLUMN = 'col',
  ITEM = 'item',
}

type ModalDeskListType = {
  type: EnumModal.COLUMN;
  content: number;
};

type ModalDeskType = {
  type: EnumModal.DESK;
  content: null;
};

type ModalDeskListItemType = {
  type: EnumModal.ITEM;
  content: number;
};

type ModalNull = {
  type: null;
  content: null;
};

export type ModalGeneralType = ModalDeskListItemType | ModalDeskType | ModalNull | ModalDeskListType;

export interface ActiveModalState {
  type: 'desk' | 'col' | null;
  status: boolean;
}
