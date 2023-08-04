import TextInputField from '@/components/DeskComponents/ModalFieldsComponents/TextInputField';
import useClickBodyListener from '@/hooks/useClickBodyListener';
import { MouseEvent, useState } from 'react';

interface DeskInputFieldIProps {
  name: string;
  roleId: number;
  inputId: number;
  rows?: number;
  elementRef?: HTMLDivElement;
}

export default function DeskInputField({ name, inputId, roleId, rows, elementRef }: DeskInputFieldIProps) {
  const [active, setActive] = useState<number | null>(null);

  const setActiveHandler = (inputId: null | number) => {
    setActive(inputId);
  };

  const paragraphHandler = (e: MouseEvent<HTMLParagraphElement>) => {
    if (roleId !== 0 && roleId <= 2) {
      e.stopPropagation();
      setActiveHandler(inputId);
    }
  };

  const [activeDeskCondition, setNull] = useClickBodyListener({
    elementRef,
    activeCol: active,
    colId: inputId,
    setActiveHandler,
  });

  return (
    <TextInputField
      mw={'600'}
      cursor={roleId !== 0 && roleId <= 2 ? true : false}
      setNull={setNull}
      color={true}
      deskListId={null}
      size="24"
      emitFunction="renameFullDesk"
      textVal={name}
      rows={rows}
      condition={activeDeskCondition}
      id={inputId}
      paragraphHandler={paragraphHandler}
    />
  );
}
