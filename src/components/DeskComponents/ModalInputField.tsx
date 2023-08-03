import TextInputField from '@/hooks/TextInputField';
import { FieldsActionTypes } from '@/utils/defineFieldsModalType';
import { MouseEvent } from 'react';

interface DeskInputFieldIProps {
  name: string;
  roleId: number;
  inputId: string;
  rows?: number;
  cols?: number;
  elementRef?: HTMLDivElement;
  activeId: string | null;
  setActiveHandler: (activeField: string | null) => void;
  emitHandler: FieldsActionTypes;
  listId: number | null;
}

export default function ModalInputField({
  name,
  roleId,
  inputId,
  rows,
  activeId,
  setActiveHandler,
  emitHandler,
  listId,
}: DeskInputFieldIProps) {
  const activeCondition = activeId === inputId;

  const paragraphHandler = (id: string | null) => (e?: MouseEvent<HTMLParagraphElement>) => {
    if (roleId !== 0 && roleId <= 2) {
      if (e) e.stopPropagation();
      setActiveHandler(id);
    }
  };

  return (
    <TextInputField
      deskListId={listId}
      cp={roleId !== 0 && roleId <= 2 ? true : false}
      setNull={paragraphHandler(null)}
      color={true}
      size="24"
      emitFunction={emitHandler}
      textVal={name}
      rows={rows}
      mw={true}
      condition={activeCondition}
      id={Number(inputId.split('/')[0])}
      paragraphHandler={paragraphHandler(inputId)}
    />
  );
}
