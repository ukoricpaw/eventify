import { EnumModal } from '@/types/modalDeskTypes';
import { memo } from 'react';
import InputImage from './InputImage';
import InputDate from './InputDate';

export interface SpecialInputFieldsIProps {
  type: EnumModal;
  backgroundUrl?: string;
  wsId: number;
  deskId: number;
  roleCondition: boolean;
  listId: number;
  itemId: number;
  dateVal: string;
}

export default memo(function SpecialInputFields({
  type,
  wsId,
  deskId,
  backgroundUrl,
  roleCondition,
  listId,
  itemId,
  dateVal,
}: SpecialInputFieldsIProps) {
  return type === EnumModal.DESK ? (
    <InputImage roleCondition={roleCondition} wsId={wsId} deskId={deskId} backgroundUrl={backgroundUrl} />
  ) : (
    <InputDate listId={listId} itemId={itemId} dateVal={dateVal} />
  );
});
