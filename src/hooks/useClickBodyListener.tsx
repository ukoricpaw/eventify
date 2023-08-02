import { useEffect } from 'react';

interface useClickBodyListenerIProps {
  activeCol?: number | null;
  colId: number;
  setActiveHandler?: (column: number | null) => void;
}

export default function useClickBodyListener({
  activeCol,
  colId,
  setActiveHandler,
}: useClickBodyListenerIProps): [boolean, () => void] {
  const activeColumnCondition = activeCol === colId;
  useEffect(() => {
    if (activeColumnCondition) {
      document.body.addEventListener('click', setActiveColumnNull);
    } else {
      document.body.removeEventListener('click', setActiveColumnNull);
    }
  }, [activeCol]);

  const setActiveColumnNull = () => {
    setActiveHandler && setActiveHandler(null);
  };

  return [activeColumnCondition, setActiveColumnNull];
}
