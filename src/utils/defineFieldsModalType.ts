import { EnumModal } from '@/types/modalDeskTypes';
import { DeskWSocketEmitEvents } from '@/types/deskTypes';

type FieldsActions = {
  [Key in keyof DeskWSocketEmitEvents]: Key;
};

export type FieldsActionTypes = Exclude<
  FieldsActions[keyof DeskWSocketEmitEvents],
  'addNewColumn' | 'deleteColumn' | 'addNewItem' | 'reorderColumns' | 'reorderItemInColumns' | 'archiveColumn'
>;

type ItemActions = {
  type: EnumModal.ITEM;
  fields: [FieldsActions['renameItem'], FieldsActions['changeDescription']];
};

type ColumnActions = {
  type: EnumModal.COLUMN;
  fields: [FieldsActions['renameColumn'], FieldsActions['changeColumnDescription']];
};

type DeskActions = {
  type: EnumModal.DESK;
  fields: [FieldsActions['renameFullDesk'], FieldsActions['changeDeskDescription']];
};

type AllActionsForFields = DeskActions | ColumnActions | ItemActions;

export default function defineFieldsModalType(type: EnumModal): AllActionsForFields['fields'] {
  switch (type) {
    case EnumModal.ITEM:
      return ['renameItem', 'changeDescription'];
    case EnumModal.COLUMN:
      return ['renameColumn', 'changeColumnDescription'];
    case EnumModal.DESK:
      return ['renameFullDesk', 'changeDeskDescription'];
  }
}
