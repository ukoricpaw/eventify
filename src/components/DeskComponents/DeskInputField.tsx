import TextInputField from '@/hooks/TextInputField';
import useClickBodyListener from '@/hooks/useClickBodyListener';
import { MouseEvent, useState } from 'react';

interface DeskInputFieldIProps {
  name: string;
  roleId: number;
  deskId: number;
}

export default function DeskInputField({ name, deskId, roleId }: DeskInputFieldIProps) {
  const [active, setActive] = useState<number | null>(null);

  const setActiveHandler = (deskId: null | number) => {
    setActive(deskId);
  };

  const paragraphHandler = (e: MouseEvent<HTMLParagraphElement>) => {
    if (roleId !== 0 && roleId <= 2) {
      e.stopPropagation();
      setActiveHandler(deskId);
    }
  };

  const [activeDeskCondition, setNull] = useClickBodyListener({ activeCol: active, colId: deskId, setActiveHandler });

  return (
    <TextInputField
      cp={roleId !== 0 && roleId <= 2 ? true : false}
      setNull={setNull}
      color={true}
      capitalize={true}
      size="24"
      emitFunction="renameFullDesk"
      textVal={name}
      condition={activeDeskCondition}
      id={deskId}
      paragraphHandler={paragraphHandler}
    />
  );
}
