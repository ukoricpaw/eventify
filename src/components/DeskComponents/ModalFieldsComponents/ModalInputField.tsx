import TextInputField from '@/components/DeskComponents/ModalFieldsComponents/TextInputField';
import { FieldsActionTypes } from '@/utils/defineFieldsModalType';
import { MouseEvent } from 'react';

interface DeskInputFieldIProps {
  name: string;
  roleCondition: boolean;
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
  roleCondition,
  inputId,
  rows,
  activeId,
  setActiveHandler,
  emitHandler,
  listId,
}: DeskInputFieldIProps) {
  const activeCondition = activeId === inputId;

  const paragraphHandler = (id: string | null) => (e?: MouseEvent<HTMLParagraphElement>) => {
    if (roleCondition) {
      if (e) e.stopPropagation();
      setActiveHandler(id);
    }
  };

  return (
    <TextInputField
      mw={'400'}
      deskListId={listId}
      cursor={roleCondition}
      setNull={paragraphHandler(null)}
      color={true}
      size="24"
      inputId={inputId}
      emitFunction={emitHandler}
      textVal={name}
      rows={rows}
      condition={activeCondition}
      id={Number(inputId.split('/')[0])}
      paragraphHandler={paragraphHandler(inputId)}
    />
  );
}
